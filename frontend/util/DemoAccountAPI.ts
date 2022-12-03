import {BigNumber, BigNumberish, Signer, Wallet} from "ethers";
import {BaseApiParams, BaseAccountAPI} from "@account-abstraction/sdk/dist/src/BaseAccountAPI";
import {SimpleAccount} from "@account-abstraction/contracts";
import {arrayify} from "ethers/lib/utils";

export interface DemoAccountApiParams extends BaseApiParams {
  personaSigner: Signer;
  accountContract: SimpleAccount;
}

export class DemoAccountAPI extends BaseAccountAPI {
  // 何のペルソナから発行されたのか署名で判断する。
  personaSigner: Signer;

  // AA に接続するインスタンス
  accountContract: SimpleAccount;

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

const sampleRun = (password: string) => {
  // TODO: password から秘密鍵を作る
  const personaSigner = new Wallet("");
  const api = new DemoAccountAPI({
    accountContract: undefined, // TODO: AA ウォレットへのアクセス用インスタンスを作る
    personaSigner: personaSigner,
    entryPointAddress: "",
    provider: undefined, // TODO: infura とか
  });

  // Note: target と data は `call data` に埋め込まれる
  const op = api.createSignedUserOp({
    target: "", // TODO: 送り先のアドレス
    data: "", // TODO: 具体的な処理のデータ
  })

  // TODO: Bundler API に投げる
  // {"op": op} みたいな Request Body を Cloud Function の runOp に投げる
};