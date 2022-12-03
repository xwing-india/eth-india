import {Request, Response} from "firebase-functions";
import * as functions from "firebase-functions";

import {initializeApp} from "firebase-admin/app";
// eslint-disable-next-line camelcase
import {EntryPoint__factory, UserOperationStruct} from "@account-abstraction/contracts";
// eslint-disable-next-line @typescript-eslint/no-var-requires
import {ethers} from "ethers";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require("cors")({origin: true});

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

        console.log(req.body.op);

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

  const wallet = new ethers.Wallet(bundlerPrivateKey, provider);

  // eslint-disable-next-line camelcase
  const contract = EntryPoint__factory.connect(entryPointContractAddress, wallet);
  const tx = await contract.handleOps([op], wallet.address);
  return tx.hash;
};
