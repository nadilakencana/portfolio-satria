import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { portfolioItems } from "../data/portfolioData";

const Portfolio = () => {
  const navigate = useNavigate();

  return (
    <section id="portfolio" className="portfolio">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-subtitle">Portfolio</span>
        <h2>My Amazing Works</h2>
      </motion.div>

      <div className="portfolio-grid">
        {portfolioItems.map((item, index) => (
          <motion.div
            className="portfolio-card"
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            style={{ borderTop: `4px solid ${item.color}` }}
          >
            <div className="portfolio-card-content">
              <h3>{item.title}</h3>
              <p className="portfolio-company">{item.company}</p>
              <p className="portfolio-period">{item.period}</p>
              <motion.button
                className="btn-detail"
                style={{ backgroundColor: item.color }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/portfolio/${item.id}`)}
              >
                🔍 DETAIL PORTOFOLIO
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
