// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/utils/Create2.sol";
import "./OAuthAccount.sol";

contract OAuthAccountDeployer {
    function deployAccount(
        IEntryPoint entryPoint,
        address owner,
        uint salt
    ) public returns (OAuthAccount ret) {
        address addr = getAddress(entryPoint, owner, salt);
        uint codeSize = addr.code.length;
        if (codeSize > 0) {
            return OAuthAccount(payable(addr));
        }
        ret = new OAuthAccount{salt: bytes32(salt)}(entryPoint, owner);
    }

    /**
     * calculate the counterfactual address of this account as it would be returned by deployAccount()
     */
    function getAddress(
        IEntryPoint entryPoint,
        address owner,
        uint salt
    ) public view returns (address) {
        return
            Create2.computeAddress(
                bytes32(salt),
                keccak256(
                    abi.encodePacked(
                        type(OAuthAccount).creationCode,
                        abi.encode(entryPoint, owner)
                    )
                )
            );
    }
}
