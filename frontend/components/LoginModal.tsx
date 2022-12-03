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
	isLoginModal: any;
	closeLoginModal: any;
};

const LoginModal: FC<Prop> = ({ isLoginModal, closeLoginModal }) => {
	const [address, setAddress] = useState("");
	const [password, setPassWord] = useState("");

	const doChangeAddress = (e: any) => {
		setAddress(e.target.value);
	};

	const doChangePassword = (e: any) => {
		setPassWord(e.target.value);
	};

	return (
		<Modal
			isOpen={isLoginModal}
			onRequestClose={closeLoginModal}
			style={customStyles}
		>
			<div className="w-full h-full bg-gradient-to-r from-sky-400 via-blue-400 to-blue-500 p-1 rounded-lg">
				<div className="w-full h-full bg-white rounded-lg">
					<div className=" text-center text-black pt-4 font-bold text-xl">
						Login
					</div>
					<div className="px-4 pt-8">
						<div className="flex justify-between text-gray-700 font-bold">
							<div>Address</div>
							<input
								onChange={doChangeAddress}
								className="bg-white border border-gray-700 rounded-md"
							></input>
						</div>
						<div className="flex justify-between text-gray-700 pt-4 font-bold">
							<div>Password</div>
							<input
								onChange={doChangePassword}
								className="bg-white border border-gray-700 rounded-md"
							></input>
						</div>
					</div>
					<div className="flex justify-center pt-8">
						<div
							onClick={() => {}}
							className="px-6 text-white cursor-pointer font-bold py-2 text-sm rounded-xl bg-gradient-to-r from-sky-400 via-blue-400 to-blue-500"
						>
							Login
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default LoginModal;
