const { sql, ensureTable } = require("./_db");
const { requireAdmin } = require("./_auth");

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!requireAdmin(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    await ensureTable();
    const rows = await sql`SELECT * FROM cv_requests ORDER BY created_at DESC`;
    return res.status(200).json({ rows });
  } catch (err) {
    console.error("admin-requests db error:", err);
    return res.status(500).json({ error: "Gagal mengambil data." });
  }
};
