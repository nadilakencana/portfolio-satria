import React from "react";
import { motion } from "framer-motion";
import { servicesData } from "../data/portfolioData";
import { FaDatabase, FaServer, FaBug, FaDesktop } from "react-icons/fa";

const iconMap = {
  data: <FaDatabase />,
  support: <FaServer />,
  testing: <FaBug />,
  it: <FaDesktop />,
};

const Services = () => {
  return (
    <section id="services" className="services">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-subtitle">Services</span>
        <h2>I Provide Wide Range Of Digital Services</h2>
      </motion.div>

      <div className="services-grid">
        {servicesData.map((service, index) => (
          <motion.div
            className="service-card"
            key={service.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
          >
            <div className="service-icon">{iconMap[service.icon]}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
