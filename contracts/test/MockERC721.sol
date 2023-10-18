// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MockERC721 is ERC721 {
    constructor(
        address initialAccount,
        uint256 initialBalance
    ) ERC721("MockToken", "MOCK") {
        _mint(initialAccount, initialBalance);
    }
}
