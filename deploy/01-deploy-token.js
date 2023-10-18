const {network} = require("hardhat")
const {developmentChains} = require("../helper-hardhat-config")
const { verify } = require("../helper-function")

module.exports = async ({getNamedAccounts, deployments}) => {
    const {deploy, log} = deployments
    const {deployer} = await getNamedAccounts()
    const airDrop = await deploy("AirDrop", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: 1,
    })
    log("Contract has been deployed...")

    if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY){
        await verify(airDrop.address, [])
    }
}

module.exports.tags = ["all", "token"]