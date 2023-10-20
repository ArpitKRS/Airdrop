const { assert, expect } = require("chai");
const { network, deployments, ethers } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("AirDrop", function () {
      let AirDrop, airDrop, owner, recipient1, recipient2, token, erc721, erc1155;

      beforeEach(async () => {
        [owner, recipient1, recipient2] = await ethers.getSigners();
        airDrop = await ethers.getContract("AirDrop", owner);
        mockERC20 = await ethers.getContract("MockERC20", owner);
        mockERC721 = await ethers.getContract("MockERC721", owner);
        mockERC1155 = await ethers.getContract("MockERC1155", owner);
      });

    //   it("should deploy AirDrop contract", async () => {
    //     expect(airDrop.address).to.not.equal(0);
    //   });
      it("should perform an ERC20 Airdrop", async () => {
        const amounts = [100, 200]
        await token.connect(owner).approve(airDrop.address, 300)
      });
  });
