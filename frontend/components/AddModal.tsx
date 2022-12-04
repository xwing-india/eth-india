import { FC, useState } from "react";
import Modal from "react-modal";
import Button from "./atom/Button";

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
	isAddModal: any;
	closeAddModal: any;
	whiteList: string[];
	setWhiteList: any;
	displayWhiteList: any;
	setDisplayWhiteList: any;
};

const AddModal: FC<Prop> = ({
	isAddModal,
	closeAddModal,
	whiteList,
	setWhiteList,
	displayWhiteList,
	setDisplayWhiteList,
}) => {
	const [contractAddress, setContractAddress] = useState("");
	const [name, setName] = useState("");

	const doChangeContractAddress = (e: any) => {
		setContractAddress(e.target.value);
	};

	const doChangeName = (e: any) => {
		setName(e.target.value);
	};

	const addContract = () => {
		const tmpWhiteList = whiteList;
		const tmpDisplayWhiteList = displayWhiteList;
		const tmpGroup = {
			name: name,
			address: contractAddress,
		};
		tmpWhiteList.push(contractAddress);
		tmpDisplayWhiteList.push(tmpGroup);
		setWhiteList(tmpWhiteList);

		closeAddModal();
	};

	return (
		<Modal
			isOpen={isAddModal}
			onRequestClose={closeAddModal}
			style={customStyles}
		>
			<div className="w-full h-full bg-gradient-to-r from-sky-400 via-blue-400 to-blue-500 p-1 rounded-lg">
				<div className="w-full h-full bg-white rounded-lg">
					<div className=" text-center text-gray-700 pt-4 font-bold text-xl">
						Add Contract
					</div>
					<div className="px-4 pt-8">
						<div className="flex justify-between text-gray-700">
							<div className="font-bold">Contract Address</div>
							<input
								onChange={doChangeContractAddress}
								className="pl-2 bg-white border border-gray-700 rounded-md"
							></input>
						</div>
						<div
							onChange={doChangeName}
							className="flex justify-between text-gray-700 pt-4"
						>
							<div className="font-bold">Name</div>
							<input className="pl-2 bg-white border border-gray-700 rounded-md"></input>
						</div>
					</div>
					<div className="flex justify-center pt-8">
						<Button title="Add" doClick={addContract} />
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default AddModal;
