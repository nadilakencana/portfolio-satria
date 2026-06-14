import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { portfolioItems } from "../data/portfolioData";
import { FaGithub, FaExternalLinkAlt, FaChartBar, FaNewspaper, FaDatabase, FaArrowLeft, FaCamera } from "react-icons/fa";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const linkIconMap = {
  GITHUB: <FaGithub />,
  TABLEAU: <FaChartBar />,
  MEDIUM: <FaNewspaper />,
  "DATA STUDIO": <FaDatabase />,
  "LINK SITE GEMOGI": <FaExternalLinkAlt />,
};

const SectionTitle = ({ children, color }) => (
  <div style={{ marginBottom: 24 }}>
    <h2 style={{ color: color, fontSize: "1.4rem", fontWeight: 700, marginBottom: 8 }}>{children}</h2>
    <div style={{ height: 3, width: 60, background: color, borderRadius: 2 }}></div>
  </div>
);

const CheckList = ({ items }) => (
  <ul style={{ listStyle: "none", padding: 0 }}>
    {items.map((item, i) => (
      <motion.li
        key={i}
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.07 }}
        style={{ display: "flex", gap: 10, padding: "7px 0", borderBottom: "1px solid #f0f0f0", color: "#444", fontSize: "0.95rem" }}
      >
        <span style={{ color: "#22c55e", flexShrink: 0, marginTop: 2 }}>✔</span>
        <span>{item}</span>
      </motion.li>
    ))}
  </ul>
);

const TagList = ({ items, color }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
    {items.map((t, i) => (
      <span key={i} style={{
        padding: "5px 14px", borderRadius: 6, fontSize: "0.82rem",
        border: `1.5px solid ${color}`, color: color, background: "white"
      }}>{t}</span>
    ))}
  </div>
);

const Card = ({ children, style = {} }) => (
  <div style={{
    background: "white", borderRadius: 14, padding: "28px 30px",
    boxShadow: "0 2px 16px rgba(0,0,0,0.06)", marginBottom: 24, ...style
  }}>
    {children}
  </div>
);

const PortfolioDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = portfolioItems.find((p) => p.id === parseInt(id));

  if (!item) {
    return (
      <>
        <Navbar />
        <div style={{ textAlign: "center", padding: "120px 20px" }}>
          <h2>Portfolio tidak ditemukan</h2>
          <button onClick={() => navigate("/")} style={{ marginTop: 20, padding: "12px 30px", background: "#ff6b35", color: "white", border: "none", borderRadius: 8, cursor: "pointer" }}>
            Kembali ke Home
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div style={{ background: "linear-gradient(135deg, #fff5f0 0%, #ffffff 50%, #f0f8ff 100%)", minHeight: "100vh", paddingTop: 80 }}>

        {/* Hero Header Section */}
        <div style={{boxShadow: "0 2px 20px rgba(135, 135, 135, 0.06)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 20px 30px" }}>
  
            <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#1a1a2e", margin: "6px 0 4px" }}>
                {item.title}
              </h1>
              {item.subtitle && <p style={{ color: "#777", fontSize: "1rem" }}>{item.subtitle}</p>}
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 20px 80px" }}>

          {/* Info Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ background: "white", borderRadius: 14, padding: "20px 30px", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", marginBottom: 30, display: "flex", flexWrap: "wrap", gap: "10px 40px", borderLeft: `4px solid ${item.color}` }}
          >
            <div><span style={{ color: "#999", fontSize: "0.8rem" }}>PERUSAHAAN</span><p style={{ fontWeight: 600, color: "#1a1a2e" }}>{item.company}</p></div>
            {item.lokasi && <div><span style={{ color: "#999", fontSize: "0.8rem" }}>LOKASI</span><p style={{ fontWeight: 600, color: "#1a1a2e" }}>{item.lokasi}</p></div>}
            <div><span style={{ color: "#999", fontSize: "0.8rem" }}>PERIODE</span><p style={{ fontWeight: 600, color: "#1a1a2e" }}>{item.period}</p></div>
          </motion.div>

          {/* ===== PART 1: DATA ANALYST ===== */}
          {item.id === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>

              {/* Deskripsi */}
              <Card>
                <SectionTitle color={item.color}>Tentang</SectionTitle>
                <p style={{ color: "#555", lineHeight: 1.8 }}>{item.description}</p>
              </Card>

              {/* Core Technical Ecosystem */}
              <Card>
                <SectionTitle color={item.color}>Core Technical Ecosystem</SectionTitle>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
                  {item.coreEcosystem.map((eco, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                      style={{ background: "#f8f9fa", borderRadius: 10, padding: "18px 16px", border: "1px solid #eee" }}>
                      <h4 style={{ color: item.color, fontWeight: 700, marginBottom: 4 }}>{eco.name}</h4>
                      <p style={{ color: "#666", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>{eco.role}</p>
                      <p style={{ color: "#888", fontSize: "0.76rem", lineHeight: 1.5 }}>{eco.detail}</p>
                    </motion.div>
                  ))}
                </div>
              </Card>

              {/* Sertifikasi */}
              <Card>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
                  <div>
                    <SectionTitle color={item.color}>Sertifikasi & Pelatihan</SectionTitle>
                    <p style={{ color: "#555", marginBottom: 12, fontSize: "0.9rem" }}>{item.description}</p>
                    <CheckList items={item.certifications} />
                  </div>
                  <div>
                    <SectionTitle color={item.color}>Tools & Skills</SectionTitle>
                    <TagList items={item.tools} color={item.color} />
                  </div>
                </div>
              </Card>

              {/* Projects */}
              {item.projects.map((project, i) => (
                <Card key={project.id}>
                  <SectionTitle color={item.color}>{project.number}. {project.name}</SectionTitle>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30 }}>
                    <div>
                      <p style={{ color: "#555", lineHeight: 1.8, marginBottom: 14 }}>{project.description}</p>
                      <TagList items={[...project.stack.split(", "), project.visualization]} color={item.color} />
                      <div style={{ marginTop: 16 }}>
                        <CheckList items={project.highlights} />
                      </div>
                      {project.links.length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 20 }}>
                          {project.links.map((link, j) => (
                            <motion.a key={j} href={link.url}
                              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                              style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 18px", background: "#1a1a2e", color: "white", borderRadius: 8, fontSize: "0.82rem", fontWeight: 600, textDecoration: "none" }}>
                              {linkIconMap[link.label] || <FaExternalLinkAlt />}
                              {link.label}
                            </motion.a>
                          ))}
                        </div>
                      )}
                    </div>
                    <div>
                      {project.images && project.images.length > 0 ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                          {project.images.map((imgSrc, idx) => (
                            <motion.img
                              key={idx}
                              src={imgSrc}
                              alt={`${project.name} screenshot ${idx + 1}`}
                              initial={{ opacity: 0, scale: 0.97 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.1 }}
                              style={{
                                width: "100%",
                                borderRadius: 12,
                                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                                objectFit: "cover",
                                border: "1px solid #eee",
                              }}
                            />
                          ))}
                        </div>
                      ) : (
                        <div style={{
                          background: "#f0f4f8",
                          borderRadius: 12,
                          minHeight: 180,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#bbb",
                          fontSize: "0.85rem",
                          border: "2px dashed #ddd"
                        }}>
                          📊 Dashboard Preview
                        </div>
                      )}
                    </div>

                  </div>
                </Card>
              ))}

              {/* Project Summary Matrix */}
              <Card>
                <SectionTitle color={item.color}>Project Summary Matrix</SectionTitle>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: item.color }}>
                        {["Project Name", "Domain", "Stack", "Visualization Tools"].map((h, i) => (
                          <th key={i} style={{ color: "white", padding: "12px 16px", textAlign: "left", fontSize: "0.85rem" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {item.projects.map((p, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? "white" : "#f8f9fa" }}>
                          <td style={{ padding: "12px 16px", fontSize: "0.88rem", color: "#333" }}>{p.name}</td>
                          <td style={{ padding: "12px 16px", fontSize: "0.88rem", color: "#555" }}>{p.domain}</td>
                          <td style={{ padding: "12px 16px", fontSize: "0.88rem", color: "#555" }}>{p.stack}</td>
                          <td style={{ padding: "12px 16px", fontSize: "0.88rem", color: "#555" }}>{p.visualization}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ background: "#f0f7ff", borderRadius: 10, padding: "18px 20px", marginTop: 20, borderLeft: `4px solid ${item.color}` }}>
                  <h4 style={{ color: item.color, marginBottom: 8 }}>Dampak Strategis</h4>
                  <p style={{ color: "#555", lineHeight: 1.8 }}>{item.dampakStrategis}</p>
                </div>
              </Card>

              {/* Main Links */}
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {item.links.map((link, i) => (
                  <motion.a key={i} href={link.url}
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 24px", background: "#1a1a2e", color: "white", borderRadius: 8, fontWeight: 600, textDecoration: "none" }}>
                    {linkIconMap[link.label] || <FaExternalLinkAlt />}
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}

          {/* ===== PART 2: IT APP SUPPORT ===== */}
          {item.id === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>

              {/* Highlights */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 24 }}>
                {item.highlights.map((h, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }}
                    style={{ background: "white", borderRadius: 14, padding: "28px 24px", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", borderTop: `4px solid ${item.color}` }}>
                    <h3 style={{ color: item.color, fontSize: "1.8rem", fontWeight: 800, marginBottom: 4 }}>{h.value}</h3>
                    <p style={{ color: "#555", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>{h.label}</p>
                    <p style={{ color: "#888", fontSize: "0.82rem" }}>{h.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* Core Systems */}
              <Card>
                <SectionTitle color={item.color}>Core Systems Handled</SectionTitle>
                <p style={{ color: "#555", marginBottom: 12 }}>{item.description}</p>
                <TagList items={item.coreSystems} color={item.color} />
              </Card>

              {/* Peran & Fungsional */}
              <Card>
                <SectionTitle color={item.color}>Peran & Fungsional Utama</SectionTitle>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
                  <div>
                    <h4 style={{ color: "#1a1a2e", marginBottom: 10 }}>Manajemen Insiden & Klien</h4>
                    <CheckList items={item.manajemenInsiden} />
                  </div>
                  <div>
                    <h4 style={{ color: "#1a1a2e", marginBottom: 10 }}>Pengembangan & Implementasi</h4>
                    <CheckList items={item.pengembangan} />
                  </div>
                </div>
              </Card>

              {/* Integrasi Sistem */}
              <Card>
                <SectionTitle color={item.color}>Spesialisasi Integrasi Sistem Medis</SectionTitle>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
                  <div>
                    <h4 style={{ color: "#1a1a2e", marginBottom: 10 }}>Integrasi Regulator / Pemerintah</h4>
                    <CheckList items={item.integrasiRegulator} />
                  </div>
                  <div>
                    <h4 style={{ color: "#1a1a2e", marginBottom: 10 }}>Integrasi Alat & Penunjang Medis</h4>
                    <CheckList items={item.integrasiMedis} />
                  </div>
                </div>
              </Card>

              {/* Pilot Projects */}
              <Card>
                <SectionTitle color={item.color}>Keberhasilan Implementasi (Pilot Projects)</SectionTitle>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
                  {item.pilotProject.map((p, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
                      style={{ background: "#f8f9fa", borderRadius: 10, padding: "20px 16px", textAlign: "center", borderTop: `3px solid ${item.color}` }}>
                      <h4 style={{ color: "#1a1a2e", fontSize: "0.95rem", marginBottom: 5 }}>{p.name}</h4>
                      <p style={{ color: "#888", fontSize: "0.8rem" }}>{p.location}</p>
                    </motion.div>
                  ))}
                </div>
              </Card>

              {/* Dokumentasi Kunjungan & Evaluasi Klien */}
              <Card>
                <SectionTitle color={item.color}>
                  <FaCamera style={{ marginRight: 10 }} />
                  Dokumentasi Kunjungan & Evaluasi Klien
                </SectionTitle>
                <p style={{ color: "#555", lineHeight: 1.8, marginBottom: 20 }}>
                  Melakukan <i>Monitoring & Evaluasi (MonEv)</i> secara langsung ke lapangan untuk memastikan kelancaran operasional dan menampung <b>feedback</b> pengembangan.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {item.documentation.map((doc, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                      style={{ position: "relative", borderRadius: 12, overflow: "hidden", height: 220 }}>
                      <img src={doc.image} alt={doc.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "32px 16px 14px", background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent)", color: "white" }}>
                        <p style={{ fontWeight: 700, fontSize: "0.92rem", marginBottom: 2 }}>{doc.title}</p>
                        <p style={{ fontSize: "0.8rem", opacity: 0.9 }}>{doc.date}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {/* ===== PART 3: QA & TECH WRITER ===== */}
          {item.id === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>

              {/* Platform Overview */}
              <Card>
                <SectionTitle color={item.color}>Tinjauan Platform Gemogi</SectionTitle>
                <p style={{ color: "#555", marginBottom: 14, lineHeight: 1.8 }}>{item.description}</p>
                <CheckList items={item.platformOverview} />
              </Card>

              {/* QA & Tech Writing */}
              <Card>
                <SectionTitle color={item.color}>Peran & Tanggung Jawab</SectionTitle>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
                  <div>
                    <h4 style={{ color: item.color, marginBottom: 8 }}>1. Quality Assurance (QA)</h4>
                    <p style={{ color: "#666", fontSize: "0.88rem", marginBottom: 12 }}>
                      Memastikan stabilitas dan fungsionalitas platform sebelum dirilis ke production.
                    </p>
                    <CheckList items={item.qaDetail} />
                  </div>
                  <div style={{ background: "#fafafa", borderRadius: 12, padding: "20px 24px", border: "1px solid #eee" }}>
                    <h4 style={{ color: item.color, marginBottom: 8 }}>2. Technical Writing</h4>
                    <p style={{ color: "#666", fontSize: "0.88rem", marginBottom: 12 }}>
                      Menjembatani alur sistem yang kompleks menjadi dokumentasi yang ringkas dan mudah dipahami.
                    </p>
                    <CheckList items={item.technicalWriting} />
                  </div>
                </div>
              </Card>

              {/* Tools by Category */}
              <Card>
                <SectionTitle color={item.color}>Ecosystem & Tools Digunakan</SectionTitle>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 16 }}>
                  {item.toolsByCategory.map((cat, i) => (
                    <div key={i} style={{ background: "#f8f9fa", borderRadius: 10, padding: "18px 16px", border: "1px solid #eee" }}>
                      <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1a1a2e", marginBottom: 10 }}>{cat.category}</h4>
                      <TagList items={cat.tools} color={item.color} />
                    </div>
                  ))}
                </div>
                <p style={{ color: "#aaa", fontSize: "0.8rem" }}>
                  *Termasuk penggunaan intensif Google Workspace (Spreadsheet, Docs, Drive) untuk pelaporan administrasi tim harian.
                </p>
              </Card>

              {/* Links */}
              <div style={{ display: "flex", gap: 12 }}>
                {item.links.map((link, i) => (
                  <motion.a key={i} href={link.url}
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 24px", background: item.color, color: "white", borderRadius: 8, fontWeight: 600, textDecoration: "none" }}>
                    <FaExternalLinkAlt />
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}

          {/* ===== PART 4: IT SUPPORT RS ===== */}
          {item.id === 4 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>

              {/* Deskripsi */}
              <Card>
                <SectionTitle color={item.color}>Gambaran Umum</SectionTitle>
                <p style={{ color: "#555", lineHeight: 1.8 }}>{item.description}</p>
              </Card>

              {/* Operasional Highlights */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 24 }}>
                {item.operasionalHighlights.map((h, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }}
                    style={{ background: "white", borderRadius: 14, padding: "24px", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", borderTop: `4px solid ${item.color}` }}>
                    <h4 style={{ color: item.color, marginBottom: 8 }}>{h.title}</h4>
                    <p style={{ color: "#666", fontSize: "0.88rem", lineHeight: 1.7 }}>{h.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* Infrastruktur & Integrasi */}
              <Card>
                <SectionTitle color={item.color}>Infrastruktur & Integrasi Sistem Medis</SectionTitle>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
                  <div>
                    <h4 style={{ color: "#1a1a2e", marginBottom: 10 }}>Integrasi Ekosistem RS</h4>
                    <p style={{ color: "#666", fontSize: "0.85rem", marginBottom: 10 }}>
                      Memastikan sistem berjalan berkesinambungan antara operasional medis dan administrasi.
                    </p>
                    <CheckList items={item.integrasiEkosistem} />
                  </div>
                  <div>
                    <h4 style={{ color: "#1a1a2e", marginBottom: 10 }}>Infrastruktur Komunikasi Internal</h4>
                    <p style={{ color: "#666", fontSize: "0.85rem", marginBottom: 10 }}>
                      Menjaga keandalan komunikasi krusial antar departemen (IGD, Rawat Inap, Poli, dll).
                    </p>
                    <CheckList items={item.infrastrukturKomunikasi} />
                  </div>
                </div>
              </Card>

              {/* Manajemen Proyek */}
              <Card style={{ borderLeft: `4px solid ${item.color}` }}>
                <SectionTitle color={item.color}>Manajemen Proyek IT & Pengembangan</SectionTitle>
                <p style={{ color: "#555", marginBottom: 14, lineHeight: 1.8 }}>
                  Terlibat aktif sebagai jembatan antara kebutuhan end-user RS dengan regulasi struktural dalam proyek-proyek IT skala rumah sakit.
                </p>
                <CheckList items={item.manajemenProyek} />
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
                  {item.projectTags.map((tag, i) => (
                    <span key={i} style={{ padding: "5px 14px", borderRadius: 6, fontSize: "0.82rem", border: `1.5px solid ${item.color}`, color: item.color, background: "white" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

        </div>
      </div>

      <Footer />
    </>
  );
};

export default PortfolioDetail;
