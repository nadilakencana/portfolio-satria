import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home", section: "home" },
  { href: "/#services", label: "Services", section: "services" },
  { href: "/#experience", label: "Experience", section: "experience" },
  { href: "/#portfolio", label: "Portfolio", section: "portfolio" },
  { href: "/#contact", label: "Contact", section: "contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Highlight menu navbar sesuai section yang sedang aktif di viewport
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.section))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Tutup menu kalau klik link
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <>
      <motion.nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? "12px 0" : "20px 0",
          background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none",
          transition: "all 0.3s ease",
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{ fontSize: "1.8rem", fontWeight: 700, color: "#1a1a2e", cursor: "pointer" }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Satria<span style={{ color: "#ff6b35" }}>.</span>
          </motion.div>

          {/* Desktop Links */}
          <ul style={{
            display: "flex",
            gap: 30,
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
            className="nav-desktop-links"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.section;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`nav-link ${isActive ? "nav-link-active" : ""}`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Hamburger Button - Mobile Only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="hamburger-btn"
            style={{
              display: "none",
              flexDirection: "column",
              gap: 5,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
              zIndex: 1100,
            }}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              style={{ display: "block", width: 24, height: 2, background: "#1a1a2e", borderRadius: 2, transformOrigin: "center" }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              style={{ display: "block", width: 24, height: 2, background: "#1a1a2e", borderRadius: 2 }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              style={{ display: "block", width: 24, height: 2, background: "#1a1a2e", borderRadius: 2, transformOrigin: "center" }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.4)",
              zIndex: 1050,
            }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: 260,
              background: "white",
              zIndex: 1100,
              padding: "30px 30px 40px",
              boxShadow: "-4px 0 30px rgba(0,0,0,0.12)",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {/* Logo di sidebar */}
            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1a1a2e", marginBottom: 20 }}>
              Satria<span style={{ color: "#ff6b35" }}>.</span>
            </div>
            <motion.button
              onClick={() => setMenuOpen(false)}
              whileHover={{ scale: 1.1, background: "#f5f5f5" }}
              whileTap={{ scale: 0.9 }}
              style={{
                width: 36,
                height: 36,
                border: "none",
                borderRadius: "50%",
                background: "#f0f0f0",
                cursor: "pointer",
                fontSize: "1rem",
                color: "#555",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
              }}
            >
              ✕
            </motion.button>

            {navLinks.map((link, i) => {
              const isActive = activeSection === link.section;
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  style={{
                    padding: "14px 16px",
                    borderRadius: 10,
                    color: isActive ? "#ff6b35" : "#333",
                    background: isActive ? "#fff5f0" : "transparent",
                    fontWeight: 600,
                    textDecoration: "none",
                    fontSize: "1rem",
                    transition: "all 0.2s",
                    display: "block",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#fff5f0";
                    e.target.style.color = "#ff6b35";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = isActive ? "#fff5f0" : "transparent";
                    e.target.style.color = isActive ? "#ff6b35" : "#333";
                  }}
                >
                  {link.label}
                </motion.a>
              );
            })}

            
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
