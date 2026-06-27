const jwt = require("jsonwebtoken");
const { sql, ensureTable } = require("./_db");
const { sendCvEmail } = require("./_cv-mailer");

module.exports = async function handler(req, res) {
  const { action, token } = req.query;

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return sendPage(res, 400, "Link Tidak Valid", "Link ini tidak valid atau sudah kedaluwarsa.", "#e74c3c");
  }

  let existing;
  try {
    await ensureTable();
    [existing] = await sql`SELECT status FROM cv_requests WHERE id = ${payload.id}`;
  } catch (err) {
    console.error("cv-action db error:", err);
    return sendPage(res, 500, "Terjadi Kesalahan", "Gagal mengakses database. Coba lagi nanti.", "#e74c3c");
  }

  if (existing && existing.status !== "pending") {
    return sendPage(
      res,
      200,
      "Sudah Diproses",
      `Permintaan ini sudah diproses sebelumnya dengan status "${existing.status}".`,
      "#999"
    );
  }

  if (action === "reject") {
    try {
      await sql`UPDATE cv_requests SET status = 'rejected', updated_at = now() WHERE id = ${payload.id}`;
    } catch (err) {
      console.error("cv-action reject db error:", err);
      return sendPage(res, 500, "Terjadi Kesalahan", "Gagal memperbarui status. Coba lagi nanti.", "#e74c3c");
    }
    return sendPage(
      res,
      200,
      "Permintaan Ditolak",
      `Permintaan CV dari ${payload.name} (${payload.email}) telah ditolak. Tidak ada email yang dikirim ke pengunjung.`,
      "#999"
    );
  }

  if (action === "approve") {
    try {
      const { error } = await sendCvEmail(payload.name, payload.email);

      if (error) {
        console.error("cv-action approve resend error:", error);
        return sendPage(res, 500, "Gagal Mengirim", "Terjadi kesalahan saat mengirim CV. Coba lagi.", "#e74c3c");
      }

      await sql`UPDATE cv_requests SET status = 'approved', updated_at = now() WHERE id = ${payload.id}`;
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
