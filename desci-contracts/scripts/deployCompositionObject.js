const { ethers, upgrades } = require("hardhat");

const dpidRegistry = require("../.openzeppelin/unknown-dpid.json");

async function main() {
  const CompositionObject = await ethers.getContractFactory("CompositionObject");
  console.log("[deployCompositionObject] Deploying Composition Object...");
  const proxy = await upgrades.deployProxy(CompositionObject, [
    dpidRegistry.proxies[0].address,
  ]);
  await proxy.deployed();
  console.log("[deployCompositionObject] CompositionObject deployed to:", proxy.address);
}

main();
