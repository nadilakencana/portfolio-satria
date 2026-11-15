const { sql, ensureBlogTable } = require("./_db");

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await ensureBlogTable();
    const rows = await sql`SELECT * FROM blogs ORDER BY created_at DESC`;
    return res.status(200).json({ rows });
  } catch (err) {
    console.error("blogs db error:", err);
    return res.status(500).json({ error: "Gagal mengambil data blog." });
  }
};
