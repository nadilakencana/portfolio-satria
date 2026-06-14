const fs = require("fs");
const path = require("path");
const { Resend } = require("resend");
const jwt = require("jsonwebtoken");

const resend = new Resend(process.env.RESEND_API_KEY || "re_dev_placeholder");

module.exports = async function handler(req, res) {
  const { action, token } = req.query;

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return sendPage(res, 400, "Link Tidak Valid", "Link ini tidak valid atau sudah kedaluwarsa.", "#e74c3c");
  }

  if (action === "reject") {
    return sendPage(
      res,
      200,
      "Permintaan Ditolak",
      `Permintaan CV dari ${payload.name} (${payload.email}) telah ditolak. Tidak ada email yang dikirim ke pengunjung.`,
      "#999"
    );
  }

  if (action === "approve") {
    const cvPath = path.join(process.cwd(), "public", "cv", "Satria_Bagaskara_CV.pdf");

    let attachments;
    try {
      const cvBuffer = fs.readFileSync(cvPath);
      attachments = [{ filename: "Satria_Bagaskara_CV.pdf", content: cvBuffer.toString("base64") }];
    } catch (err) {
      console.error("cv-action: CV file not found at", cvPath, err);
      return sendPage(res, 500, "CV Tidak Ditemukan", "File CV belum tersedia di server. Unggah file CV terlebih dahulu.", "#e74c3c");
    }

    const html = `
      <div style="font-family: Segoe UI, sans-serif; max-width: 480px; margin: 0 auto; color: #333;">
        <h2 style="color: #1a1a2e;">Hi ${escapeHtml(payload.name)},</h2>
        <p>Terima kasih sudah mengunjungi portfolio saya. Berikut saya lampirkan CV terbaru saya.</p>
        <p>Semoga bermanfaat dan sampai jumpa!</p>
        <p style="margin-top: 24px;">Salam,<br/>Satria Bagaskara</p>
      </div>
    `;

    try {
      const { error } = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
        to: payload.email,
        subject: "Terima kasih telah mengunjungi portfolio Satria Bagaskara",
        html,
        attachments,
      });

      if (error) {
        console.error("cv-action approve resend error:", error);
        return sendPage(res, 500, "Gagal Mengirim", "Terjadi kesalahan saat mengirim CV. Coba lagi.", "#e74c3c");
      }

      return sendPage(res, 200, "CV Terkirim", `CV berhasil dikirim ke ${payload.email}.`, "#22c55e");
    } catch (err) {
      console.error("cv-action approve error:", err);
      return sendPage(res, 500, "Gagal Mengirim", "Terjadi kesalahan saat mengirim CV. Coba lagi.", "#e74c3c");
    }
  }

  return sendPage(res, 400, "Aksi Tidak Valid", "Parameter aksi tidak dikenali.", "#e74c3c");
};

function sendPage(res, status, title, message, color) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  return res.status(status).send(`
    <!DOCTYPE html>
    <html lang="id">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${escapeHtml(title)}</title>
      </head>
      <body style="font-family: Segoe UI, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #fafafa;">
        <div style="text-align: center; padding: 40px; background: #fff; border-radius: 14px; box-shadow: 0 2px 16px rgba(0,0,0,0.06); max-width: 420px;">
          <h2 style="color: ${color}; margin-bottom: 12px;">${escapeHtml(title)}</h2>
          <p style="color: #555; line-height: 1.6;">${escapeHtml(message)}</p>
        </div>
      </body>
    </html>
  `);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
