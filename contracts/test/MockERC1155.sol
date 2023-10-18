// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC1155.sol";

contract MockERC721 is ERC1155 {
    constructor(
        address initialAccount,
        uint256 initialBalance
    ) ERC1155("MockToken", "MOCK") {
        _mint(initialAccount, initialBalance);
    }
}
