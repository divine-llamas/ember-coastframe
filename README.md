# Ember Coastframe (Built for Base)

Ember Coastframe is a browser-first Base utility that confirms network identity and exposes read-only onchain state such as balances and recent blocks using official Base RPC endpoints.

---

## Tooling and dependencies

This project integrates tooling from the Base and Coinbase open-source ecosystems:
- Coinbase Wallet SDK for wallet access
- OnchainKit references for Base-aligned primitives
- viem for typed, efficient, read-only RPC communication
- Multiple Base and Coinbase GitHub repositories referenced directly

---

## Repository layout

- app/ember-coastframe.ts  
  Browser script for wallet connection, chain validation, and RPC reads.

- contracts/  
  Solidity contracts deployed to Base Sepolia for testnet validation:
  - Inheritance.sol — minimal deployment verification contract  
  - errors.sol — simple interaction test contract
    
- package.json  
  Dependency manifest referencing Coinbase SDKs and multiple Base repositories.

---

## Capabilities overview

- Coinbase Wallet connection using EIP-1193  
- Validation of Base-compatible chainIds (8453 / 84532)  
- ETH balance inspection for arbitrary addresses  
- Latest block snapshot with gas metrics  
- Direct Basescan links for verification  

No transactions are signed or broadcast.

---

## Base network context

Base Mainnet  
chainId (decimal): 8453  
Explorer: https://basescan.org  

Base Sepolia  
chainId (decimal): 84532  
Explorer: https://sepolia.basescan.org  

---

## License

MIT License

Copyright (c) 2025 divine_llamas

---

## Author

GitHub: https://github.com/divine-llamas  
Email: divine_llamas.0c@icloud.com  
discord: mezizuru0648  

---

## Testnet Deployment (Base Sepolia)

As part of pre-production validation, one or more contracts may be deployed to the Base Sepolia test network to confirm correct behavior and tooling compatibility.

Network: Base Sepolia  
chainId (decimal): 84532  
Explorer: https://sepolia.basescan.org  

Contract #1 address:  
0x697FF64c1C3c59327935Bc6b40AD1AE53adB06C9

Deployment and verification:
- https://sepolia.basescan.org/address/0x697FF64c1C3c59327935Bc6b40AD1AE53adB06C9
- https://sepolia.basescan.org/0x697FF64c1C3c59327935Bc6b40AD1AE53adB06C9/0#code  

Contract #2 address:  
0x9F3da84D9285EFdab771C53F29310719A9c913EF

Deployment and verification:
- https://sepolia.basescan.org/address/0x9F3da84D9285EFdab771C53F29310719A9c913EF
- https://sepolia.basescan.org/0x9F3da84D9285EFdab771C53F29310719A9c913EF/0#code  

These testnet deployments provide a controlled environment for validating Base tooling, account abstraction flows, and read-only onchain interactions prior to Base Mainnet usage.
