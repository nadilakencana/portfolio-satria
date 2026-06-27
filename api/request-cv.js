const { Resend } = require("resend");
const jwt = require("jsonwebtoken");
const { sql, ensureTable } = require("./_db");

const resend = new Resend(process.env.RESEND_API_KEY || "re_dev_placeholder");
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "Nama dan email valid wajib diisi." });
  }

  const payload = {
    name: String(name).trim().slice(0, 100),
    email: String(email).trim().slice(0, 200),
    message: String(message || "").trim().slice(0, 1000),
  };

  let row;
  try {
    await ensureTable();
    [row] = await sql`
      INSERT INTO cv_requests (name, email, message)
      VALUES (${payload.name}, ${payload.email}, ${payload.message})
      RETURNING id
    `;
  } catch (err) {
    console.error("request-cv db error:", err);
    return res.status(500).json({ error: "Gagal menyimpan permintaan. Coba lagi nanti." });
  }
  payload.id = row.id;

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

  const baseUrl = process.env.SITE_URL || `https://${req.headers.host}`;
  const approveUrl = `${baseUrl}/api/cv-action?action=approve&token=${token}`;
  const rejectUrl = `${baseUrl}/api/cv-action?action=reject&token=${token}`;

  const html = `
    <div style="font-family: Segoe UI, sans-serif; max-width: 480px; margin: 0 auto; color: #333;">
      <h2 style="color: #1a1a2e;">Permintaan CV Baru</h2>
      <p>Ada pengunjung portfolio yang meminta CV Anda:</p>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tr><td style="padding: 8px 0; color: #999; width: 90px;">Nama</td><td style="padding: 8px 0;">${escapeHtml(payload.name)}</td></tr>
        <tr><td style="padding: 8px 0; color: #999;">Email</td><td style="padding: 8px 0;">${escapeHtml(payload.email)}</td></tr>
        <tr><td style="padding: 8px 0; color: #999; vertical-align: top;">Pesan</td><td style="padding: 8px 0; white-space: pre-wrap;">${escapeHtml(payload.message) || "-"}</td></tr>
      </table>
      <div style="margin-top: 24px;">
        <a href="${approveUrl}" style="display: inline-block; padding: 12px 28px; background: #22c55e; color: #fff; border-radius: 8px; text-decoration: none; font-weight: 600; margin-right: 12px;">✔ Approve & Kirim CV</a>
        <a href="${rejectUrl}" style="display: inline-block; padding: 12px 28px; background: #e74c3c; color: #fff; border-radius: 8px; text-decoration: none; font-weight: 600;">✕ Reject</a>
      </div>
      <p style="color: #aaa; font-size: 0.8rem; margin-top: 24px;">Link ini berlaku selama 7 hari.</p>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: process.env.OWNER_EMAIL,
      subject: `Permintaan CV dari ${payload.name}`,
      html,
    });

    if (error) {
      console.error("request-cv resend error:", error);
      return res.status(500).json({ error: "Gagal mengirim permintaan. Coba lagi nanti." });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("request-cv error:", err);
    return res.status(500).json({ error: "Gagal mengirim permintaan. Coba lagi nanti." });
  }
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
