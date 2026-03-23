---
name: blockchain-engineer
description: Use when architecturalizing protocols, developing smart contracts, or auditing security for blockchain systems.
risk: critical
source: self
license: MIT
metadata:
  version: "2.0"
---

# Blockchain Engineering Standards

This skill provides expert guidelines for building the decentralized layer with a focus on security, scalability, and economic robustness.

## When to Use

- Viết/audit smart contracts (Solidity, Rust/Anchor).
- Thiết kế tokenomics, governance, incentive alignment.
- Setup Hardhat/Foundry development environment.
- Deployment strategies (Create2, Proxy patterns, Timelocks).
- Tích hợp Oracles, Bridges, Subgraphs.

## When NOT to Use

- Backend/API truyền thống → Dùng `backend-developer`.
- Frontend DApp UI → Dùng `frontend-developer`.
- Infrastructure/CI cho blockchain → Dùng `devops-engineer`.

---

## Core Responsibilities

1.  **Protocol Architecture**: Design tokenomics, governance structures, and ensuring incentive alignment across the network.
2.  **Smart Contract Mastery**: End-to-end lifecycle management of smart contracts on EVM (Solidity/Yul) and SVM (Rust/Anchor).
3.  **Advanced Security**: Protect value through formal verification, fuzzing, and rigorous audit preparation.
4.  **Scaling Solutions**: Architect solutions using L2s, Optimistic/ZK Rollups, and AppChains.

## Technical Standards & Best Practices

### Development Lifecycle

- **Environment**: Master usage of Hardhat and Foundry (Forge/Cast/Anvil) for EVM; Anchor for Solana.
- **Testing**: Beyond unit tests—implement invariant testing, fuzzing (Echo/Medusa), and fork testing.
- **CI/CD**: Automated pipelines for linting, testing, and deterministic deployments.

### Optimization & Quality

- **Gas Golfing**: Optimize for gas efficiency using Yul/Assembly, storage layout packing, and calldata mastery.
- **Code Quality**: Enforce NatSpec documentation, strict linting (Solhint/Clippy), and clean code patterns.

### Deployment & Ops

- **Patterns**: Use deterministic deployment (Create2) and manage upgrades via standard proxies (Transparent, UUPS, Diamond/EIP-2535).
- **Security**: Manage keys via Multi-sig (Gnosis Safe) and Timelocks. Automate ops with scripting.

## Architecture Patterns

- **Upgradeability**: Future-proof contracts using Transparent, UUPS, or Diamond patterns.
- **Interoperability**: Connect chains using Bridges, Atomic Swaps, and CCIP.
- **Data Integration**: Index data with Subgraphs (The Graph) and secure external feeds via Oracles (Chainlink, Pyth).

## Dynamic Stack Loading

- **EVM (Ethereum/Polygon/Arbitrum)**:
  - [EVM Overview](references/evm.md)
  - [Solidity Development](references/solidity.md)
  - [Deployment & Ops](references/deployment.md)
  - [Mechanisms & Internals](references/mechanisms.md)
- **Solana**: (Create `references/solana.md` if needed)
- **ZK & Privacy**: Focus on ZK-SNARKs/STARKs for privacy and scaling.

---

## ⚠️ Best Practices & Common Pitfalls

### ✅ Do

- **Check-Effects-Interactions** — Bắt buộc cho mọi external call.
- **Use OpenZeppelin** — Đừng viết lại ERC-20/721, dùng audited contracts.
- **Fuzz test invariants** — `forge test --fuzz-runs 10000`.
- **Emit events cho mọi state change** — Indexers và frontend cần.
- **Use multi-sig cho deployment** — Gnosis Safe, không dùng EOA.

### ❌ Don’t

- **Don’t use `tx.origin`** — Vulnerable to phishing attacks.
- **Don’t store secrets on-chain** — Tất cả data là public.
- **Don’t skip Slither/Mythril** — Static analysis bắt bugs tự động.
- **Don’t deploy without timelock** — Users cần "exit window".
- **Don’t hardcode gas limits** — Network updates thay đổi gas costs.

---

## Ví dụ Copy-Paste

```text
# Audit smart contract
@Development/blockchain-engineer Audit ERC-20 token contract cho security vulnerabilities:
- Reentrancy, overflow, access control
- Gas optimization opportunities
- Proxy upgradeability review

# Thiết kế tokenomics
@Development/blockchain-engineer Thiết kế tokenomics cho DeFi lending protocol:
- Supply cap, emission schedule, governance voting
- Incentive alignment cho lenders vs borrowers
```

**Expected Output (Audit Finding):**

```markdown
## Security Audit Report: TokenX ERC-20

### 🔴 CRITICAL: Reentrancy in `withdraw()`
- **Line**: L45-52
- **Issue**: External call before state update
- **Fix**: Move `balances[msg.sender] = 0` BEFORE `.call{value: amount}("")`

### 🟡 MEDIUM: Missing zero-address check
- **Line**: L23 `transfer(address to, uint256 amount)`
- **Fix**: Add `require(to != address(0), "Zero address")`

### 🟢 GAS: Storage packing opportunity
- **Line**: L8-12
- **Save**: ~5000 gas/tx by packing `bool active` + `uint96 balance`
```

---

## Giới hạn (Limitations)

- **Chỉ hỗ trợ EVM + Solana** — các chain khác (Cosmos, Polkadot) cần research thêm.
- **Không formal verification** — chỉ manual audit + fuzzing, không Certora/K Framework.
- **Mainnet deployment cần human approval** — KHÔNG tự deploy lên mainnet.
- **Gas estimation approximate** — phụ thuộc network congestion.
- **Không cover legal/compliance** — token classification (security vs utility) cần legal counsel.

---

## Related Skills

- `backend-developer` — Khi cần off-chain backend (indexer, API).
- `lead-architect` — Khi cần system design cho hybrid on/off-chain.
- `qa-tester` — Khi cần test automation cho smart contracts.
