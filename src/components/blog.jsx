import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const formatDate = (value) =>
  new Date(value).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/blogs")
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Gagal memuat blog.");
        if (!cancelled) setPosts(data.rows);
      })
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="blog" className="blog">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-subtitle">Blog</span>
        <h2>Latest Articles</h2>
      </motion.div>

      {loading && <p className="blog-empty">Memuat...</p>}
      {!loading && error && <p className="blog-empty">{error}</p>}
      {!loading && !error && posts.length === 0 && <p className="blog-empty">Belum ada artikel.</p>}

      <div className="blog-grid">
        {posts.map((post, index) => (
          <motion.article
            className="blog-card"
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ y: -4 }}
          >
            {post.image && (
              <div className="blog-card-image">
                <img src={post.image} alt={post.title} loading="lazy" />
              </div>
            )}
            <div className="blog-card-body">
              <span className="blog-card-date">{formatDate(post.created_at)}</span>
              <h3>{post.title}</h3>
              {post.description && <p>{post.description}</p>}
              {post.source_link && (
                <a
                  className="blog-card-link"
                  href={post.source_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Baca selengkapnya →
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Blog;
