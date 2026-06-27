import React, { useState, useEffect, useCallback } from "react";

const Admin = () => {
  const [token, setToken] = useState(localStorage.getItem("cv_admin_token") || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionId, setActionId] = useState(null);
  const [actionError, setActionError] = useState("");

  const handleLogout = useCallback(() => {
    localStorage.removeItem("cv_admin_token");
    setToken("");
    setRows([]);
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

  useEffect(() => {
    if (token) fetchRows(token);
  }, [token, fetchRows]);

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
        <h2>CV Requests</h2>
        <button className="btn-secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>

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
    </div>
  );
};

export default Admin;
