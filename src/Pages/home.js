import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Holding from "../components/Holding/Holding";
// import Wallet from "../components/Wallet";

const Home = () => {
  // console.log(isDarkmode,"Home");
  return (
    <>
      <Header />
      <Holding/>
      <Footer />
    </>
  );
};

export default Home;