/**
 * ISTEK.UZ — Xavfsiz Vercel Serverless Backend Proxy (/api/lead)
 *
 * Bu fayl brauzerdan kelgan lidni qabul qilib, maxfiy API kalit (ERP_API_SECRET)
 * orqali o'zingizning ERP/CRM tizimingizga (ERP_API_URL) xavfsiz yuboradi.
 * Kalitlar brauzerda umuman ko'rinmaydi!
 */

export default async function handler(req, res) {
  // 1. Faqat POST so'rovlarni qabul qilish
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { name, phone, product, region, sourcePage, utm, honeypot } = body;

    // 2. Anti-Spam Honeypot tekshiruvi (botlar yashirin maydonni to'ldirsa bloklanadi)
    if (honeypot) {
      return res.status(200).json({ ok: true });
    }

    // 3. Server-side Validatsiya (Ism va +998 telefon raqami)
    const cleanName = String(name || '').trim();
    const digitsOnly = String(phone || '').replace(/\D/g, '');

    if (cleanName.length < 2 || digitsOnly.length !== 12 || !digitsOnly.startsWith('998')) {
      return res.status(400).json({
        ok: false,
        error: 'Ism yoki telefon raqami noto\'g\'ri formatda'
      });
    }

    // 4. ERP/CRM ga yuboriladigan standart JSON ma'lumot (Payload)
    const leadPayload = {
      full_name: cleanName,
      phone: `+${digitsOnly}`,
      formatted_phone: String(phone).trim(),
      product_interest: String(product || 'Eshik va Rom').trim(),
      region: String(region || 'Toshkent').trim(),
      source: 'istek-target-site',
      source_page: String(sourcePage || 'main'),
      utm_source: utm?.utm_source || 'instagram',
      utm_medium: utm?.utm_medium || 'cpc',
      utm_campaign: utm?.utm_campaign || '',
      utm_content: utm?.utm_content || '',
      client_ip: req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '',
      user_agent: req.headers['user-agent'] || '',
      created_at: new Date().toISOString()
    };

    const results = { erpSent: false, telegramSent: false };

    // 5. O'ZINGIZNING ERP / CRM TIZIMINGIZGA XAVFSIZ YUBORISH
    // Vercel Settings -> Environment Variables ichiga qo'shiladi:
    // ERP_API_URL = https://crm.istek.uz/api/webhooks/leads (yoki o'zingizning ERP endpointingiz)
    // ERP_API_SECRET = maxfiy_kalit_12345
    const erpUrl = process.env.ERP_API_URL;
    const erpSecret = process.env.ERP_API_SECRET;

    if (erpUrl) {
      const erpResponse = await fetch(erpUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': erpSecret ? `Bearer ${erpSecret}` : '',
          'X-Webhook-Secret': erpSecret || '',
          'X-Source': 'istek-target'
        },
        body: JSON.stringify(leadPayload)
      });

      results.erpSent = erpResponse.ok;
    }

    // 6. Ixtiyoriy: Zaxira sifatida Telegram guruhga ham xavfsiz yuborish
    // Vercel Environment Variables: TELEGRAM_BOT_TOKEN va TELEGRAM_CHAT_ID
    const tgToken = process.env.TELEGRAM_BOT_TOKEN;
    const tgChatId = process.env.TELEGRAM_CHAT_ID;

    if (tgToken && tgChatId) {
      const tgText =
        `🔥 *YANGI LID (ISTEK TARGET)*\n\n` +
        `👤 *Mijoz:* ${leadPayload.full_name}\n` +
        `📞 *Tel:* ${leadPayload.formatted_phone}\n` +
        `🪟 *Tizim:* ${leadPayload.product_interest}\n` +
        `📍 *Hudud:* ${leadPayload.region}\n` +
        `🎯 *Manba:* ${leadPayload.utm_source} (${leadPayload.utm_campaign || 'Target'})`;

      const tgRes = await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: tgChatId,
          text: tgText,
          parse_mode: 'Markdown'
        })
      });
      results.telegramSent = tgRes.ok;
    }

    return res.status(200).json({
      ok: true,
      ...results
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: 'Server xatoligi'
    });
  }
}
