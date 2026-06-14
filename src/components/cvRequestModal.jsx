import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CVRequestModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setForm({ name: "", email: "", message: "" });
    setStatus("idle");
    setErrorMsg("");
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/request-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Terjadi kesalahan, coba lagi.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="cv-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="cv-modal"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="cv-modal-close" onClick={handleClose} aria-label="Tutup">
              ✕
            </button>

            {status === "success" ? (
              <div className="cv-modal-success">
                <div className="cv-modal-success-icon">✔</div>
                <h3>Permintaan Terkirim!</h3>
                <p>
                  Terima kasih! Permintaan CV Anda sudah saya terima. Setelah saya konfirmasi, CV akan
                  dikirim ke email yang Anda masukkan.
                </p>
                <button className="btn-primary" onClick={handleClose}>
                  Tutup
                </button>
              </div>
            ) : (
              <>
                <h3 className="cv-modal-title">Request CV</h3>
                <p className="cv-modal-subtitle">
                  Isi data Anda, CV akan dikirim ke email Anda setelah dikonfirmasi.
                </p>
                <form onSubmit={handleSubmit} className="cv-modal-form">
                  <input
                    type="text"
                    name="name"
                    placeholder="Nama Anda"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Anda"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                  <textarea
                    name="message"
                    placeholder="Pesan (opsional)"
                    rows="4"
                    value={form.message}
                    onChange={handleChange}
                  ></textarea>

                  {status === "error" && <p className="cv-modal-error">{errorMsg}</p>}

                  <motion.button
                    type="submit"
                    className="btn-primary"
                    disabled={status === "loading"}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {status === "loading" ? "Mengirim..." : "Kirim Permintaan"}
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CVRequestModal;
