import React, { useState, useEffect, useCallback, useMemo } from "react";

const EMPTY_BLOG = { title: "", image: "", source_link: "", description: "" };

const DateCell = ({ value }) => {
  if (!value) return "-";
  const d = new Date(value);
  return (
    <div className="admin-date-cell">
      <span>{d.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}</span>
      <small>{d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}</small>
    </div>
  );
};

const getHostname = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch (err) {
    return url;
  }
};

const Admin = () => {
  const [token, setToken] = useState(localStorage.getItem("cv_admin_token") || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [activeTab, setActiveTab] = useState("cv"); // cv | contact | blog

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionId, setActionId] = useState(null);
  const [actionError, setActionError] = useState("");

  const [contactRows, setContactRows] = useState([]);
  const [contactLoading, setContactLoading] = useState(false);
  const [contactError, setContactError] = useState("");

  const [blogRows, setBlogRows] = useState([]);
  const [blogLoading, setBlogLoading] = useState(false);
  const [blogError, setBlogError] = useState("");
  const [blogForm, setBlogForm] = useState(null); // null = modal tertutup
  const [blogSaving, setBlogSaving] = useState(false);
  const [blogFormError, setBlogFormError] = useState("");
  const [blogDeletingId, setBlogDeletingId] = useState(null);
  const [blogSearch, setBlogSearch] = useState("");
  const [blogDateFrom, setBlogDateFrom] = useState("");
  const [blogDateTo, setBlogDateTo] = useState("");

  const filteredBlogRows = useMemo(() => {
    const q = blogSearch.trim().toLowerCase();
    const from = blogDateFrom ? new Date(`${blogDateFrom}T00:00:00`) : null;
    const to = blogDateTo ? new Date(`${blogDateTo}T23:59:59.999`) : null;
    return blogRows.filter((row) => {
      if (q) {
        const haystack = [row.title, row.description, row.source_link].join(" ").toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      const created = new Date(row.created_at);
      if (from && created < from) return false;
      if (to && created > to) return false;
      return true;
    });
  }, [blogRows, blogSearch, blogDateFrom, blogDateTo]);

  const hasBlogFilter = Boolean(blogSearch || blogDateFrom || blogDateTo);
  const resetBlogFilter = () => {
    setBlogSearch("");
    setBlogDateFrom("");
    setBlogDateTo("");
  };

  const handleLogout = useCallback(() => {
    localStorage.removeItem("cv_admin_token");
    setToken("");
    setRows([]);
    setContactRows([]);
    setBlogRows([]);
  }, []);

  const fetchRows = useCallback(
    async (tok) => {
      setLoading(true);
      setActionError("");
      try {
        const res = await fetch("/api/admin-requests", {
          headers: { Authorization: `Bearer ${tok}` },
        });
        if (res.status === 401) {
          handleLogout();
          return;
        }
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Gagal memuat data.");
        setRows(data.rows);
      } catch (err) {
        setActionError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [handleLogout]
  );

  const fetchContactRows = useCallback(
    async (tok) => {
      setContactLoading(true);
      setContactError("");
      try {
        const res = await fetch("/api/admin-contact-messages", {
          headers: { Authorization: `Bearer ${tok}` },
        });
        if (res.status === 401) {
          handleLogout();
          return;
        }
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Gagal memuat data.");
        setContactRows(data.rows);
      } catch (err) {
        setContactError(err.message);
      } finally {
        setContactLoading(false);
      }
    },
    [handleLogout]
  );

  const fetchBlogRows = useCallback(
    async (tok) => {
      setBlogLoading(true);
      setBlogError("");
      try {
        const res = await fetch("/api/admin-blogs", {
          headers: { Authorization: `Bearer ${tok}` },
        });
        if (res.status === 401) {
          handleLogout();
          return;
        }
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Gagal memuat data.");
        setBlogRows(data.rows);
      } catch (err) {
        setBlogError(err.message);
      } finally {
        setBlogLoading(false);
      }
    },
    [handleLogout]
  );

  useEffect(() => {
    if (token) {
      fetchRows(token);
      fetchContactRows(token);
      fetchBlogRows(token);
    }
  }, [token, fetchRows, fetchContactRows, fetchBlogRows]);

  const openBlogForm = (row) => {
    setBlogFormError("");
    setBlogForm(
      row
        ? {
            id: row.id,
            title: row.title || "",
            image: row.image || "",
            source_link: row.source_link || "",
            description: row.description || "",
          }
        : { ...EMPTY_BLOG }
    );
  };

  const handleBlogChange = (field) => (e) =>
    setBlogForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setBlogSaving(true);
    setBlogFormError("");
    try {
      const res = await fetch("/api/admin-blogs", {
        method: blogForm.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blogForm),
      });
      if (res.status === 401) {
        handleLogout();
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menyimpan blog.");
      setBlogForm(null);
      await fetchBlogRows(token);
    } catch (err) {
      setBlogFormError(err.message);
    } finally {
      setBlogSaving(false);
    }
  };

  const handleBlogDelete = async (row) => {
    if (!window.confirm(`Hapus blog "${row.title}"?`)) return;
    setBlogDeletingId(row.id);
    setBlogError("");
    try {
      const res = await fetch(`/api/admin-blogs?id=${row.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        handleLogout();
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menghapus blog.");
      await fetchBlogRows(token);
    } catch (err) {
      setBlogError(err.message);
    } finally {
      setBlogDeletingId(null);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login gagal.");
      localStorage.setItem("cv_admin_token", data.token);
      setToken(data.token);
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    setActionId(id);
    setActionError("");
    try {
      const res = await fetch(`/api/admin-${action}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal memproses.");
      await fetchRows(token);
    } catch (err) {
      setActionError(err.message);
    } finally {
      setActionId(null);
    }
  };

  if (!token) {
    return (
      <div className="admin-login-page">
        <form className="admin-login-box" onSubmit={handleLogin}>
          <h2>Admin Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {loginError && <p className="admin-error">{loginError}</p>}
          <button type="submit" className="btn-primary" disabled={loginLoading}>
            {loginLoading ? "Masuk..." : "Masuk"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h2>{{ cv: "CV Requests", contact: "Contact Messages", blog: "Blog" }[activeTab]}</h2>
        <button className="btn-secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="admin-tabs">
        <button
          className={`admin-tab ${activeTab === "cv" ? "admin-tab-active" : ""}`}
          onClick={() => setActiveTab("cv")}
        >
          CV Requests
        </button>
        <button
          className={`admin-tab ${activeTab === "contact" ? "admin-tab-active" : ""}`}
          onClick={() => setActiveTab("contact")}
        >
          Contact Messages
        </button>
        <button
          className={`admin-tab ${activeTab === "blog" ? "admin-tab-active" : ""}`}
          onClick={() => setActiveTab("blog")}
        >
          Blog
        </button>
      </div>

      {activeTab === "cv" && (
        <>
          {actionError && <p className="admin-error">{actionError}</p>}

          {loading ? (
            <p>Memuat...</p>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Pesan</th>
                    <th>Status</th>
                    <th>Tanggal</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <td>{row.name}</td>
                      <td>{row.email}</td>
                      <td>{row.message || "-"}</td>
                      <td>
                        <span className={`admin-status admin-status-${row.status}`}>{row.status}</span>
                      </td>
                      <td>{new Date(row.created_at).toLocaleString("id-ID")}</td>
                      <td>
                        {row.status === "pending" ? (
                          <div className="admin-actions">
                            <button
                              className="admin-btn-approve"
                              disabled={actionId === row.id}
                              onClick={() => handleAction(row.id, "approve")}
                            >
                              Approve
                            </button>
                            <button
                              className="admin-btn-reject"
                              disabled={actionId === row.id}
                              onClick={() => handleAction(row.id, "reject")}
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  ))}
                  {rows.length === 0 && (
                    <tr>
                      <td colSpan={6} style={{ textAlign: "center", padding: "20px" }}>
                        Belum ada permintaan CV.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {activeTab === "contact" && (
        <>
          {contactError && <p className="admin-error">{contactError}</p>}

          {contactLoading ? (
            <p>Memuat...</p>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Pesan</th>
                    <th>Tanggal</th>
                  </tr>
                </thead>
                <tbody>
                  {contactRows.map((row) => (
                    <tr key={row.id}>
                      <td>{row.name}</td>
                      <td>{row.email}</td>
                      <td>{row.subject || "-"}</td>
                      <td>{row.message}</td>
                      <td>{new Date(row.created_at).toLocaleString("id-ID")}</td>
                    </tr>
                  ))}
                  {contactRows.length === 0 && (
                    <tr>
                      <td colSpan={5} style={{ textAlign: "center", padding: "20px" }}>
                        Belum ada pesan masuk.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {activeTab === "blog" && (
        <>
          <div className="admin-blog-toolbar">
            <div className="admin-blog-filters">
              <input
                type="search"
                className="admin-search"
                placeholder="Cari judul, deskripsi, atau link..."
                value={blogSearch}
                onChange={(e) => setBlogSearch(e.target.value)}
              />
              <label className="admin-date-filter">
                Dari
                <input
                  type="date"
                  value={blogDateFrom}
                  max={blogDateTo || undefined}
                  onChange={(e) => setBlogDateFrom(e.target.value)}
                />
              </label>
              <label className="admin-date-filter">
                Sampai
                <input
                  type="date"
                  value={blogDateTo}
                  min={blogDateFrom || undefined}
                  onChange={(e) => setBlogDateTo(e.target.value)}
                />
              </label>
              {hasBlogFilter && (
                <button type="button" className="admin-btn-reset" onClick={resetBlogFilter}>
                  Reset
                </button>
              )}
            </div>
            <button className="admin-btn-add" onClick={() => openBlogForm(null)}>
              + Tambah Blog
            </button>
          </div>

          {blogError && <p className="admin-error admin-error-block">{blogError}</p>}

          {blogLoading ? (
            <p>Memuat...</p>
          ) : (
            <>
              <p className="admin-result-count">
                Menampilkan {filteredBlogRows.length} dari {blogRows.length} blog
              </p>
              <div className="admin-table-wrapper">
                <table className="admin-table admin-blog-table">
                  <colgroup>
                    <col style={{ width: 84 }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: 170 }} />
                    <col />
                    <col style={{ width: 120 }} />
                    <col style={{ width: 120 }} />
                    <col style={{ width: 150 }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Link Sumber</th>
                      <th>Description</th>
                      <th>Created</th>
                      <th>Updated</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBlogRows.map((row) => (
                      <tr key={row.id}>
                        <td>
                          {row.image ? (
                            <img className="admin-blog-thumb" src={row.image} alt="" />
                          ) : (
                            <div className="admin-blog-thumb admin-blog-thumb-empty">—</div>
                          )}
                        </td>
                        <td>
                          <div className="admin-blog-title" title={row.title}>{row.title}</div>
                        </td>
                        <td>
                          {row.source_link ? (
                            <a
                              className="admin-blog-link"
                              href={row.source_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={row.source_link}
                            >
                              {getHostname(row.source_link)} ↗
                            </a>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td>
                          <div className="admin-blog-desc" title={row.description || ""}>
                            {row.description || "-"}
                          </div>
                        </td>
                        <td><DateCell value={row.created_at} /></td>
                        <td><DateCell value={row.updated_at} /></td>
                        <td>
                          <div className="admin-actions">
                            <button
                              className="admin-btn-edit"
                              disabled={blogDeletingId === row.id}
                              onClick={() => openBlogForm(row)}
                            >
                              Edit
                            </button>
                            <button
                              className="admin-btn-reject"
                              disabled={blogDeletingId === row.id}
                              onClick={() => handleBlogDelete(row)}
                            >
                              {blogDeletingId === row.id ? "..." : "Hapus"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredBlogRows.length === 0 && (
                      <tr>
                        <td colSpan={7} className="admin-empty-cell">
                          {blogRows.length === 0 ? "Belum ada blog." : "Tidak ada blog yang cocok dengan filter."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      )}

      {blogForm && (
        <div className="admin-modal-overlay" onClick={() => !blogSaving && setBlogForm(null)}>
          <form className="admin-modal" onClick={(e) => e.stopPropagation()} onSubmit={handleBlogSubmit}>
            <h3>{blogForm.id ? "Edit Blog" : "Tambah Blog"}</h3>
            <label>
              Title *
              <input type="text" value={blogForm.title} onChange={handleBlogChange("title")} maxLength={200} required />
            </label>
            <label>
              Image (URL)
              <input
                type="url"
                placeholder="https://..."
                value={blogForm.image}
                onChange={handleBlogChange("image")}
              />
            </label>
            {blogForm.image && <img className="admin-modal-preview" src={blogForm.image} alt="Preview" />}
            <label>
              Link Sumber
              <input
                type="url"
                placeholder="https://..."
                value={blogForm.source_link}
                onChange={handleBlogChange("source_link")}
              />
            </label>
            <label>
              Description
              <textarea rows={5} value={blogForm.description} onChange={handleBlogChange("description")} />
            </label>
            {blogFormError && <p className="admin-error">{blogFormError}</p>}
            <div className="admin-modal-actions">
              <button type="button" className="btn-secondary" disabled={blogSaving} onClick={() => setBlogForm(null)}>
                Batal
              </button>
              <button type="submit" className="btn-primary" disabled={blogSaving}>
                {blogSaving ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Admin;
