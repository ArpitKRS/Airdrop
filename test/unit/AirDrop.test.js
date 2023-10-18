const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("AirDrop", function () {
        let airDrop, airDropContract, owner, recipient1, recipient2, token

        beforeEach(async () => {
            [owner, recipient1, recipient2] = ethers.getSigners()
            await deployments.fixture(["all"])
            airDropContract = await ethers.getContract("AirDrop", owner)
            airDrop = await airDropContract.connect()
        })
    })