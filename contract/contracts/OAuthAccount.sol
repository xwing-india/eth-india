// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

import "@account-abstraction/contracts/core/BaseAccount.sol";
import "@account-abstraction/contracts/core/EntryPoint.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "hardhat/console.sol";

contract OAuthAccount is BaseAccount {
    using EnumerableSet for EnumerableSet.AddressSet;
    using ECDSA for bytes32;

    event PersonaCreated(
        address indexed persona,
        address indexed creator,
        uint256 mode
    );
    event Approval(address indexed spender);

    struct Persona {
        address creator;
        EnumerableSet.AddressSet allowTargets;
        EnumerableSet.AddressSet denyTargets;
        uint112 balance;
        uint112 mode; // 0x1:personal, 0x10:sharing,
    }

    struct PersonaData {
        address creator;
        address[] allowTargets;
        address[] denyTargets;
        uint112 balance;
        uint112 mode;
    }

    IEntryPoint private _entryPoint;
    address public owner;
    uint96 private _nonce;
    uint112 public sharingBalance;

    mapping(address => Persona) private personas;
    address[] personaAddresses;

    mapping(address => bool) private _approved;

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

    function transfer(address payable target, uint256 amount) external {
        _validatePersonaPermission(msg.sender, target, amount);
        target.transfer(amount);
    }

    function exec(address target, uint256 value, bytes calldata func) external {
        _validatePersonaPermission(msg.sender, target, value);
        _call(target, value, func);
    }

    function approve(address spender) external {
        _approved[spender] = true;
        emit Approval(spender);
    }

    function createPersona(
        address signer,
        address[] calldata allow,
        address[] calldata deny,
        uint112 balance
    ) external {
        require(msg.sender == owner, "account: only owner can create persona");
        _createPersona(PersonaData(signer, allow, deny, balance, 0x1));
    }

    function createSharingPersona(
        address signer,
        address[] calldata allow,
        address[] calldata deny
    ) external payable {
        require(
            _approved[msg.sender],
            "account: only owner can create persona"
        );
        _approved[msg.sender] = false;
        sharingBalance += uint112(msg.value);
        _createPersona(
            PersonaData(signer, allow, deny, uint112(msg.value), 0x10)
        );
    }

    function _createPersona(PersonaData memory data) private {
        Persona storage persona = personas[data.creator];
        persona.creator = data.creator;
        persona.mode = data.mode;
        for (uint256 i = 0; i < data.allowTargets.length; i++) {
            persona.allowTargets.add(data.allowTargets[i]);
        }
        for (uint256 i = 0; i < data.denyTargets.length; i++) {
            persona.denyTargets.add(data.denyTargets[i]);
        }
        persona.balance = data.balance;
        personaAddresses.push(data.creator);
        emit PersonaCreated(data.creator, data.creator, persona.mode);
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
            funcHash := mload(add(data, 32))
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

    function _validatePersonaPermission(
        address personaAddress,
        address target,
        uint256 value
    ) internal virtual {
        Persona storage persona = personas[personaAddress];

        bool isAllow = persona.allowTargets.contains(target) ||
            persona.allowTargets.length() == 0; // Empty allowTargets is All Allow
        bool isDeny = persona.denyTargets.contains(target) ||
            persona.denyTargets.length() == 0; // Empty denyTargets is All Deny

        require(
            (isAllow && !isDeny) ||
                (isAllow && persona.denyTargets.length() == 0) ||
                tx.origin == address(0),
            "account: wrong signature"
        );

        uint256 myBalance = address(this).balance;

        require(persona.mode != 0, "account: not a persona");
        require(
            myBalance > value &&
                (persona.mode == 0x10 || myBalance - value >= sharingBalance),
            "account: personal balance is not enougth"
        );
        require(
            persona.balance >= value && myBalance >= value,
            "account: persona balance is not enougth"
        );
        persona.balance -= uint112(value);

        if (persona.mode == 0x10) {
            sharingBalance -= uint112(value);
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
        //Todo Require check funcHash

        //TODO: check validate
        bytes32 hash = userOpHash.toEthSignedMessageHash();
        address recoverd = hash.recover(userOp.signature);
        (bytes4 funcHash, address target, uint256 value) = parseCalldata(
            userOp.callData
        );

        require(funcHash == 0x80c5c7d0, "account: invalid funcHash");

        _validatePersonaPermission(recoverd, target, value);

        return 0;
    }

    function _updateEntryPoint(address newEntryPoint) internal override {
        emit EntryPointChanged(address(_entryPoint), newEntryPoint);
        _entryPoint = IEntryPoint(payable(newEntryPoint));
    }

    function totalPersona() external view returns (uint256) {
        return personaAddresses.length;
    }

    function getPersona(
        address personaAddress
    ) external view returns (PersonaData memory) {
        Persona storage persona = personas[personaAddress];
        return
            PersonaData(
                persona.creator,
                persona.allowTargets.values(),
                persona.denyTargets.values(),
                persona.balance,
                persona.mode
            );
    }

    function getPersonaByIndex(
        uint256 index
    ) external view returns (address, PersonaData memory) {
        address personaAddress = personaAddresses[index];
        Persona storage persona = personas[personaAddress];

        return (
            personaAddress,
            PersonaData(
                personaAddress,
                persona.allowTargets.values(),
                persona.denyTargets.values(),
                persona.balance,
                persona.mode
            )
        );
    }
}
