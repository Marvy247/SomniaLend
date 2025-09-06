// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/TestTokens.sol";

contract MintTokens is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Deployed contract addresses from previous deployment
        address testSAddress = 0x065369cE5998353C9b2B92983921B33DbB26AbDa;
        address testUSDCAddress = 0x2d7375EF43dE593DEFab68633470fCe947d64579;
        address testETHAddress = 0xD19a3F7535C5bDFb627fB52536F51679Ed5FD0dE;

        address targetAddress = 0x1D72DB7feb21bf0A3C3D094401C7c56fA10ab013;

        vm.startBroadcast(deployerPrivateKey);

        // Get contract instances
        TestSToken testS = TestSToken(testSAddress);
        TestUSDCToken testUSDC = TestUSDCToken(testUSDCAddress);
        TestETHToken testETH = TestETHToken(testETHAddress);

        // Mint additional tokens to target address
        testS.mint(targetAddress, 1000 * 10**18); // 1000 S tokens
        testUSDC.mint(targetAddress, 100 * 10**6); // 100 USDC
        testETH.mint(targetAddress, 1 * 10**18); // 1 ETH

        console.log("Minted additional tokens to:", targetAddress);
        console.log("S tokens minted: 1000");
        console.log("USDC tokens minted: 100");
        console.log("ETH tokens minted: 1");

        vm.stopBroadcast();
    }
}
