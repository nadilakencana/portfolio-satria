import React from "react";
import { motion } from "framer-motion";
import { experienceData } from "../data/portfolioData";

const Experience = () => {
  return (
    <section id="experience" className="experience">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-subtitle">Why Choose Me</span>
        <h2>My Experience Area</h2>
      </motion.div>

      <div className="experience-grid">
        {experienceData.map((item, index) => (
          <motion.div
            className="experience-item"
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="experience-info">
              <span>{item.skill}</span>
              <span>{item.percentage}%</span>
            </div>
            <div className="progress-bar">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                whileInView={{ width: `${item.percentage}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.1 }}
              ></motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
