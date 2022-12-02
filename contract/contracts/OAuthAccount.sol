// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;
import "@account-abstraction/contracts/core/BaseAccount.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract OAuthAccount is BaseAccount {
    using EnumerableSet for EnumerableSet.AddressSet;
    using ECDSA for bytes32;

    struct Persona {
        EnumerableSet.AddressSet allowTargets;
        EnumerableSet.AddressSet denyTarges;
        uint256 balance;
        bytes32 mode; // 0x1:personal, 0x10:sharing,
    }

    uint96 private _nonce;
    IEntryPoint private _entryPoint;
    address public owner;
    mapping(address => Persona) private personas;

    function nonce() public view virtual override returns (uint256) {
        return _nonce;
    }

    function entryPoint() public view virtual override returns (IEntryPoint) {
        return _entryPoint;
    }

    event EntryPointChanged(
        address indexed oldEntryPoint,
        address indexed newEntryPoint
    );

    receive() external payable {}

    constructor(IEntryPoint entryPoint_, address owner_) {
        _entryPoint = entryPoint_;
        owner = owner_;
    }
}
