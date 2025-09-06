import seamless_payments from '../../../../public/images/seamless_payments.png';
import smart_investing from '../../../../public/images/smart_investing.png';
import wealth_management from '../../../../public/images/wealth_management.png';
import financial_planning from '../../../../public/images/financial_planning.png';

// For desktop
export const desktopHeaderPhrases = [
  'Empowering Your Financial',
  'Future with SomniaLend',
];
export const desktopParagraphPhrase = [
  'SomniaLend provides micro-lending tools for unbanked farmers and entrepreneurs.',
  'Join us on the Somnia network to access loans, collateral, and seamless swapping.',
];

// For mobile
export const mobileParagraphPhrase = [
  'SomniaLend provides micro-lending tools for unbanked',
  'farmers and entrepreneurs. Join us on the Somnia',
  'network for loans, collateral, and seamless swapping.',
];

export const offers = [
  {
    illustration: seamless_payments,
    title: 'Micro-Loans',
    details:
      'Access customizable micro-loans with a 5% default interest rate on the Somnia network, designed for unbanked entrepreneurs in Africa.',
  },
  {
    illustration: smart_investing,
    title: 'NFT Collateral',
    details:
      'Lock NFTs or ERC20 tokens as collateral with cross-chain verification on Ethereum via Chainlink CCIP, ensuring secure borrowing.',
  },
  {
    illustration: wealth_management,
    title: 'Token Swaps',
    details:
      'Swap tokens seamlessly using Uniswap V3 integration, enabling flexible management of USDC and S Token for loans and repayments.',
  },
  {
    illustration: financial_planning,
    title: 'Treasury Rewards',
    details:
      'Deposit funds in the SomniaLend treasury to earn FeeM rewards, supporting financial inclusion while growing your assets securely.',
  },
];