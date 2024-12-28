import React, { useState } from "react";
import './wallet.css'
// import { ethers } from "ethers";
// import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";

const WalletConnect = ({ ShowComponent, setShowComponent , setIsConnected, checkWalletConnection }) => {
  const [ethAccount, setEthAccount] = useState(null);
  const [solAccount, setSolAccount] = useState(null);
  const [error, setError] = useState("");


  const handleclick = ( ) => {
    setShowComponent(false);
  }

  // Connect to MetaMask
  const connectMetaMask = async () => {
    try {
      let metamaskProvider;
  
      // Check if multiple providers exist
      if (window.ethereum.providers) {
        // Look for MetaMask explicitly
        metamaskProvider = window.ethereum.providers.find(provider => provider.isMetaMask);
      } else if (window.ethereum.isMetaMask) {
        // Single provider setup
        metamaskProvider = window.ethereum;
      }
  
      // If MetaMask is not found, show an error
      if (!metamaskProvider) {
        setError("MetaMask is not installed or not detected as the active wallet.");
        return;
      }
  
      // Request accounts using MetaMask's provider
      const accounts = await metamaskProvider.request({ method: "eth_requestAccounts" });
      setEthAccount(accounts[0]);
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
      setError("");
      console.log(response.publicKey.toString());
    } catch (err) {
      setError(`Phantom connection failed: ${err.message}`);
    }
  };

  return (
    <>
    
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", }} className="wallet">
      <div className="Wallet-header" >
         <h2>Connect Wallet</h2> 
         <button className="cross-button" onClick={()=> handleclick()} ></button>

      
      </div>
     

      {/* MetaMask Connection */}
      <button
        onClick={() =>connectMetaMask()}
        style={{ margin: "10px", padding: "10px 20px", backgroundColor: "#f6851b", color: "white", border: "none", borderRadius: "5px" }}
      >
        Connect MetaMask
      </button>
      {ethAccount && <p>Connected MetaMask Account: {ethAccount}</p>}

      {/* Phantom Connection */}
      <button
        onClick={() => connectPhantom()}
        style={{ margin: "10px", padding: "10px 20px", backgroundColor: "#6826dd", color: "white", border: "none", borderRadius: "5px" }}
      >
        Connect Phantom
      </button>
      {solAccount && <p>Connected Phantom Account: {solAccount}</p>}

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
    </>
  );
};

export default WalletConnect;
