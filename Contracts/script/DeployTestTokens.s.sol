// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/TestTokens.sol";

contract DeployTestTokens is Script {
    // Somnia Shannon RPC: https://dream-rpc.somnia.network
    // Chain ID: 57054
    
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address targetAddress = 0x1D72DB7feb21bf0A3C3D094401C7c56fA10ab013;
        
        vm.startBroadcast(deployerPrivateKey);
        
        // Deploy test tokens
        TestSToken testS = new TestSToken();
        TestUSDCToken testUSDC = new TestUSDCToken();
        TestETHToken testETH = new TestETHToken();
        
        // Deploy faucet
        TokenFaucet faucet = new TokenFaucet(
            address(testS),
            address(testUSDC),
            address(testETH)
        );
        
        // Mint initial amounts to target address
        testS.mint(targetAddress, 1250 * 10**18); // 1250 S tokens
        testUSDC.mint(targetAddress, 45 * 10**6); // 45 USDC
        testETH.mint(targetAddress, 0.25 * 10**18); // 0.25 ETH
        
        // Also mint some to faucet for additional distribution
        testS.mint(address(faucet), 10000 * 10**18);
        testUSDC.mint(address(faucet), 1000 * 10**6);
        testETH.mint(address(faucet), 10 * 10**18);
        
        console.log("Test S Token deployed at:", address(testS));
        console.log("Test USDC Token deployed at:", address(testUSDC));
        console.log("Test ETH Token deployed at:", address(testETH));
        console.log("Token Faucet deployed at:", address(faucet));
        console.log("Target address funded:", targetAddress);
        
        vm.stopBroadcast();
    }
}
