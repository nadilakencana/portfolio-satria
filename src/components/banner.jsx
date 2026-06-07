import React from "react";
import { motion } from "framer-motion";
import { profileData } from "../data/portfolioData";

const Banner = () => {
  return (
    <section id="home" className="banner">
      <div className="banner-container">
        <motion.div
          className="banner-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="banner-greeting">Hi, I'm</span>
          <h1 className="banner-name">{profileData.name}</h1>
          <h3 className="banner-title">{profileData.title}</h3>
          <p className="banner-desc">{profileData.description}</p>
          <div className="banner-buttons">
            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download CV
            </motion.button>
            <motion.button
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="banner-image"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="image-wrapper">
            <div className="image-bg"></div>
            <img
              src="/images/Pas Photo Wisuda - Tampa Logo.jpg"
              alt="Profile"
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        className="banner-stats"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {profileData.stats.map((stat, index) => (
          <div className="stat-item" key={index}>
            <div className="stat-icon">✦</div>
            <div>
              <h4>{stat.value}</h4>
              <p>{stat.label}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default Banner;
