import { FC } from "react";
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
		height: "300px",
		transform: "translate(-50%, -50%)",
		borderRadius: "12px",
	},
};

type Prop = {
	isLoginModal: any;
	closeLoginModal: any;
};

const LoginModal: FC<Prop> = ({ isLoginModal, closeLoginModal }) => {
	return (
		<Modal
			isOpen={isLoginModal}
			onRequestClose={closeLoginModal}
			style={customStyles}
		>
			<div>Login</div>
			<div className="flex justify-between">
				<div>Address</div>
				<input></input>
			</div>
			<div className="flex justify-between">
				<div>Password</div>
				<input></input>
			</div>
		</Modal>
	);
};

export default LoginModal;
