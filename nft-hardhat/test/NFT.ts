import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("NFT", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    const [owner, otherAccount] = await hre.ethers.getSigners();
    const Nft = await hre.ethers.getContractFactory("DemoNFT");
    const nft = await Nft.deploy(owner, "https://tan-worried-jay-256.mypinata.cloud/ipfs/bafybeigiphbjawielwcvit5lt6opr2yfsttxffbayxzf7tgmfsht4ibkvq/");
    return { nft, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { nft, owner } = await loadFixture(deployFixture);
      expect(await nft.owner()).to.equal(owner.address);
    });
  });
});
