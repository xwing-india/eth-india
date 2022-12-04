import Image from "next/image";
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
		height: "330px",
		transform: "translate(-50%, -50%)",
		borderRadius: "12px",
		border: "0px",
		padding: "0px",
	},
};

type Prop = {
	isChainModal: any;
	closeChainModal: any;
	setChainId: any;
};

const chain = [
	{
		name: "Ethereum",
		url: "ethereum.png",
	},
	{
		name: "Polygon",
		url: "polygon.png",
	},
	{
		name: "Cronos",
		url: "cronos.png",
	},
	{
		name: "Gnosis",
		url: "gnosis.png",
	},
];

const ChainModal: FC<Prop> = ({
	isChainModal,
	closeChainModal,
	setChainId,
}) => {
	return (
		<Modal
			isOpen={isChainModal}
			onRequestClose={closeChainModal}
			style={customStyles}
		>
			<div className="w-full h-full bg-gradient-to-r from-sky-400 via-blue-400 to-blue-500 p-1 rounded-lg">
				<div className="w-full h-full bg-white rounded-lg">
					<div className=" text-center text-gray-700 pt-4 font-bold text-xl">
						Select Chain
					</div>
					<div className="pl-2">
						{chain &&
							chain.map((item, index) => {
								return (
									<div className="px-4 pt-8" key={item.name}>
										<div
											onChange={() => {}}
											className="flex justify-start items-center"
										>
											<Image
												src={"/logo/" + item.url}
												width={30}
												height={30}
												alt=""
											/>
											<div className="font-bold text-lg text-gray-700 pl-2">
												{item.name}
											</div>
										</div>
									</div>
								);
							})}
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default ChainModal;
