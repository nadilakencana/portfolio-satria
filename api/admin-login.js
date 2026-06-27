const jwt = require("jsonwebtoken");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, password } = req.body || {};

  if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Username atau password salah." });
  }

  const token = jwt.sign({ role: "admin", username }, process.env.JWT_SECRET, { expiresIn: "1d" });
  return res.status(200).json({ token });
};
