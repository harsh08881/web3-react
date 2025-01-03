import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Holding from "../components/Holding/Holding";
import { useTheme } from "../contexts/DarkContext";
// import Wallet from "../components/Wallet";

const Home = () => {
  const { isDarkMode, toggleTheme} = useTheme();
  console.log(isDarkMode,"Home");
  return (
    <>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <Holding isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} />
    </>
  );
};

export default Home;