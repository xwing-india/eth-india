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
		height: "240px",
		transform: "translate(-50%, -50%)",
		borderRadius: "12px",
		border: "0px",
		padding: "0px",
	},
};

type Prop = {
	isConfirmModal: any;
	// closeConfirmModal: any;
	setRootPassword: any;
};

const ConfirmModal: FC<Prop> = ({
	isConfirmModal,
	// closeConfirmModal,
	setRootPassword,
}) => {
	const doChangePassword = (e: any) => {
		setRootPassword(e.target.value);
	};

	return (
		<Modal
			isOpen={isConfirmModal}
			// onRequestClose={closeConfirmModal}
			style={customStyles}
		>
			<div className="w-full h-full bg-gradient-to-r from-sky-400 via-blue-400 to-blue-500 p-1 rounded-lg">
				<div className="w-full h-full bg-white rounded-lg">
					<div className=" text-center text-black pt-4 font-bold text-xl">
						Create Persona
					</div>
					<div className="px-4 pt-8">
						<div
							onChange={doChangePassword}
							className="flex justify-between text-gray-700 pt-4 font-bold"
						>
							<div>password</div>
							<input className="bg-white border border-gray-700 rounded-md"></input>
						</div>
					</div>
					<div className="flex justify-center pt-8">
						<div
							onClick={() => {}}
							className="px-6 text-white cursor-pointer font-bold py-2 text-sm rounded-xl bg-gradient-to-r from-sky-400 via-blue-400 to-blue-500"
						>
							Create Persona
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default ConfirmModal;
