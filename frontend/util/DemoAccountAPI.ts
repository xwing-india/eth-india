import {BigNumber, BigNumberish, ethers, Signer, Wallet} from "ethers";
import {BaseApiParams, BaseAccountAPI} from "@account-abstraction/sdk/dist/src/BaseAccountAPI";
import {arrayify} from "ethers/lib/utils";
import {OAuthAccount, OAuthAccount__factory} from "../typechain-types";

export interface DemoAccountApiParams extends BaseApiParams {
  personaSigner: Signer;
  accountContract: OAuthAccount;
}

export class DemoAccountAPI extends BaseAccountAPI {
  // 何のペルソナから発行されたのか署名で判断する。
  personaSigner: Signer;

  // AA に接続するインスタンス
  accountContract: OAuthAccount;

  constructor(params: DemoAccountApiParams) {
    super(params);
    this.personaSigner = params.personaSigner;
    this.accountContract = params.accountContract;
  }

  getAccountInitCode(): Promise<string> {
    // Note: デモでは絶対 Deploy されているので何もしない。
    return Promise.resolve("");
  }

  getNonce(): Promise<BigNumber> {
    return this.accountContract.nonce();
  }

  // callData を具体的に組み立てる
  encodeExecute(target: string, value: BigNumberish, data: string): Promise<string> {
    return Promise.resolve(this.accountContract.interface.encodeFunctionData(
      'execFromEntryPoint',
      [
        target,
        value,
        data
      ]));
  }

  signUserOpHash(userOpHash: string): Promise<string> {
    return this.personaSigner.signMessage(arrayify(userOpHash))
  }
}

export const sendToBundler = async (network: string, personaPassword: string, from: string, to: string, value: number, data: string) => {
  // password から秘密鍵を作る
  const infuraApiKey = process.env.INFURA_API_KEY;
  const providerHost = `https://${network}.infura.io/v3/${infuraApiKey}`
  const personaAccount = new ethers.Wallet(ethers.utils.id(personaPassword));
  const oauthAccountAddress = process.env.OAUTH_ACCOUNT_ADDRESS;
  if (oauthAccountAddress === undefined) {
    throw new Error("OAUTH_ACCOUNT_ADDRESS is not set");
  }

  // UserOperation の組み立て
  const api = new DemoAccountAPI({
    accountContract: OAuthAccount__factory.connect(oauthAccountAddress, ethers.getDefaultProvider(providerHost)),
    personaSigner: new Wallet(personaAccount.privateKey),
    entryPointAddress: "",
    provider: ethers.getDefaultProvider(providerHost),
  })

  const op = api.createSignedUserOp({
    target: to, // 送り先のアドレス
    data: data, // 具体的な処理のデータ
  });

  // Bundler API を叩く
  const bundlerEndpoint = process.env.BUNDLER_ENDPOINT;
  if (bundlerEndpoint === undefined) {
    throw new Error("BUNDLER_ENDPOINT is not set");
  }
  await fetch(bundlerEndpoint, {
    method: "POST",
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      "network": network,
      "op": op,
    }),
  })
};
