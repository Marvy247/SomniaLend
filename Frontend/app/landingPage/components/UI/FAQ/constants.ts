type FAQItem = {
  question: string;
  answer: string;
};

export const desktopHeaderPhrase = ['Frequently asked', 'questions'];
export const mobileHeaderPhrase = ['Frequently', 'asked', 'questions'];
export const animate = {
  initial: {
    y: '100%',
    opacity: 0,
  },
  open: (i: number) => ({
    y: '0%',
    opacity: 1,
    transition: { duration: 1, delay: 0.1 * i, ease: [0.33, 1, 0.68, 1] },
  }),
};

export const faqData: FAQItem[] = [
  {
    question: 'How do I create an account with SomniaLend?',
    answer:
      'To create an account with SomniaLend, connect your MetaMask wallet to the Somnia Shannon. Follow the prompts to set up your wallet, and you can start requesting or repaying micro-loans, managing collateral, or depositing funds for rewards.',
  },
  {
    question: 'How does SomniaLend ensure the security of my financial data?',
    answer:
      'SomniaLend leverages the Somnia network’s blockchain for secure, transparent transactions. Smart contracts handle loan requests, repayments, and collateral management, while Chainlink CCIP ensures secure cross-chain NFT verification with Ethereum.',
  },
  {
    question: 'What types of transactions can I perform with SomniaLend?',
    answer:
      'With SomniaLend, you can request and repay micro-loans in USDC, lock NFTs or ERC20 tokens as collateral, swap tokens via Uniswap V3, deposit funds in the treasury for FeeM rewards, and transfer tokens through your wallet.',
  },
  {
    question: 'What benefits does SomniaLend offer for wealth management?',
    answer:
      'SomniaLend supports financial inclusion for unbanked farmers and entrepreneurs in Africa by offering low-cost micro-loans and cross-chain NFT collateral. Depositors earn FeeM rewards, fostering wealth-building opportunities.',
  },
];