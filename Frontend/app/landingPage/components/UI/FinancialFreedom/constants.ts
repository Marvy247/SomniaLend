import ic_banknotes from '../../../../public/svgs/ic_banknotes.svg';
import ic_circle_stack from '../../../../public/svgs/ic_circle_stack.svg';
import ic_arrows_left_right from '../../../../public/svgs/ic_arrows_right_left.svg';

// For desktop
export const desktopHeaderPhrase = ['Financial Inclusion,', 'Your Way'];
export const desktopParagraphPhrase = [
  'SomniaLend empowers unbanked farmers and entrepreneurs in Africa with seamless micro-lending tools.',
  'Fast, low-cost transactions on the Somnia network for everyone.',
];
export const desktopBriefNotePhrase = [
  'Micro-loans,',
  'NFT collateral,',
  'Seamless Swapping ,',
  'all in one platform.',
];

// For mobile
export const mobileHeaderPhrase = ['Financial', 'Inclusion, Your Way'];
export const mobileParagraphPhrase = [
  'SomniaLend empowers unbanked farmers and entrepreneurs in',
  'Africa with seamless micro-lending tools. Fast, low-cost',
  'transactions on the Somnia network for everyone.',
];

export const mobileBriefNotePhrase = [
  'Micro-loans,',
  'NFT',
  'collateral,',
  'Swapping',
  'integration,',
  'all in one',
  'platform.',
];

export const edges = [
  {
    point: 'Low-cost micro-loans',
    details:
      'Access customizable micro-loans with a 5% default interest rate, designed for unbanked farmers and entrepreneurs, with no hidden fees.',
    icon: ic_banknotes,
  },
  {
    point: 'No transaction fees',
    details:
      'Perform loan requests, repayments, and token swaps on the Somnia network without worrying about high transaction costs.',
    icon: ic_circle_stack,
  },
  {
    point: 'Seamless Swapping',
    details:
      'Convert fiat to crypto (1550 NGN = 1 USDC) with our Offramping system, enabling easy deposits and mobile-friendly access.',
    icon: ic_arrows_left_right,
  },
];