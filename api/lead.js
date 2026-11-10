/**
 * ISTEK.UZ — Xavfsiz Vercel Serverless Backend Proxy (/api/lead)
 * Bevosita isteksmart.uz ning SUPABASE "flat_marketing" jadvaliga yozadi!
 */

const DEFAULT_SUPABASE_URL = 'https://edamkzvtytofcsvfswxn.supabase.co';
const DEFAULT_TABLE = 'flat_marketing';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { name, phone, product, region, utm, honeypot } = body;

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
    const now = new Date();
    const todayDate = now.toISOString().split('T')[0]; // YYYY-MM-DD (sana ustuni uchun)
    const timestampMs = Date.now();
    const shortCode = String(timestampMs).slice(-5);

    const supabaseUrl = (process.env.SUPABASE_URL || DEFAULT_SUPABASE_URL).replace(/\/$/, '');
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;
    const tableName = process.env.SUPABASE_LEADS_TABLE || DEFAULT_TABLE;

    const results = { supabaseSaved: false };

    if (supabaseUrl && supabaseKey) {
      // 3. organization_id ni aniqlash (env dan oladi yoki jadvaldagi mavjud qatordan avtomatik topadi)
      let orgId = process.env.SUPABASE_ORG_ID || null;

      if (!orgId) {
        try {
          const orgRes = await fetch(
            `${supabaseUrl}/rest/v1/${tableName}?select=organization_id&organization_id=not.is.null&limit=1`,
            {
              headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`
              }
            }
          );
          if (orgRes.ok) {
            const rows = await orgRes.json();
            if (Array.isArray(rows) && rows.length > 0 && rows[0].organization_id) {
              orgId = rows[0].organization_id;
            }
          }
        } catch (_) {}
      }

      // 4. "flat_marketing" jadvalining aniq ustunlariga mos qator:
      const flatMarketingRow = {
        rowNum: timestampMs,
        id: `TARGET-${shortCode}`,
        sana: todayDate,
        ism: cleanName,
        telefon: formattedPhone,
        manba: 'Instagram',
        izoh: `[Target Sayt] ${cleanProduct} | Hudud: ${cleanRegion}`,
        holat: 'Yangi',
        kanal: 'Instagram',
        turi: 'Issiq',
        tavsif: utm?.utm_campaign ? `Kampaniya: ${utm.utm_campaign}` : null,
        sotuv_id: null,
        ...(orgId ? { organization_id: orgId } : {})
      };

      const sbRes = await fetch(`${supabaseUrl}/rest/v1/${tableName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(flatMarketingRow)
      });

      results.supabaseSaved = sbRes.ok;
      if (!sbRes.ok) {
        results.supabaseError = await sbRes.text();
      }
    }

    return res.status(200).json({ ok: true, ...results });
  } catch (err) {
    return res.status(500).json({ ok: false, error: 'Server xatoligi' });
  }
}
