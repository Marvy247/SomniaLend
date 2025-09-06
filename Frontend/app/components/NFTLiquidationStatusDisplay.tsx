import React from 'react';
import { useNFTLiquidationStatus } from '../hooks/useNFTLiquidationStatus';
import { NFT } from '../hooks/useNFTData';
import { LoanInfo } from '../hooks/usePersistentLoan';

interface NFTLiquidationStatusDisplayProps {
  nft: NFT;
  loan: LoanInfo;
}

const NFTLiquidationStatusDisplay: React.FC<NFTLiquidationStatusDisplayProps> = ({ nft, loan }) => {
  const { isAtRisk, isLiquidated, currentPrice, liquidationPrice, message } = useNFTLiquidationStatus(nft, loan);

  if (!nft || !loan) {
    return <div className="text-[var(--foreground)]/50 text-sm">No NFT or loan data available.</div>;
  }

  return (
    <div className="bg-[var(--input-background)] border border-[var(--border-color)] rounded-md p-2 text-sm">
      {isLiquidated ? (
        <div className="text-[var(--red)] font-bold">
          {message || 'NFT has been liquidated.'}
        </div>
      ) : isAtRisk ? (
        <div className="text-[var(--yellow)] font-semibold">
          {message || 'NFT is at risk of liquidation.'}
          <p>Current Price: {currentPrice.toFixed(2)} USDC</p>
          <p>Liquidation Price: {liquidationPrice.toFixed(2)} USDC</p>
        </div>
      ) : (
        <div className="text-[var(--green)]">
          {message || 'NFT is safe from liquidation.'}
        </div>
      )}
    </div>
  );
};

export default NFTLiquidationStatusDisplay;