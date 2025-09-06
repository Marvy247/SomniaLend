// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/LendingContractNFT.sol";
import "../src/EthereumCollateralVerifier.sol";
import "../src/TreasuryContract.sol";
import "../src/CollateralContract.sol";

contract DeployScript is Script {
    // Uniswap V3 Router address on  mainnet
    address constant UNISWAP_ROUTER_ADDRESS = 0x9c3DFddEAb8c67F6ef3D9114c11Bf1136Ad9b5E7;
    // Chainlink CCIP Router address on Somnia Shannon
    address constant CCIP_ROUTER_ADDRESS = 0x9c3DFddEAb8c67F6ef3D9114c11Bf1136Ad9b5E7;
    // USDC address on Somnia Shannon
    address constant USDC_ADDRESS = 0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6;

    function run() external {
        // Read private key as string and add "0x" prefix if missing
        string memory privateKeyString = vm.envString("PRIVATE_KEY");
        if (bytes(privateKeyString).length == 64) {
            // Add "0x" prefix if it's missing
            privateKeyString = string(abi.encodePacked("0x", privateKeyString));
        }
        uint256 deployerPrivateKey = vm.parseUint(privateKeyString);
        vm.startBroadcast(deployerPrivateKey);

        // Deploy the CollateralContract
        CollateralContract collateralContract = new CollateralContract(CCIP_ROUTER_ADDRESS);
        console.log("CollateralContract deployed at: ", address(collateralContract));

        // Deploy the TreasuryContract
        TreasuryContract treasuryContract = new TreasuryContract{salt: bytes32(0)}(USDC_ADDRESS);
        console.log("TreasuryContract deployed at: ", address(treasuryContract));

        // Deploy the EthereumCollateralVerifier
        EthereumCollateralVerifier verifier = new EthereumCollateralVerifier{salt: bytes32(0)}();
        console.log("EthereumCollateralVerifier deployed at: ", address(verifier));

        // Deploy the LendingContractNFT
        LendingContractNFT lendingContractNFT = new LendingContractNFT{salt: bytes32(0)}(UNISWAP_ROUTER_ADDRESS, address(collateralContract));
        console.log("LendingContractNFT deployed at: ", address(lendingContractNFT));

        vm.stopBroadcast();
    }
}
