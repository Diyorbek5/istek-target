/**
 * ISTEK.UZ — Xavfsiz Vercel Serverless Backend Proxy (/api/lead)
 * Bevosita isteksmart.uz ning SUPABASE (PostgreSQL) bazasiga xavfsiz yozadi!
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { name, phone, product, region, sourcePage, utm, honeypot } = body;

    // 1. Anti-Spam Honeypot tekshiruvi
    if (honeypot) {
      return res.status(200).json({ ok: true });
    }

    // 2. Server-side Validatsiya (Ism va +998 telefon raqami)
    const cleanName = String(name || '').trim();
    const digitsOnly = String(phone || '').replace(/\D/g, '');

    if (cleanName.length < 2 || digitsOnly.length !== 12 || !digitsOnly.startsWith('998')) {
      return res.status(400).json({
        ok: false,
        error: 'Ism yoki telefon raqami noto\'g\'ri formatda'
      });
    }

    const formattedPhone = `+${digitsOnly}`;
    const cleanProduct = String(product || 'Eshik va Rom').trim();
    const cleanRegion = String(region || 'Toshkent').trim();
    const utmSource = utm?.utm_source || 'instagram';
    const utmCampaign = utm?.utm_campaign || 'target';

    const results = { supabaseSaved: false, erpSent: false, telegramSent: false };

    // 3. SUPABASE (PostgreSQL) BAZASIGA BEVOSITA XAVFSIZ YOZISH (isteksmart.uz uchun)
    // Vercel Environment Variables ichida saqlanadi (brauzerda umuman ko'rinmaydi):
    // - SUPABASE_URL (masalan: https://xyzcompany.supabase.co)
    // - SUPABASE_SERVICE_ROLE_KEY (maxfiy service_role kaliti — RLS dan xavfsiz o'tadi)
    // - SUPABASE_LEADS_TABLE (jadval nomi, standart: "leads")
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
    const supabaseTable = process.env.SUPABASE_LEADS_TABLE || 'leads';

    if (supabaseUrl && supabaseKey) {
      // isteksmart.uz Supabase "leads" jadvali uchun ustunlar:
      const supabaseRow = {
        name: cleanName,
        phone: formattedPhone,
        source: `Instagram Target (${cleanProduct})`,
        status: 'new',
        notes: `Mahsulot: ${cleanProduct} | Hudud: ${cleanRegion} | Kampaniya: ${utmCampaign}`
      };

      const sbRes = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/${supabaseTable}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(supabaseRow)
      });

      results.supabaseSaved = sbRes.ok;
    }

    // 4. Ixtiyoriy: Maxsus Webhook URL bo'lsa (ERP_API_URL)
    const erpUrl = process.env.ERP_API_URL;
    const erpSecret = process.env.ERP_API_SECRET;
    if (erpUrl) {
      const erpRes = await fetch(erpUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': erpSecret ? `Bearer ${erpSecret}` : '',
          'X-Webhook-Secret': erpSecret || ''
        },
        body: JSON.stringify({
          full_name: cleanName,
          phone: formattedPhone,
          product_interest: cleanProduct,
          region: cleanRegion,
          source: utmSource,
          campaign: utmCampaign
        })
      });
      results.erpSent = erpRes.ok;
    }

    // 5. Ixtiyoriy: Telegram guruhga bildirishnoma
    const tgToken = process.env.TELEGRAM_BOT_TOKEN;
    const tgChatId = process.env.TELEGRAM_CHAT_ID;
    if (tgToken && tgChatId) {
      const tgText =
        `🔥 *YANGI LID (ISTEK TARGET)*\n\n` +
        `👤 *Mijoz:* ${cleanName}\n` +
        `📞 *Tel:* ${phone}\n` +
        `🪟 *Tizim:* ${cleanProduct}\n` +
        `📍 *Hudud:* ${cleanRegion}`;

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

    return res.status(200).json({ ok: true, ...results });
  } catch (err) {
    return res.status(500).json({ ok: false, error: 'Server xatoligi' });
  }
}
