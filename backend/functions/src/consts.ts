export const AccountFactoryContractAddress = "0x71dB99931ECd9c41A0A3eb004100F157697443Ee";
export const BundlerWalletAddress = "0x5Ab1eA0a966aA678845Fa70a7BC890127B7Dc55A";
export const EntryPointContractAddress = "0xb59fe658170fA89736cC8414D1a354ca21054A4A";

export const EntryPointABI = `[{
"inputs": [
  {
    "components": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "nonce",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "initCode",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "callData",
        "type": "bytes"
      },
      {
        "internalType": "uint256",
        "name": "callGas",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "verificationGas",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "preVerificationGas",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "maxFeePerGas",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "maxPriorityFeePerGas",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "paymaster",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "paymasterData",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "signature",
        "type": "bytes"
      }
    ],
    "internalType": "struct UserOperation[]",
    "name": "ops",
    "type": "tuple[]"
  },
  {
    "internalType": "address payable",
    "name": "beneficiary",
    "type": "address"
  }
],
"name": "handleOps",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
}]`;
