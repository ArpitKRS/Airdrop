// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract MockERC1155 is ERC1155 {
    constructor() ERC1155("MockERC1155") {}

    function mintBatch(
        address to,
        uint256[] calldata tokenIds,
        uint256[] calldata amounts
    ) public {
        require(
            tokenIds.length == amounts.length,
            "Token IDs and amounts length mismatch"
        );
        for (uint256 i = 0; i < tokenIds.length; i++) {
            _mint(to, tokenIds[i], amounts[i], "");
        }
    }
}
