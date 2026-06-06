import React from "react";
import Navbar from "../components/navbar";
import Banner from "../components/banner";
import Services from "../components/services";
import Experience from "../components/experience";
import Portfolio from "../components/portfolio";
import Contact from "../components/contact";
import Footer from "../components/footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <Services />
      <Experience />
      <Portfolio />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
