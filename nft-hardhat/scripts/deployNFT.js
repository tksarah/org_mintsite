const { ethers, run } = require("hardhat");

async function main() {
  const [account] = await ethers.getSigners();

  console.log(`Deploying contracts with the account: ${account.address}`);

  // WARNING: Do not use an empty string as the base URI
  // Enter your base URI here
  const baseURI = "";

  const NFT = await ethers.getContractFactory("DemoNFT");
  const nft = await NFT.deploy(
    account.address,
    baseURI
  );
  await nft.waitForDeployment();

  console.log(`NFT deployed to: ${await nft.getAddress()}`);

  await run("verify:verify", {
    address: await nft.getAddress(),
    constructorArguments: [
      account.address,
      baseURI,
    ],
  });
}

main()
  .then(async () => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
