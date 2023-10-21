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
        erc20 = await ethers.getContract("MockERC20", owner);
        erc721 = await ethers.getContract("MockERC721", owner);
        erc1155 = await ethers.getContract("MockERC1155", owner);
      });

      it("should perform an ERC20 Airdrop", async () => {
        const amounts = [100, 200]
        await token.connect(owner).approve(airDrop.address, 300)
        await expect(
          airDrop.bulkAirDropERC20(token.address, [recipient1.address, recipient2.address], amounts)
          .to.emit(airDrop, "BulkAirDropERC20")
          .withArgs(owner.address, token.address, recipient1.address, 100)
          .and.to.emit(airDrop, "BulkAirDropERC20")
          .withArgs(owner.address, token.address, recipient2.address, 200)
        )
        
        const balance1 = await token.balanceOf(recipient1.address)
        const balance2 = await token.balanceOf(recipient2.address)

        expect(balance1.toNumber()).to.equal(100)
        expect(balance2.toNumber()).to.equal(200)
      });

      it("should perform an ERC721 Airdrop", async () => {
        const tokenIds = [1,2]
        await erc721.mintBatch(recipient1.address, tokenIds)
        await expect(
          airDrop.bulkAirDropERC721(erc721.address, [recipient2.address, recipient1.address], tokenIds)
          .to.emit(erc721, 'Transfer')
          .withArgs(owner.address, recipient2.address, tokenIds[0])
          .and.to.emit(erc721, 'Transfer')
          .withArgs(owner.address, recipient1.address, tokenIds[1])
        )

        const ownerOfToken1 = await erc721.ownerOf(tokenIds[0])
        const ownerOfToken2 = await erc721.ownerOf(tokenIds[1])

        expect(ownerOfToken1).to.equal(recipient2.address)
        expect(ownerOfToken2).to.equal(recipient1.address)
      })

      it("should perform an ERC1155 Airdrop", async () => {
        const tokenIds = [1,2]
        const amounts = [5,10]

        await erc1155.mintBatch(owner.address, tokenIds, amounts)

        await expect(
          airDrop.bulkAirDrop1155(erc1155.address, [recipient1.address, recipient2.address], tokenIds, amounts)
          .to.emit(erc1155, 'TransferSingle')
          .withArgs(owner.address, owner.address, recipient1.address, tokenIds[0], amounts[0])
          .and.to.emit(erc1155, 'TransferSingle')
          .withArgs(owner.address, owner.address, recipient2.address, tokenIds[1], amounts[1])
        )

        const balanceReciept1 = await erc1155.balanceOf(recipient1.address, tokenIds[0])
        const balanceReciept2 = await erc1155.balanceOf(recipient2.address, tokenIds[1])

        expect(balanceReciept1.toNumber()).to.equal(amounts[0])
        expect(balanceReciept2.toNumber()).to.equal(amounts[1])
      })
  });
