import React, { useState } from "react";
import "./wallet.css";
import useWalletChecker from "../../Hooks/useWalletChecker";

const WalletConnect = ({
  ShowComponent,
  setShowComponent,
  setIsConnected,
  checkWalletConnection,
  isDarkMode,
}) => {
  const [ethAccount, setEthAccount] = useState(null);
  const [solAccount, setSolAccount] = useState(null);
  const [error, setError] = useState("");

  const { isMetaMaskInstalled, isPhantomInstalled, isCoinbaseWalletInstalled } =
    useWalletChecker();

  const handleclick = () => {
    setShowComponent(false);
  };

  const connectMetaMask = async () => {
    try {
      let metamaskProvider;
      if (window.ethereum.providers) {
        metamaskProvider = window.ethereum.providers.find(
          (provider) => provider.isMetaMask
        );
      } else if (window.ethereum.isMetaMask) {
        metamaskProvider = window.ethereum;
      }
      if (!metamaskProvider) {
        setError("MetaMask is not installed or not detected as the active wallet.");
        return;
      }
      const accounts = await metamaskProvider.request({
        method: "eth_requestAccounts",
      });
      setEthAccount(accounts[0]);
      localStorage.setItem("user", JSON.stringify(accounts[0]));
      setError("");
      setIsConnected(true);
      checkWalletConnection();
    } catch (err) {
      setError(`MetaMask connection failed: ${err.message}`);
    }
  };

  const connectPhantom = async () => {
    try {
      if (!window.solana || !window.solana.isPhantom) {
        setError("Phantom wallet is not installed.");
        return;
      }
      const response = await window.solana.connect();
      setSolAccount(response.publicKey.toString());
      localStorage.setItem("user", JSON.stringify(response.publicKey.toString()));
      setIsConnected(true);
      checkWalletConnection();
      setError("");
    } catch (err) {
      setError(`Phantom connection failed: ${err.message}`);
    }
  };

  return (
    <div
      className={`wallet ${isDarkMode ? "dark-mode" : ""}`}
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: isDarkMode ? "#333" : "#fff",
        color: isDarkMode ? "#fff" : "#000",
      }}
    >
      <div className="Wallet-header">
        <h2>Connect Wallet</h2>
        <button
          className="cross-button"
          onClick={() => handleclick()}
        ></button>
      </div>

      {/* MetaMask Connection */}
      <button
        onClick={() => connectMetaMask()}
        className={`wallet-button ${isDarkMode ? "dark-button" : ""}`}
      >
        Connect MetaMask{" "}
        <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
          {isMetaMaskInstalled && "Detect"}
        </span>
      </button>
      {ethAccount && <p>Connected MetaMask Account: {ethAccount}</p>}

      {/* Phantom Connection */}
      <button
        onClick={() => connectPhantom()}
        className={`wallet-button ${isDarkMode ? "dark-button" : ""}`}
      >
        Connect Phantom{" "}
        <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
          {isPhantomInstalled && "Detect"}
        </span>
      </button>
      {solAccount && <p>Connected Phantom Account: {solAccount}</p>}

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default WalletConnect;
