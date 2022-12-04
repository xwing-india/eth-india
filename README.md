# Firewallet

![0c64eaaa-6298-4972-90fd-05998442555e](https://user-images.githubusercontent.com/51313744/205475854-2b212011-db0d-4808-b719-80529c425f78.png)

## problem
Currently, if the private key of an EOA is stolen, all the assets in that wallet will be stolen.
So users create multiple EOA addresses to spread the risk. But in that case, things like SBT will also be distributed, and the information of that person's transactions will not be accumulated in one account.

## what we built
We have implemented a brand new contract wallet that follows the EIP4337 standard.
Users can create multiple roles (for private, for trading, for DAO pj, etc) by purpose.
Users can place the following restrictions on roles
- The total eth amount that can transfer
- The contract that can call
-etc
The user executes the transaction using the specific role that suits for the tx

## how it solved
By creating roles in this way, and using roles instead of owner keys for everyday use, even if a role's password is stolen, the damage is limited to the scope of that role.
 In addition, the information associated with the person, such as SBT, ENS, etc., will be linked to single address

## Deployed contracts

### Goerli

| Name          | Address                                    |
| ------------- | ------------------------------------------ |
| EntryPoint    | 0x100A8BFc27614d2E50b374dD6d8EF8357E295C6B |
| OAuthDeployer | 0xAaBd1279b524e6F7c0eA5d2F04d5EcF60a10aF9a |
| Paymaster     | 0x6eACccd2f9B4C91C007bdEE204909669Feb6a8BB |

### Mumbai

| Name          | Address                                    |
| ------------- | ------------------------------------------ |
| EntryPoint    | 0xA1d8B8BcBbEB8bF7389d3f55F9528EB4951DfF3f |
| OAuthDeployer | 0x30791bA4687DE7F2d27d3d4578e2e069808BccEe |
| Paymaster     | 0xCAE4d008339842BA3c977D5ae2f63510F3Cb7e5D |

### Cronos Testnet

| Name          | Address                                    |
| ------------- | ------------------------------------------ |
| EntryPoint    | 0x7C23128C4cD82e6ebd399a7c10d0DC358582155b |
| OAuthDeployer | 0x6cBE2e61BAfD1E95C57d342Ab2694A61C1345f96 |
| Paymaster     | 0x10A102716B73b539f1574C47200c0dc5A0Ec62e9 |

### Gnosis Chain Testnet

| Name          | Address                                    |
| ------------- | ------------------------------------------ |
| EntryPoint    | 0xab0e55123087E8139822f3163392bf9b719F31C6 |
| OAuthDeployer | 0x7C23128C4cD82e6ebd399a7c10d0DC358582155b |
| Paymaster     | 0x6cBE2e61BAfD1E95C57d342Ab2694A61C1345f96 |


## integrated sponsors

### Polygon
the contract addresses are above.
- A tool for DAO asset management was implemented on Polygon.
- Until now, the DAOs have simply transferred money in batches to project leaders and others in projects where budget decisions have been made. There was a problem with transparency due to the possibility of confusion with personal assets, the possibility of being hacked, and not knowing which transactions were related to the project. We created a wallet that allowed DAOs to specify which contracts they could use to transfer money to the budget executor, keeping it separate from the rest of the budget.
- Contributors have peace of mind and identity by SBT.

