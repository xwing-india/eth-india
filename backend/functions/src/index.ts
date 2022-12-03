import { Request, Response } from "firebase-functions";
import * as functions from "firebase-functions";

import { initializeApp } from "firebase-admin/app";
import { UserOperationStruct } from "@account-abstraction/contracts";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Web3 = require("web3");
import { ethers } from "ethers";
import { EntryPointABI } from "./consts";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require("cors")({ origin: true });

initializeApp();

export const hello = functions.https.onRequest(
  (req: Request, resp: Response) => {
    resp.send(
      JSON.stringify({
        message: `Hello! Bundler Address: ${process.env.BUNDLER_ADDRESS}`,
      })
    );
  }
);

// Ref: https://docs.infura.io/infura/tutorials/ethereum/call-a-contract
export const runOp = functions.https.onRequest(
  async (req: Request, resp: Response) => {
    cors(req, resp, async () => {
      // EntryPoint コントラクトを叩くためのクライアントを作る

      const infuraApiKey = process.env.INFURA_API_KEY;
      const provider = new ethers.providers.JsonRpcProvider(
        `https://${req.body.network}.infura.io/v3/${infuraApiKey}`
      );

      // const op: UserOperationStruct = req.body.op;
      // console.log(op);

      // EntryPoint コントラクトの `handleOps` を叩く
      const txHash = await callHandleOps(provider, req.body.op);

      resp.send(
        JSON.stringify({
          transaction_hash: txHash,
        })
      );
    });
  }
);

const newWeb3 = (network: string) => {
  const infuraApiKey = process.env.INFURA_API_KEY;
  return new Web3(
    new Web3.providers.HttpProvider(
      `https://${network}.infura.io/v3/${infuraApiKey}`
    )
  );
};

const callHandleOps = async (
  provider: ethers.providers.JsonRpcProvider,
  op: UserOperationStruct
): Promise<string> => {
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

  const wallet = new ethers.Wallet(bundlerPrivateKey, provider);

  const contract = new ethers.Contract(
    entryPointContractAddress,
    JSON.parse(EntryPointABI),
    wallet
  );
  console.log(contract);
  const tx = contract.handleOps([op], bundlerAddress);
  console.log(`tx: `, tx);

  return "0x123";
};
