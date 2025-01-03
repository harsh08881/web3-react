import React, { useState } from "react";
import WalletConnect from "../wallet/Wallet";
import useWallet from "../../Hooks/useWalletConnection";
import "./header.css";
import { useTheme } from "../../contexts/DarkContext";
const Header = () => {
  const { isDarkmode } = useTheme();
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
        <header className={`header`}>
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
            <button className={`header-wallet ${isDarkmode ? 'dark-button' : 'light-button' }`} onClick={() => handleclicked()}>
              Connect Wallet
            </button>
          )}
        </header>
      </div>
      <div>
        {!isConnected && ShowComponent && (
          <WalletConnect
            ShowComponent={ShowComponent}
            setShowComponent={setShowComponent}
            setIsConnected={setIsConnected}
            checkWalletConnection={checkWalletConnection}
          />
        )}
      </div>
    </>
  );
};

export default Header;
