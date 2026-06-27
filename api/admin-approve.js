const { sql, ensureTable } = require("./_db");
const { requireAdmin } = require("./_auth");
const { sendCvEmail } = require("./_cv-mailer");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!requireAdmin(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { id } = req.body || {};
  if (!id) {
    return res.status(400).json({ error: "id wajib diisi." });
  }

  try {
    await ensureTable();
    const [row] = await sql`SELECT * FROM cv_requests WHERE id = ${id}`;
    if (!row) {
      return res.status(404).json({ error: "Data tidak ditemukan." });
    }
    if (row.status !== "pending") {
      return res.status(409).json({ error: `Sudah diproses sebelumnya dengan status "${row.status}".` });
    }

    const { error } = await sendCvEmail(row.name, row.email);
    if (error) {
      console.error("admin-approve resend error:", error);
      return res.status(500).json({ error: "Gagal mengirim email." });
    }

    await sql`UPDATE cv_requests SET status = 'approved', updated_at = now() WHERE id = ${id}`;
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("admin-approve error:", err);
    return res.status(500).json({ error: "Terjadi kesalahan." });
  }
};
