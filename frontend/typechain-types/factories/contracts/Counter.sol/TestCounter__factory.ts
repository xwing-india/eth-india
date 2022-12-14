/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  TestCounter,
  TestCounterInterface,
} from "../../../contracts/Counter.sol/TestCounter";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "CalledFrom",
    type: "event",
  },
  {
    inputs: [],
    name: "count",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "counters",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "repeat",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "gasWaster",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "justemit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "offset",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "xxx",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061055e806100206000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c806306661abd14610067578063278ddd3c14610071578063a1b468901461007b578063a5e9585f14610097578063be65ab8c146100c7578063d5556544146100f7575b600080fd5b61006f610115565b005b6100796101a4565b005b61009560048036038101906100909190610311565b6101dd565b005b6100b160048036038101906100ac9190610371565b610236565b6040516100be91906103ad565b60405180910390f35b6100e160048036038101906100dc9190610426565b61024e565b6040516100ee91906103ad565b60405180910390f35b6100ff610266565b60405161010c91906103ad565b60405180910390f35b60016000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546101609190610482565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550565b7ffb3b4d6258432a9a3d78dd9bffbcb6cfb1bd94f58da35fd530d08da7d1d05832336040516101d391906104c5565b60405180910390a1565b6000600190505b83811161023057600260008154809291906101fe906104e0565b919050555080600160006002548152602001908152602001600020819055508080610228906104e0565b9150506101e4565b50505050565b60016020528060005260406000206000915090505481565b60006020528060005260406000206000915090505481565b60025481565b600080fd5b600080fd5b6000819050919050565b61028981610276565b811461029457600080fd5b50565b6000813590506102a681610280565b92915050565b600080fd5b600080fd5b600080fd5b60008083601f8401126102d1576102d06102ac565b5b8235905067ffffffffffffffff8111156102ee576102ed6102b1565b5b60208301915083600182028301111561030a576103096102b6565b5b9250929050565b60008060006040848603121561032a5761032961026c565b5b600061033886828701610297565b935050602084013567ffffffffffffffff81111561035957610358610271565b5b610365868287016102bb565b92509250509250925092565b6000602082840312156103875761038661026c565b5b600061039584828501610297565b91505092915050565b6103a781610276565b82525050565b60006020820190506103c2600083018461039e565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006103f3826103c8565b9050919050565b610403816103e8565b811461040e57600080fd5b50565b600081359050610420816103fa565b92915050565b60006020828403121561043c5761043b61026c565b5b600061044a84828501610411565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061048d82610276565b915061049883610276565b92508282019050808211156104b0576104af610453565b5b92915050565b6104bf816103e8565b82525050565b60006020820190506104da60008301846104b6565b92915050565b60006104eb82610276565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361051d5761051c610453565b5b60018201905091905056fea2646970667358221220623593620ec6cd84a04c794e94bd96d38a14925420402d65b14466d1e14cea4c64736f6c63430008110033";

type TestCounterConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestCounterConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestCounter__factory extends ContractFactory {
  constructor(...args: TestCounterConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TestCounter> {
    return super.deploy(overrides || {}) as Promise<TestCounter>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): TestCounter {
    return super.attach(address) as TestCounter;
  }
  override connect(signer: Signer): TestCounter__factory {
    return super.connect(signer) as TestCounter__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestCounterInterface {
    return new utils.Interface(_abi) as TestCounterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestCounter {
    return new Contract(address, _abi, signerOrProvider) as TestCounter;
  }
}
