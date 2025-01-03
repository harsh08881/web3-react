import React, { useState } from "react";
import WalletConnect from "../wallet/Wallet";
import useWallet from "../../Hooks/useWalletConnection";
import "./header.css";
import { useTheme } from "../../contexts/DarkContext";
const Header = ({ isDarkMode , toggleTheme }) => {
  const [ShowComponent, setShowComponent] = useState(false);
  const handleclicked = () => {
    setShowComponent(true);
    console.log("Hankle");
  };
  const {
    isConnected,
    walletAddress,
    disconnectWallet,
    setIsConnected,
    checkWalletConnection,
  } = useWallet();
  return (
    <>
      <div>
        <header className={`header ${isDarkMode ? "dark-mode" : "light-mode"}`}>
          <div className="logo">Web3 App</div>
          <nav className="nav">
            <a href="#home" className="nav-link">
              Home
            </a>
            <a href="#about" className="nav-link">
              About
            </a>
            <a href="#features" className="nav-link">
              Features
            </a>
          </nav>
          {isConnected ? (
            <div >
              {console.log(walletAddress)}
              <button disabled className="header-wallet" onClick={() => {}}>
                Connected: {walletAddress.slice(0, 6)}...
                {walletAddress.slice(-4)}
              </button>
              <button
                onClick={() => disconnectWallet()}
                className="disconnect-btn"
                aria-label="Disconnect Wallet"
              >
               Disconnect
              </button>
            </div>
          ) : (
            <button className={`header-wallet`} onClick={() => handleclicked()}>
              Connect Wallet
            </button>
          )}
           <label className="switch">
           <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
           <span className="slider"></span>
           </label>
        </header>
      </div>
      <div>
        {!isConnected && ShowComponent && (
          <WalletConnect
            ShowComponent={ShowComponent}
            setShowComponent={setShowComponent}
            setIsConnected={setIsConnected}
            checkWalletConnection={checkWalletConnection}
            isDarkMode={isDarkMode}
          />
        )}
      </div> 
    </>

  );
};

export default Header;
