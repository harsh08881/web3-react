import { useState, useEffect } from "react";

const useWalletChecker = () => {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [isCoinbaseWalletInstalled, setIsCoinbaseWalletInstalled] = useState(false);
  const [isPhantomInstalled, setIsPhantomInstalled] = useState(false);

  useEffect(() => {
    // Check for MetaMask
    if (window.ethereum && window.ethereum.isMetaMask) {
      setIsMetaMaskInstalled(true);
    }

    // Check for Coinbase Wallet
    if (window.coinbaseWalletExtension) {
      setIsCoinbaseWalletInstalled(true);
    }

    // Check for Phantom Wallet
    if (window.solana && window.solana.isPhantom) {
      setIsPhantomInstalled(true);
    }
  }, []);

  return {
    isMetaMaskInstalled,
    isCoinbaseWalletInstalled,
    isPhantomInstalled,
  };
};

export default useWalletChecker;
