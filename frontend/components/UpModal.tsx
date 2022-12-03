import { FC, useState } from "react";
import Modal from "react-modal";

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
		height: "280px",
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
	const addPersona = () => {
		//TODO バンドラーに送る操作
	};
	return (
		<Modal
			isOpen={isUpModal}
			// onRequestClose={closeUpModal}
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
							<div>Password</div>
							<div>{addInfo?.password}</div>
						</div>
						<div className="flex justify-between text-gray-700 pt-4 font-bold">
							<div>Spending Limit</div>
							<div>{addInfo?.spendLimit} ETH</div>
						</div>
					</div>
					<div className="flex justify-center pt-8">
						<div
							onClick={closeUpModal}
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
