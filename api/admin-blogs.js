const { sql, ensureBlogTable } = require("./_db");
const { requireAdmin } = require("./_auth");

// Hanya izinkan URL http(s) supaya tidak bisa disisipi "javascript:" dsb.
function cleanUrl(value) {
  const str = String(value || "").trim();
  if (!str) return "";
  try {
    const url = new URL(str);
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : null;
  } catch (err) {
    return null;
  }
}

function parsePayload(body) {
  const { title, image, source_link, description } = body || {};
  const cleanTitle = String(title || "").trim().slice(0, 200);
  if (!cleanTitle) return { error: "Title wajib diisi." };

  const cleanImage = cleanUrl(image);
  if (cleanImage === null) return { error: "Image harus berupa URL http(s) yang valid." };

  const cleanLink = cleanUrl(source_link);
  if (cleanLink === null) return { error: "Link sumber harus berupa URL http(s) yang valid." };

  return {
    data: {
      title: cleanTitle,
      image: cleanImage,
      source_link: cleanLink,
      description: String(description || "").trim().slice(0, 5000),
    },
  };
}

function parseId(value) {
  const id = Number.parseInt(value, 10);
  return Number.isInteger(id) && id > 0 ? id : null;
}

module.exports = async function handler(req, res) {
  if (!requireAdmin(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    await ensureBlogTable();

    switch (req.method) {
      case "GET": {
        const rows = await sql`SELECT * FROM blogs ORDER BY created_at DESC`;
        return res.status(200).json({ rows });
      }

      case "POST": {
        const { data, error } = parsePayload(req.body);
        if (error) return res.status(400).json({ error });
        const [row] = await sql`
          INSERT INTO blogs (title, image, source_link, description)
          VALUES (${data.title}, ${data.image}, ${data.source_link}, ${data.description})
          RETURNING *
        `;
        return res.status(201).json({ row });
      }

      case "PUT": {
        const id = parseId(req.body && req.body.id);
        if (!id) return res.status(400).json({ error: "ID tidak valid." });
        const { data, error } = parsePayload(req.body);
        if (error) return res.status(400).json({ error });
        const [row] = await sql`
          UPDATE blogs
          SET title = ${data.title},
              image = ${data.image},
              source_link = ${data.source_link},
              description = ${data.description},
              updated_at = now()
          WHERE id = ${id}
          RETURNING *
        `;
        if (!row) return res.status(404).json({ error: "Blog tidak ditemukan." });
        return res.status(200).json({ row });
      }

      case "DELETE": {
        const id = parseId((req.query && req.query.id) || (req.body && req.body.id));
        if (!id) return res.status(400).json({ error: "ID tidak valid." });
        const rows = await sql`DELETE FROM blogs WHERE id = ${id} RETURNING id`;
        if (rows.length === 0) return res.status(404).json({ error: "Blog tidak ditemukan." });
        return res.status(200).json({ success: true });
      }

      default:
        res.setHeader("Allow", "GET, POST, PUT, DELETE");
        return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (err) {
    console.error("admin-blogs db error:", err);
    return res.status(500).json({ error: "Gagal memproses data blog." });
  }
};
