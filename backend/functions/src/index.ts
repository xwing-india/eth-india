import {Request, Response} from "firebase-functions";
import * as functions from "firebase-functions";

import {initializeApp} from "firebase-admin/app";

initializeApp();

// eslint-disable-next-line max-len
export const helloWorld = functions.https.onRequest((_: Request, response: Response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
