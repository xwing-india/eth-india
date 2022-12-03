import {Request, Response} from "firebase-functions";
import * as functions from "firebase-functions";

import {initializeApp} from "firebase-admin/app";
import {UserOperationStruct} from "@account-abstraction/contracts";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Web3 = require("web3");
import {EntryPointABI} from "./consts";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require("cors")({origin: true});

initializeApp();

export const hello = functions.https.onRequest((req: Request, resp: Response) => {
  resp.send(JSON.stringify({message: `Hello! Bundler Address: ${process.env.BUNDLER_ADDRESS}`}));
});

// Ref: https://docs.infura.io/infura/tutorials/ethereum/call-a-contract
export const runOp = functions.https.onRequest(async (req: Request, resp: Response) => {
  cors(req, resp, async () => {
    // EntryPoint コントラクトを叩くためのクライアントを作る
    const web3 = newWeb3(req.body.network);

    const op: UserOperationStruct = {
      "sender": "0xfB2274F8f528460D71b4aEce5d5E8370fAF3C0b3",
      "nonce": {
        "type": "BigNumber",
        "hex": "0x00"
      },
      "initCode": "0x",
      "callData": "0x80c5c7d0000000000000000000000000fb2274f8f528460d71b4aece5d5e8370faf3c0b30000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000e44ba9120f000000000000000000000000c08b5542d177ac6686946920409741463a15dddb000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000006f9641dd4b6cf822d4cf52cee753a8910b034827000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      "callGasLimit": {
        "type": "BigNumber",
        "hex": "0x02f2ad"
      },
      "verificationGasLimit": {
        "type": "BigNumber",
        "hex": "0x0186a0"
      },
      "maxFeePerGas": {
        "type": "BigNumber",
        "hex": "0x59682f14"
      },
      "maxPriorityFeePerGas": {
        "type": "BigNumber",
        "hex": "0x59682f00"
      },
      "paymasterAndData": "0x6eACccd2f9B4C91C007bdEE204909669Feb6a8BB",
      "preVerificationGas": 52108,
      "signature": "0x49269b557b2a46d90bbd677f83e81363743b2f363a0b18796ffd5eb58b343fa31ed7b7aa93692320244fb07f7bd489be86285cdf06f4818aa85c163738fe5bec1b"
    };
    // const op: UserOperationStruct = req.body.op;
    // console.log(op);

    // EntryPoint コントラクトの `handleOps` を叩く
    const txHash = await callHandleOps(web3, op);

    resp.send(JSON.stringify({
      "transaction_hash": txHash,
    }));
  });
});

const newWeb3 = (network: string) => {
  const infuraApiKey = process.env.INFURA_API_KEY;
  return new Web3(new Web3.providers.HttpProvider(`https://${network}.infura.io/v3/${infuraApiKey}`));
};

const callHandleOps = async (web3: any, op: UserOperationStruct): Promise<string> => {
  const bundlerPrivateKey = process.env.BUNDLER_PRIVATE_KEY;
  if (bundlerPrivateKey === undefined) {
    throw new Error("BUNDLER_PRIVATE_KEY is not set");
  }
  const entryPointContractAddress = process.env.ENTRY_POINT_ADDRESS;
  if (entryPointContractAddress === undefined) {
    throw new Error("ENTRY_POINT_ADDRESS is not set");
  }
  const bundlerAddress = process.env.BUNDLER_ADDRESS;
  if (bundlerAddress === undefined) {
    throw new Error("BUNDLER_ADDRESS is not set");
  }

  const signer = web3.eth.accounts.privateKeyToAccount(bundlerPrivateKey);
  console.log(`signer: ${signer}`);

  web3.eth.accounts.wallet.add(signer);

  const contract = new web3.eth.Contract(JSON.parse(EntryPointABI), entryPointContractAddress);
  console.log(contract);
  const tx = contract.methods.handleOps([op], bundlerAddress);
  console.log(`tx: ${tx}`);
  // let txHash = "";
  await tx.send({
    from: signer.address,
    gas: await tx.estimateGas(),
  });
  return "0x123";
};
