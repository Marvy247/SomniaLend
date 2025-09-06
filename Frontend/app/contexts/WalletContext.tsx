"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { connectWallet, getBalance, getUserAddress } from '../utils/web3';

interface WalletContextType {
  isConnected: boolean;
  userAddress: string | null;
  balance: { STK: string; USDC: string };
  isConnecting: boolean;
  error: string | null;
  connectWallet: () => Promise<string | null>;
  disconnectWallet: () => Promise<void>;
  refreshBalance: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState({ STK: '0', USDC: '0' });
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWalletState = async () => {
      try {
        const savedAddress = localStorage.getItem('walletAddress');
        const savedConnected = localStorage.getItem('walletConnected') === 'true';
        const savedTimestamp = localStorage.getItem('walletConnectionTimestamp');
        
        const isConnectionValid = savedTimestamp && 
          (Date.now() - parseInt(savedTimestamp)) < (24 * 60 * 60 * 1000);
        
        if (savedAddress && savedConnected && isConnectionValid) {
          await attemptSilentReconnection(savedAddress);
        } else {
          clearWalletState();
        }
      } catch (err) {
        console.error('Failed to load wallet state:', err);
        clearWalletState();
      }
    };

    loadWalletState();
  }, []);

  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (!document.hidden && isConnected) {
        await verifyConnection();
      }
    };

    const handleFocus = async () => {
      if (isConnected) {
        await refreshBalance();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [isConnected]);

  // Add network change listener for Somnia Mainnet (chainId 146)
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('chainChanged', (chainId: string) => {
        if (parseInt(chainId, 16) !== 146) {
          setError('Please switch to Somnia Mainnet network');
          disconnectWallet();
        }
      });
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setUserAddress(accounts[0]);
          setIsConnected(true);
          refreshBalance();
        } else {
          clearWalletState();
        }
      });
    }
  }, []);

  const attemptSilentReconnection = async (expectedAddress: string) => {
    try {
      const currentAddress = await getUserAddress();
      if (currentAddress && currentAddress.toLowerCase() === expectedAddress.toLowerCase()) {
        setUserAddress(currentAddress);
        setIsConnected(true);
        setError(null);
        await refreshBalance();
      } else {
        clearWalletState();
      }
    } catch (err) {
      clearWalletState();
    }
  };

  const verifyConnection = async () => {
    try {
      const currentAddress = await getUserAddress();
      if (!currentAddress || currentAddress !== userAddress) {
        await connectWalletHandler();
      } else {
        await refreshBalance();
      }
    } catch (err) {
      setError('Connection verification failed');
      await disconnectWallet();
    }
  };

  const clearWalletState = () => {
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('walletConnected');
    localStorage.removeItem('walletConnectionTimestamp');
    document.cookie = 'wallet-connected=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    setIsConnected(false);
    setUserAddress(null);
    setBalance({ STK: '0', USDC: '0' });
    setError(null);
  };

  const connectWalletHandler = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      // Verify Somnia Mainnet network
      if (window.ethereum) {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        if (parseInt(chainId, 16) !== 146) {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x92' }], // 146 in hex
            });
          } catch (switchError: any) {
            if (switchError.code === 4902) {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                  chainId: '0x92',
                  chainName: 'Somnia Mainnet',
                  nativeCurrency: { name: 'Somnia Token', symbol: 'STK', decimals: 18 },
                  rpcUrls: ['https://dream-rpc.somnia.network'],
                  blockExplorerUrls: ['https://shannon-explorer.somnia.network'],
                }],
              });
            } else {
              throw switchError;
            }
          }
        }
      }

      const address = await connectWallet();
      if (address) {
        setUserAddress(address);
        setIsConnected(true);
        setError(null);
        localStorage.setItem('walletAddress', address);
        localStorage.setItem('walletConnected', 'true');
        localStorage.setItem('walletConnectionTimestamp', Date.now().toString());
        document.cookie = 'wallet-connected=true; path=/; max-age=86400';
        await refreshBalance();
        return address;
      } else {
        throw new Error('No wallet address found');
      }
    } catch (error: any) {
      console.error('Failed to connect wallet:', error);
      setError(error.message || 'Failed to connect wallet');
      await disconnectWallet();
      throw error;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    try {
      if (window.ethereum) {
        try {
          await window.ethereum.request({
            method: 'wallet_revokePermissions',
            params: [{ eth_accounts: {} }],
          });
        } catch (err) {
          console.warn('MetaMask revoke permissions not supported:', err);
        }
        if (window.ethereum.isMetaMask) {
          window.ethereum.removeAllListeners(['accountsChanged', 'chainChanged']);
        }
      }
      clearWalletState();
    } catch (error: any) {
      console.error('Disconnection error:', error);
      setError(error.message || 'Failed to disconnect wallet');
      throw error;
    }
  };

  const refreshBalance = async () => {
    if (isConnected && userAddress) {
      try {
        const [sBalance, usdcBalance] = await Promise.all([
          getBalance('STK'),
          getBalance('USDC'),
        ]);
        setBalance({ STK: sBalance, USDC: usdcBalance });
        setError(null);
      } catch (error: any) {
        console.error('Failed to refresh balance:', error);
        setError('Failed to refresh balance');
      }
    }
  };

  const value: WalletContextType = {
    isConnected,
    userAddress,
    balance,
    isConnecting,
    error,
    connectWallet: connectWalletHandler,
    disconnectWallet,
    refreshBalance,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};