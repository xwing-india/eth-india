import {Request, Response} from "firebase-functions";
import * as functions from "firebase-functions";

import {initializeApp} from "firebase-admin/app";

initializeApp();

// eslint-disable-next-line max-len
export const runOp = functions.https.onRequest((req: Request, resp: Response) => {
  console.log(req.body);
  // EntryPoint コントラクトを叩くためのクライアントを作る

  // Request Body に存在する UserOperation を詰める

  // EntryPoint コントラクトの `handleOps` を叩く
  resp.send("{\"status\":\"success\"}");
});
