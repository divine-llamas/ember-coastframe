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
  - BaseSimpleStorage.sol — A basic contract for storing and retrieving a single integer.  
  - BaseMultiSigWallet.sol — A simple multi-signature wallet contract requiring multiple approvals before making a transfer.
    
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
0xF1A8E4B0F5C6A7C2D9E6B8F4D3B7E2C4A9F6A1D9

Deployment and verification:
- https://sepolia.basescan.org/address/0xF1A8E4B0F5C6A7C2D9E6B8F4D3B7E2C4A9F6A1D9
- https://sepolia.basescan.org/0xF1A8E4B0F5C6A7C2D9E6B8F4D3B7E2C4A9F6A1D9/0#code  

Contract #2 address:  
0x6F9C0A7F1B1E5D5A2C0A1B6E8A9D2C3F5D8E0C9A

Deployment and verification:
- https://sepolia.basescan.org/address/0x6F9C0A7F1B1E5D5A2C0A1B6E8A9D2C3F5D8E0C9A
- https://sepolia.basescan.org/0x6F9C0A7F1B1E5D5A2C0A1B6E8A9D2C3F5D8E0C9A/0#code  

These testnet deployments provide a controlled environment for validating Base tooling, account abstraction flows, and read-only onchain interactions prior to Base Mainnet usage.
