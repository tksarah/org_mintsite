// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const NftModule = buildModule("NftModule", (m) => {
  const adminOwner = m.getAccount(0);

  const nft = m.contract("BasicERC721", ["0xaae9c8b2B98D2a09C2d4689d8Dd538840643175C", "https://gray-electronic-capybara-902.mypinata.cloud/ipfs/bafybeiftple5bnu233kvqkbeteucgwicb6duiqtoymbtovxpe37scruori/"]);

  return { nft };
});

export default NftModule;
