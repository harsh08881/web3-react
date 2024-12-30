import { useState, useEffect } from "react";

const useWallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  // Check if wallet is connected
 
    const checkWalletConnection = async () => {
      try {
        if (window.ethereum) {
            const accounts = await JSON.parse(localStorage.getItem('user')) || "";
            if (!accounts) {
              localStorage.setItem('user', JSON.stringify("")); // Save empty string if no wallet is connected
              setWalletAddress(""); // Set wallet address to empty string
            } else {
              setIsConnected(true); // Set connection state
              setWalletAddress(accounts); // Update wallet address state
            }
        } else {
          console.warn("MetaMask is not installed.");
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    };

  useEffect(()=>{
    checkWalletConnection();
  },[]);

  // Disconnect wallet
  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress("");
  };

  return {
    isConnected,
    walletAddress,
    disconnectWallet,
    setIsConnected,
    checkWalletConnection
  };
};

export default useWallet;
