import { useState, useEffect } from "react";

const useWallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  // Check if wallet is connected
 
    const checkWalletConnection = async () => {
      try {
        if (window.ethereum) {
          const accounts = await window.ethereum.request({ method: "eth_accounts" });
          if (accounts.length > 0) {
            setIsConnected(true);
            setWalletAddress(accounts[0]);
            console.log("djndnd")
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