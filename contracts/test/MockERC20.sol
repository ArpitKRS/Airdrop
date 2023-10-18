// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockERC20 is ERC20 {
    constructor(
        address initialAccount,
        uint256 initialBalance
    ) ERC20("MockToken", "MOCK") {
        _mint(initialAccount, initialBalance);
    }
}
