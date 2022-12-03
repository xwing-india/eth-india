// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;
import "hardhat/console.sol";

contract TestParse {
    function parse(
        bytes memory data
    ) public view returns (bytes4 funcHash, address target, uint256 value) {
        assembly {
            funcHash := mload(add(data, 32))
            target := mload(add(data, 36))
            value := mload(add(data, 68))
        }
    }
}
