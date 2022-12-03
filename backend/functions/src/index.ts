import {Request, Response} from "firebase-functions";
import * as functions from "firebase-functions";

import {initializeApp} from "firebase-admin/app";
import {UserOperationStruct} from "@account-abstraction/contracts";
import Web3 from "web3";
import {
  BundlerWalletAddress,
  EntryPointABI,
  EntryPointContractAddress,
} from "./consts";

initializeApp();

export const hello = functions.https.onRequest((req: Request, resp: Response) => {
  resp.send(JSON.stringify({message: "Hello!"}));
});

// Ref: https://docs.infura.io/infura/tutorials/ethereum/call-a-contract
export const runOp = functions.https.onRequest(async (req: Request, resp: Response) => {
  // EntryPoint コントラクトを叩くためのクライアントを作る
  const web3 = newWeb3(req.body.network);

  const op: UserOperationStruct = req.body.op;
  console.log(op);

  // EntryPoint コントラクトの `handleOps` を叩く
  const txHash = await callHandleOps(web3, op);

  resp.send(JSON.stringify({
    "transaction_hash": txHash,
  }));
});

const newWeb3 = (network: string): Web3 => {
  const infuraApiKey = process.env.INFURA_API_KEY;
  return new Web3(new Web3.providers.HttpProvider(`https://${network}.infura.io/v3/${infuraApiKey}`));
};

const callHandleOps = async (web3: Web3, op: UserOperationStruct): Promise<string> => {
  const bundlerPrivateKey = process.env.BUNDLER_PRIVATE_KEY;
  if (bundlerPrivateKey === undefined) {
    throw new Error("BUNDLER_PRIVATE_KEY is not set");
  }

  const signer = web3.eth.accounts.privateKeyToAccount(bundlerPrivateKey);
  web3.eth.accounts.wallet.add(signer);

  const contract = new web3.eth.Contract(JSON.parse(EntryPointABI), EntryPointContractAddress);
  const tx = contract.methods.handleOps([op], BundlerWalletAddress);
  let txHash = "";
  await tx.send({
    from: signer.address,
    gas: await tx.estimateGas(),
  }).on("transactionHash", (hash: string) => {
    txHash = hash;
  });
  return txHash;
};
