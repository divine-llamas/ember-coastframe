// app/ember-coastframe.ts
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { createPublicClient, http, formatEther, isAddress } from "viem";
import { base, baseSepolia } from "viem/chains";

type Net = {
  chain: typeof base;
  chainId: number;
  rpc: string;
  explorer: string;
  label: string;
};

const NETS: Net[] = [
  { chain: baseSepolia, chainId: 84532, rpc: "https://sepolia.base.org", explorer: "https://sepolia.basescan.org", label: "Base Sepolia" },
  { chain: base, chainId: 8453, rpc: "https://mainnet.base.org", explorer: "https://basescan.org", label: "Base Mainnet" },
];

let active = NETS[0];

const sdk = new CoinbaseWalletSDK({
  appName: "Ember Coastframe (Built for Base)",
  appLogoUrl: "https://base.org/favicon.ico",
});

const out = document.createElement("pre");
out.style.background = "#0b0f1a";
out.style.color = "#dbe7ff";
out.style.padding = "14px";
out.style.borderRadius = "12px";
out.style.minHeight = "320px";

function print(lines: string[]) {
  out.textContent = lines.join("\n");
}

function client() {
  return createPublicClient({ chain: active.chain, transport: http(active.rpc) });
}

async function connect() {
  const provider = sdk.makeWeb3Provider(active.rpc, active.chainId);
  const accounts = (await provider.request({ method: "eth_requestAccounts" })) as string[];
  const address = accounts?.[0];
  if (!address) throw new Error("No address returned");

  const chainHex = (await provider.request({ method: "eth_chainId" })) as string;
  const bal = await client().getBalance({ address: address as `0x${string}` });

  print([
    "Connected",
    `Network: ${active.label}`,
    `chainId: ${parseInt(chainHex, 16)}`,
    `Address: ${address}`,
    `ETH balance: ${formatEther(bal)} ETH`,
    `${active.explorer}/address/${address}`,
  ]);
}

async function latestBlock() {
  const b = await client().getBlock();
  print([
    "Latest block",
    `Network: ${active.label}`,
    `Block: ${b.number}`,
    `Timestamp: ${b.timestamp}`,
    `Gas used: ${b.gasUsed}`,
    `${active.explorer}/block/${b.number}`,
  ]);
}

async function readBalance(addr: string) {
  if (!isAddress(addr)) throw new Error("Invalid address");
  const bal = await client().getBalance({ address: addr as `0x${string}` });
  print([
    "Balance lookup",
    `Network: ${active.label}`,
    `Address: ${addr}`,
    `ETH balance: ${formatEther(bal)} ETH`,
    `${active.explorer}/address/${addr}`,
  ]);
}

function toggle() {
  active = active.chainId === 84532 ? NETS[1] : NETS[0];
  print([`Switched to ${active.label}. Reconnect wallet.`]);
}

function mount() {
  const root = document.createElement("div");
  root.style.maxWidth = "960px";
  root.style.margin = "24px auto";
  root.style.fontFamily = "system-ui";

  const h1 = document.createElement("h1");
  h1.textContent = "Ember Coastframe";

  const controls = document.createElement("div");
  controls.style.display = "flex";
  controls.style.gap = "10px";
  controls.style.marginBottom = "12px";

  const addr = document.createElement("input");
  addr.placeholder = "0x… address";
  addr.style.minWidth = "360px";

  function btn(label: string, fn: () => void | Promise<void>) {
    const b = document.createElement("button");
    b.textContent = label;
    b.onclick = () => Promise.resolve(fn()).catch(e => print([String(e)]));
    return b;
  }

  controls.append(btn("Connect Wallet", connect), btn("Toggle Network", toggle), btn("Latest Block", latestBlock));
  root.append(h1, controls, addr, btn("Read Balance", () => readBalance(addr.value)), out);
  document.body.appendChild(root);

  print(["Ready", `Active network: ${active.label}`, "Connect wallet to begin (read-only)."]);
}

mount();
