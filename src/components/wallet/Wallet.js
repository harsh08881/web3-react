import React, { useState } from "react";
import "./wallet.css";
import useWalletChecker from "../../Hooks/useWalletChecker";
// import { ethers } from "ethers";
// import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";

const WalletConnect = ({
  ShowComponent,
  setShowComponent,
  setIsConnected,
  checkWalletConnection,
}) => {
  const [ethAccount, setEthAccount] = useState(null);
  const [solAccount, setSolAccount] = useState(null);
  const [error, setError] = useState("");

  const { isMetaMaskInstalled, isPhantomInstalled ,isCoinbaseWalletInstalled } = useWalletChecker();

  const handleclick = () => {
    setShowComponent(false);
  };

  // Connect to MetaMask
  const connectMetaMask = async () => {
    try {
      let metamaskProvider;

      // Check if multiple providers exist
      if (window.ethereum.providers) {
        // Look for MetaMask explicitly
        metamaskProvider = window.ethereum.providers.find(
          (provider) => provider.isMetaMask
        );
      } else if (window.ethereum.isMetaMask) {
        // Single provider setup
        metamaskProvider = window.ethereum;
      }

      // If MetaMask is not found, show an error
      if (!metamaskProvider) {
        setError(
          "MetaMask is not installed or not detected as the active wallet."
        );
        return;
      }

      // Request accounts using MetaMask's provider
      const accounts = await metamaskProvider.request({
        method: "eth_requestAccounts",
      });
      setEthAccount(accounts[0]);
      localStorage.setItem('user',JSON.stringify(accounts[0]));
      setError(""); // Clear any errors
      setIsConnected(true);
      checkWalletConnection();   
    } catch (err) {
      setError(`MetaMask connection failed: ${err.message}`);
    }
  };

  // Connect to Phantom
  const connectPhantom = async () => {
    try {
      if (!window.solana || !window.solana.isPhantom) {
        setError("Phantom wallet is not installed.");
        return;
      }
      const response = await window.solana.connect();
      setSolAccount(response.publicKey.toString());
      localStorage.setItem('user', JSON.stringify(response.publicKey.toString()));
      setIsConnected(true);
      checkWalletConnection();
      setError("");
      console.log(response.publicKey.toString());
    } catch (err) {
      setError(`Phantom connection failed: ${err.message}`);
    }
  };

  return (
    <>
      <div
        style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}
        className="wallet"
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
          style={{
            margin: "10px",
            padding: "10px 20px",
            backgroundColor: "#f6851b",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Connect MetaMask{" "}
          <span
            style={{
              fontWeight: "bold",
              marginLeft: "5px",
              color: isMetaMaskInstalled ? "#00ff00" : "#ffffff",
            }}
          >
            {isMetaMaskInstalled && "Detect"}
          </span>
        </button>
        {ethAccount && <p>Connected MetaMask Account: {ethAccount}</p>}

        {/* Phantom Connection */}
        <button
          onClick={() => connectPhantom()}
          style={{
            margin: "10px",
            padding: "10px 20px",
            backgroundColor: "#6826dd",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Connect Phantom{" "}
          <span
            style={{
              fontWeight: "bold",
              marginLeft: "5px",
              color: isPhantomInstalled ? "#00ff00" : "#ffffff",
            }}
          >
            {isPhantomInstalled && "Detect"}
          </span>
        </button>
        {solAccount && <p>Connected Phantom Account: {solAccount}</p>}

        <button
          onClick={() => connectPhantom()}
          style={{
            margin: "10px",
            padding: "10px 20px",
            backgroundColor: "#FFC800",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Connect Coinbase{" "}
          <span
            style={{
              fontWeight: "bold",
              marginLeft: "5px",
              color: isCoinbaseWalletInstalled ? "#00ff00" : "#ffffff",
            }}
          >
            {isCoinbaseWalletInstalled ? "Detect" :"Missing"}
          </span>
        </button>

        {/* Error Message */}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </>
  );
};

export default WalletConnect;