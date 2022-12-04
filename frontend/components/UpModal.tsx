import { FC, useState } from "react";
import Modal from "react-modal";
import {OAuthAccount, OAuthAccount__factory} from "../typechain-types";
import {OAuthContractAddress} from "../util/consts";
import {sendToBundler} from "../util/DemoAccountAPI";
import {ethers} from "ethers";
import InputText from "./atom/InputText";

const customStyles: ReactModal.Styles = {
	overlay: {
		position: "fixed",
		top: 0,
		left: 0,
		backgroundColor: "rgba(0,0,0,0.3)",
	},

	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		width: "400px",
		height: "320px",
		transform: "translate(-50%, -50%)",
		borderRadius: "12px",
		border: "0px",
		padding: "0px",
	},
};

type Prop = {
	isUpModal: any;
	closeUpModal: any;
	addInfo: {
		name: string;
		password: string;
		spendLimit: string;
	};
};

const UpModal: FC<Prop> = ({ isUpModal, closeUpModal, addInfo }) => {
	const [rootPassword, setRootPassword] = useState<string>();

	const doChangeRootPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRootPassword(e.target.value);
	};

	const addSharingPersona = async () => {
		console.log(addInfo);
		// const approveData = OAuthAccount__factory.createInterface().encodeFunctionData(
		// 	"approve",
		// 	[OAuthContractAddress]
		// );
		// await sendToBundler(
		// 	"goerli",
		// 	rootPassword || "",
		// 	OAuthContractAddress,
		// 	OAuthContractAddress,
		// 	0,
		// 	approveData
		// );

		const wallet = new ethers.Wallet(ethers.utils.id(String(addInfo.password)));
		const createData = OAuthAccount__factory.createInterface().encodeFunctionData(
			"createSharingPersona",
			[wallet.address, [], []]
		)
		console.log(rootPassword);
		const txHash = await sendToBundler(
			"goerli",
			rootPassword || "",
			OAuthContractAddress,
			OAuthContractAddress,
			addInfo.spendLimit,
			createData
		);

		console.log(`https://goerli.etherscan.io/tx/${txHash}`);
	};
	return (
		<Modal
			isOpen={isUpModal}
			onRequestClose={closeUpModal}
			style={customStyles}
		>
			<div className="w-full h-full bg-gradient-to-r from-sky-400 via-blue-400 to-blue-500 p-1 rounded-lg">
				<div className="w-full h-full bg-white rounded-lg">
					<div className=" text-center text-black pt-4 font-bold text-xl">
						Add DAO Persona
					</div>
					<div className="px-4 pt-8">
						<div className="flex justify-between text-gray-700 font-bold">
							<div>name</div>
							<div>{addInfo?.name}</div>
						</div>
						<div className="flex justify-between text-gray-700 pt-4 font-bold">
							<div>Persona Password</div>
							<div>{addInfo?.password}</div>
						</div>
						<div className="flex justify-between text-gray-700 pt-4 font-bold">
							<div>Spending Limit</div>
							<div>{addInfo?.spendLimit} Gwei</div>
						</div>
						<div
							onChange={doChangeRootPassword}
							className="flex justify-between text-gray-700 pt-4"
						>
							<div className="font-bold">Root Password</div>
							<input className="pl-2 bg-white border border-gray-700 rounded-md"></input>
						</div>
					</div>
					<div className="flex justify-center pt-8">
						<div
							onClick={addSharingPersona}
							className="px-6 text-white cursor-pointer font-bold py-2 text-sm rounded-lg bg-gradient-to-r from-sky-400 via-blue-400 to-blue-500"
						>
							Add Persona
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default UpModal;
