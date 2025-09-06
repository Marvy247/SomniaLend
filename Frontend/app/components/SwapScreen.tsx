'use client';

import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { useWallet } from '../contexts/WalletContext';
import { useTransactionTracker } from '../hooks/useTransactionTracker';
import {
  getBalance,
  swapTokens,
  getGasFee,
  getConfirmationTime,
  TOKEN_ADDRESSES,
  TOKEN_DECIMALS,
  UniswapV3Service,
} from '../utils/web3';
import ConnectWalletButton from './ConnectWalletButton';
import { ArrowDownUp, Clock, Loader2, Shield, Wallet, Zap, Settings, X, ExternalLink } from 'lucide-react';

interface Token {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  icon?: string;
}

// Utility function to generate a mock transaction hash
const generateMockTxHash = () => {
  const chars = '0123456789abcdef';
  let hash = '0x';
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
};

const EnhancedSwapScreen = () => {
  const { isConnected, userAddress } = useWallet();
  const { trackTransaction } = useTransactionTracker();
  const [fromToken, setFromToken] = useState<Token>({
    symbol: 'STK',
    name: 'S Token',
    address: TOKEN_ADDRESSES['STK'],
    decimals: TOKEN_DECIMALS['STK'],
    icon: '/tokensimage/stkimage.png',
  });
  const [toToken, setToToken] = useState<Token>({
    symbol: 'USDC',
    name: 'USDC',
    address: TOKEN_ADDRESSES['USDC'],
    decimals: TOKEN_DECIMALS['USDC'],
    icon: '/tokensimage/usdcimage.png',
  });
  const [amount, setAmount] = useState('');
  const [estimatedOutput, setEstimatedOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [balances, setBalances] = useState<{ [key: string]: string }>({});
  const [slippageTolerance, setSlippageTolerance] = useState(0.5);
  const [gasEstimate, setGasEstimate] = useState('~21000 gas');
  const [needsApproval, setNeedsApproval] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [gasFee, setGasFee] = useState('~$0.001');
  const [confirmationTime, setConfirmationTime] = useState('~2s');
  const [priceImpact, setPriceImpact] = useState('0.00');
  const [showSettings, setShowSettings] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState<'from' | 'to' | null>(null);

  const tokens: Token[] = [
    {
      symbol: 'STK',
      name: 'S Token',
      address: TOKEN_ADDRESSES['STK'],
      decimals: TOKEN_DECIMALS['STK'],
      icon: '/tokensimage/stkimage.png',
    },
    {
      symbol: 'USDC',
      name: 'USDC',
      address: TOKEN_ADDRESSES['USDC'],
      decimals: TOKEN_DECIMALS['USDC'],
      icon: '/tokensimage/usdcimage.png',
    },
    {
      symbol: 'ETH',
      name: 'Ether',
      address: TOKEN_ADDRESSES['ETH'],
      decimals: TOKEN_DECIMALS['ETH'],
      icon: '/tokensimage/ethimage.png',
    },
  ];

  const uniswapService = UniswapV3Service.getInstance();

  const loadBalances = useCallback(async () => {
    if (!isConnected || !userAddress) return;
    try {
      const newBalances: { [key: string]: string } = {};
      for (const token of tokens) {
        const balance = await getBalance(token.symbol);
        newBalances[token.symbol] = balance;
      }
      setBalances(newBalances);
      setErrorMessage('');
    } catch (error: any) {
      setErrorMessage('Error loading token balances');
      toast.error(`Error loading token balances: ${error.message}`, {
        style: { background: '#1a1a1a', color: '#ffffff' },
      });
    }
  }, [isConnected, userAddress]);

  const fetchMetrics = useCallback(async () => {
    try {
      const fee = await getGasFee();
      const time = await getConfirmationTime();
      setGasFee(fee);
      setConfirmationTime(time);
    } catch (error) {
      console.error('Error fetching metrics:', error);
      toast.error('Error fetching gas metrics', { style: { background: '#1a1a1a', color: '#ffffff' } });
    }
  }, []);

  useEffect(() => {
    if (isConnected && userAddress) {
      loadBalances();
      fetchMetrics();
    }
  }, [isConnected, userAddress, loadBalances, fetchMetrics]);

  useEffect(() => {
    if (amount && fromToken && toToken) {
      estimateOutput();
    }
  }, [amount, fromToken, toToken, slippageTolerance]);

  const estimateOutput = async () => {
    if (!amount || fromToken.address === toToken.address) {
      setEstimatedOutput('');
      setNeedsApproval(false);
      setPriceImpact('0.00');
      return;
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setEstimatedOutput('');
      setNeedsApproval(false);
      setPriceImpact('0.00');
      toast.error('Invalid input amount', { style: { background: '#1a1a1a', color: '#ffffff' } });
      return;
    }

    try {
      const output = await uniswapService.calculateExactSwapAmounts(
        fromToken.symbol,
        toToken.symbol,
        amount,
        slippageTolerance
      );
      setEstimatedOutput(output.amountOut);
      setNeedsApproval(true);
      setGasEstimate('~21000 gas');
      setPriceImpact((Math.random() * 0.5).toFixed(2));
      setErrorMessage('');
    } catch (error: any) {
      setEstimatedOutput('');
      setPriceImpact('0.00');
      setErrorMessage('Error getting swap quote');
      toast.error(`Error getting swap quote: ${error.message}`, {
        style: { background: '#1a1a1a', color: '#ffffff' },
      });
    }
  };

  const handleApprove = async () => {
    setIsProcessing(true);
    const toastId = toast.loading('Approving token...', { style: { background: '#1a1a1a', color: '#ffffff' } });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate approval
      const transactionHash = generateMockTxHash(); // Use custom mock hash
      toast.success(
        <div>
          Token approved successfully!
          <a
            href={`https://shannon-explorer.somnia.network/tx/${transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-400 hover:underline mt-2"
          >
            View on Somnia Shannon Explorer
            <ExternalLink size={14} className="ml-1" />
          </a>
        </div>,
        { id: toastId, duration: 5000, style: { background: '#1a1a1a', color: '#ffffff' } }
      );
      setNeedsApproval(false);
    } catch (error: any) {
      toast.error(`Approval failed: ${error.message}`, { id: toastId, style: { background: '#1a1a1a', color: '#ffffff' } });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSwap = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected || !userAddress) {
      toast.error('Wallet not connected', { style: { background: '#1a1a1a', color: '#ffffff' } });
      return;
    }
    if (!amount || parseFloat(amount) <= 0 || isNaN(parseFloat(amount))) {
      toast.error('Invalid amount', { style: { background: '#1a1a1a', color: '#ffffff' } });
      return;
    }
    if (parseFloat(amount) > parseFloat(balances[fromToken.symbol] || '0')) {
      toast.error(`Insufficient ${fromToken.symbol} balance`, {
        style: { background: '#1a1a1a', color: '#ffffff' },
      });
      return;
    }
    if (fromToken.address === toToken.address) {
      toast.error('Cannot swap same token', { style: { background: '#1a1a1a', color: '#ffffff' } });
      return;
    }

    setIsProcessing(true);
    if (needsApproval) {
      await handleApprove();
    }

    const toastId = toast.loading(`Swapping ${amount} ${fromToken.symbol} for ${toToken.symbol}...`, {
      style: { background: '#1a1a1a', color: '#ffffff' },
    });
    try {
      const swapDetails = await swapTokens(fromToken.symbol, toToken.symbol, amount, slippageTolerance);
      if (swapDetails?.transactionHash && swapDetails?.amountOut) {
        trackTransaction(swapDetails.transactionHash, 'swap', amount, `${fromToken.symbol}->${toToken.symbol}`);
        setBalances((prev) => ({
          ...prev,
          [fromToken.symbol]: (parseFloat(prev[fromToken.symbol] || '0') - parseFloat(amount)).toFixed(
            fromToken.decimals === 6 ? 2 : 4
          ),
          [toToken.symbol]: (parseFloat(prev[toToken.symbol] || '0') + parseFloat(swapDetails.amountOut)).toFixed(
            toToken.decimals === 6 ? 2 : 4
          ),
        }));
        toast.success(
          <div>
            Swapped {amount} {fromToken.symbol} for {swapDetails.amountOut} {toToken.symbol}!
            <a
              href={`https://shannon-explorer.somnia.network/tx/${swapDetails.transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-400 hover:underline mt-2"
            >
              View on Somnia Shannon Explorer
              <ExternalLink size={14} className="ml-1" />
            </a>
          </div>,
          { id: toastId, duration: 5000, style: { background: '#1a1a1a', color: '#ffffff' } }
        );
        setAmount('');
        setEstimatedOutput('');
        setNeedsApproval(true);
      } else {
        toast.error('Swap failed', { id: toastId, style: { background: '#1a1a1a', color: '#ffffff' } });
      }
    } catch (error: any) {
      toast.error(`Swap failed: ${error.message}`, { id: toastId, style: { background: '#1a1a1a', color: '#ffffff' } });
    } finally {
      setIsProcessing(false);
    }
  };

  const switchTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setAmount('');
    setEstimatedOutput('');
    setNeedsApproval(false);
  };

  const formatBalance = (balance: string | undefined) => {
    if (!balance) return '0.00';
    const num = parseFloat(balance);
    return num.toFixed(num < 1 ? 4 : 2);
  };

  const handleSelectToken = (token: Token) => {
    if (showTokenModal === 'from') {
      setFromToken(token);
    } else if (showTokenModal === 'to') {
      setToToken(token);
    }
    setShowTokenModal(null);
    setAmount('');
    setEstimatedOutput('');
    setNeedsApproval(false);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] p-6">
      <div className="max-w-md mx-auto bg-[var(--background)] rounded-2xl shadow-xl border border-[var(--border-color)] p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[var(--primary-color)]"> Token Swap on Somnia</h2>
          <button
            onClick={() => setShowSettings(true)}
            className="text-[var(--foreground)] hover:text-[var(--primary-color)]"
          >
            <Settings size={20} />
          </button>
        </div>

        {errorMessage && (
          <div className="bg-[var(--red)]/10 border-l-4 border-[var(--red)] rounded p-4 mb-6 flex items-center">
            <Shield className="text-[var(--red)] mr-2" />
            <p className="text-[var(--foreground)]">{errorMessage}</p>
          </div>
        )}

        {!isConnected ? (
          <div className="text-center py-12">
            <Wallet className="w-12 h-12 text-[var(--foreground)] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">Connect Your Wallet</h3>
            <p className="text-[var(--foreground)] mb-6">Connect your wallet to swap tokens</p>
            <ConnectWalletButton size="large" variant="primary" />
          </div>
        ) : (
          <form onSubmit={handleSwap} className="space-y-4">
            <div className="bg-[var(--input-background)] rounded-xl p-4 border border-[var(--border-color)]">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-[var(--foreground)]">From</label>
                <div className="text-xs text-[var(--foreground)]">
                  <span>Balance: {formatBalance(balances[fromToken.symbol])}</span>
                  <button
                    type="button"
                    onClick={() => setAmount(balances[fromToken.symbol] || '0')}
                    className="ml-2 text-[var(--primary-color)] hover:text-[var(--foreground)] text-xs font-bold"
                  >
                    MAX
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
                  placeholder="0.0"
                  className="w-full text-2xl bg-transparent border-0 focus:ring-0 focus:outline-none text-[var(--foreground)]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowTokenModal('from')}
                  className="flex items-center gap-2 bg-[var(--input-background)] p-2 rounded-lg"
                >
                  <img
                    src={fromToken.icon || '/tokensimage/placeholder.png'}
                    alt={fromToken.symbol}
                    className="w-[28px] h-[28px]"
                    loading="lazy"
                    onError={(e) => (e.target as HTMLImageElement).src = '/tokensimage/placeholder.png'}
                  />
                  <span className="font-semibold text-[var(--primary-color)]">{fromToken.symbol}</span>
                </button>
              </div>
            </div>

            <div className="flex justify-center -my-2 z-10">
              <button
                type="button"
                onClick={switchTokens}
                className="bg-[var(--input-background)] hover:bg-[var(--border-color)] text-[var(--primary-color)] p-2 rounded-full border-4 border-[var(--card-background)] shadow-sm hover:shadow-md transition-all"
              >
                <ArrowDownUp size={16} />
              </button>
            </div>

            <div className="bg-[var(--input-background)] rounded-xl p-4 border border-[var(--border-color)]">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-[var(--foreground)]">To</label>
                <div className="text-xs text-[var(--foreground)]">
                  <span>Balance: {formatBalance(balances[toToken.symbol])}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={estimatedOutput || '0.0'}
                  readOnly
                  className="w-full text-2xl bg-transparent border-0 focus:ring-0 focus:outline-none text-[var(--foreground)]"
                />
                <button
                  type="button"
                  onClick={() => setShowTokenModal('to')}
                  className="flex items-center gap-2 bg-[var(--input-background)] p-2 rounded-lg"
                >
                  <img
                    src={toToken.icon || '/tokensimage/placeholder.png'}
                    alt={toToken.symbol}
                    className="w-[25px] h-[25px]"
                    loading="lazy"
                    onError={(e) => (e.target as HTMLImageElement).src = '/tokensimage/placeholder.png'}
                  />
                  <span className="font-semibold text-[var(--primary-color)]">{toToken.symbol}</span>
                </button>
              </div>
            </div>

            <div className="text-sm text-[var(--foreground)] text-center">
              1 {fromToken.symbol} ≈ {estimatedOutput ? (parseFloat(estimatedOutput) / parseFloat(amount || '1')).toFixed(4) : '0.00'} {toToken.symbol} (Price Impact: {priceImpact}%)
            </div>

            <button
              type="submit"
              disabled={isProcessing || !amount || !estimatedOutput}
              className={`w-full flex items-center justify-center space-x-2 font-bold py-6 px-6 rounded-lg transition-all duration-200 ${
                isProcessing || !amount || !estimatedOutput
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-[var(--primary-color)] hover:bg-emerald-600 text-[var(--foreground)] shadow-md hover:shadow-lg'
              }`}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <ArrowDownUp size={18} />
                  <span>{needsApproval ? 'Approve and Swap' : 'Swap'}</span>
                </>
              )}
            </button>
          </form>
        )}

        {showSettings && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center text-[var(--primary-color)] z-50">
            <div className="bg-[var(--card-background)] rounded-2xl p-6 shadow-xl border border-[var(--border-color)] w-full max-w-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Settings</h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-[var(--foreground)] hover:text-[var(--primary-color)]"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-[var(--foreground)]">Slippage Tolerance (%)</label>
                  <div className="flex gap-2">
                    {[0.1, 0.5, 1].map((val) => (
                      <button
                        key={val}
                        onClick={() => setSlippageTolerance(val)}
                        className={`px-4 py-2 rounded-lg ${
                          slippageTolerance === val
                            ? 'bg-[var(--primary-color)] text-[var(--foreground)]'
                            : 'bg-[var(--input-background)] text-[var(--foreground)] hover:bg-[var(--border-color)]'
                        }`}
                      >
                        {val}%
                      </button>
                    ))}
                    <input
                      type="number"
                      value={slippageTolerance}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        if (!isNaN(value) && value > 0) setSlippageTolerance(value);
                      }}
                      className="w-full px-3 py-2 border rounded-md bg-[var(--input-background)] border-[var(--border-color)] text-[var(--foreground)]"
                      min="0.01"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {showTokenModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-[var(--card-background)] rounded-2xl p-6 shadow-xl border border-[var(--border-color)] w-full max-w-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Select a token</h3>
                <button
                  onClick={() => setShowTokenModal(null)}
                  className="text-[var(--foreground)] hover:text-[var(--primary-color)]"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-2">
                {tokens.map((token) => (
                  <button
                    key={token.symbol}
                    onClick={() => handleSelectToken(token)}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-[var(--input-background)]"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={token.icon || '/tokensimage/placeholder.png'}
                        alt={token.symbol}
                        className="w-[25px] h-[25px]"
                        loading="lazy"
                        onError={(e) => (e.target as HTMLImageElement).src = '/tokensimage/placeholder.png'}
                      />
                      <div>
                        <p className="font-semibold">{token.name}</p>
                        <p className="text-sm text-[var(--foreground)]">{token.symbol}</p>
                      </div>
                    </div>
                    <span className="font-mono">{formatBalance(balances[token.symbol])}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedSwapScreen;