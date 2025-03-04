// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const NftModule = buildModule("NftModule", (m) => {
  const adminOwner = m.getAccount(0);

  const nft = m.contract("DemoNFT", ["0xCcA55A052F2140541b6650093890A0a21405dCc7", "https://tan-worried-jay-256.mypinata.cloud/ipfs/bafybeigiphbjawielwcvit5lt6opr2yfsttxffbayxzf7tgmfsht4ibkvq/"]);

  return { nft };
});

export default NftModule;
