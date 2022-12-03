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
        uint256 mode; // 0x1:personal, 0x10:sharing,
    }

    uint96 private _nonce;
    IEntryPoint private _entryPoint;
    address public owner;
    uint256 public sharingBalance;

    mapping(address => Persona) private personas;
    address[] personaAddresses;

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

    function execFromEntryPoint(
        address target,
        uint256 value,
        bytes calldata func
    ) external {
        _requireFromEntryPoint();
        _call(target, value, func);
    }

    function parseCalldata(
        bytes memory data
    ) public pure returns (bytes4 funcHash, address target, uint256 value) {
        assembly {
            funcHash := mload(add(data, 4))
            target := mload(add(data, 36))
            value := mload(add(data, 68))
        }
    }

    function _call(address target, uint256 value, bytes memory data) internal {
        (bool success, bytes memory result) = target.call{value: value}(data);
        if (!success) {
            assembly {
                revert(add(result, 32), mload(result))
            }
        }
    }

    function _validateAndUpdateNonce(
        UserOperation calldata userOp
    ) internal override {
        require(_nonce++ == userOp.nonce, "account: invalid nonce");
    }

    function _validateSignature(
        UserOperation calldata userOp,
        bytes32 userOpHash,
        address
    ) internal virtual override returns (uint256 deadline) {
        require(tx.origin == address(0), "account: tx origin is not zero");

        (, address target, uint256 value) = parseCalldata(userOp.callData);
        //Todo Require check funcHash

        //TODO: check validate
        bytes32 hash = userOpHash.toEthSignedMessageHash();
        address recoverd = hash.recover(userOp.signature);
        Persona storage persona = personas[recoverd];

        bool isAllow = persona.allowTargets.contains(target) ||
            persona.allowTargets.length() == 0; // Empty allowTargets is All Allow
        bool isDeny = persona.denyTarges.contains(target) ||
            persona.denyTarges.length() == 0; // Empty denyTarges is All Deny
        require(
            (isAllow && !isDeny) ||
                (isAllow && persona.denyTarges.length() == 0) ||
                (!isDeny && persona.allowTargets.length() == 0),
            "account: wrong signature"
        );

        uint256 myBalance = address(this).balance;

        require(
            persona.mode == 0x1 && myBalance - value > sharingBalance,
            "account: personal balance is not enougth"
        );
        require(
            value > persona.balance,
            "account: persona balance is not enougth"
        );
        persona.balance -= value;

        return 0;
    }

    function _updateEntryPoint(address newEntryPoint) internal override {
        emit EntryPointChanged(address(_entryPoint), newEntryPoint);
        _entryPoint = IEntryPoint(payable(newEntryPoint));
    }
}
