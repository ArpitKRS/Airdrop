// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

contract AirDrop {
    constructor() {}

    function bulkAirDropERC20(
        IERC20 _token,
        address[] calldata _to,
        uint256[] calldata _value
    ) public {
        require(
            _to.length == _value.length,
            "Receiver and amounts are of different lengths"
        );
        for (uint256 i = 0; i < _to.length; i++) {
            require(_token.transferFrom(msg.sender, _to[i], _value[i]));
        }
    }

    function bulkAirDropERC721(
        IERC721 _token,
        address[] calldata _to,
        uint256[] calldata _id
    ) public {
        require(
            _to.length == _id.length,
            "Receiver and amounts are of different lengths"
        );
        for (uint256 i = 0; i < _to.length; i++) {
            _token.transferFrom(msg.sender, _to[i], _id[i]);
        }
    }

    function bulkAirDropERC1155(
        IERC1155 _token,
        address[] calldata _to,
        uint256[] calldata _id,
        uint256[] calldata _amount
    ) public /* bytes calldata data */
    {
        require(
            _to.length == _id.length,
            "Receiver and amounts are of different lengths"
        );
        for (uint256 i = 0; i < _to.length; i++) {
            _token.safeTransferFrom(msg.sender, _to[i], _id[i], _amount[i], "");
        }
    }
}
