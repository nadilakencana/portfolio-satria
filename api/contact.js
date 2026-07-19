const { sql, ensureContactTable } = require("./_db");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !EMAIL_RE.test(email) || !message) {
    return res.status(400).json({ error: "Nama, email valid, dan pesan wajib diisi." });
  }

  const payload = {
    name: String(name).trim().slice(0, 100),
    email: String(email).trim().slice(0, 200),
    subject: String(subject || "").trim().slice(0, 200),
    message: String(message).trim().slice(0, 2000),
  };

  try {
    await ensureContactTable();
    await sql`
      INSERT INTO contact_messages (name, email, subject, message)
      VALUES (${payload.name}, ${payload.email}, ${payload.subject}, ${payload.message})
    `;
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("contact db error:", err);
    return res.status(500).json({ error: "Gagal mengirim pesan. Coba lagi nanti." });
  }
};
