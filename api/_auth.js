const jwt = require("jsonwebtoken");

function requireAdmin(req) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return null;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload.role === "admin" ? payload : null;
  } catch (err) {
    return null;
  }
}

module.exports = { requireAdmin };
