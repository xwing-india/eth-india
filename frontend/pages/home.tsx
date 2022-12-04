import Header from "../components/atom/Header";
import LeftMenuBlock from "../components/molecules/LeftMenuBlock";
import Persona from "../components/organisms/Persona";
import { useEffect, useState } from "react";
import LoginModal from "../components/LoginModal";
import { useRouter } from "next/router";
import UpModal from "../components/UpModal";
import Footer from "../components/atom/Footer";
import { Etherspot } from "@etherspot/react-transaction-buidler";
import { ethers } from "ethers";
import { InfuraAPIKey } from "../util/consts";
import Modal from "react-modal";
import { BsArrowUpRight } from "react-icons/bs";
import { EtherscanProvider } from "@ethersproject/providers";
import RenderEtherspot from "../components/EtherSpotRender";

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

export default function Home() {
	const [isLoginModal, setIsLoginModal] = useState<boolean>(false);
	const [isAddModal, setIsAddModal] = useState<boolean>(false);
	const [isEtherSpotModal, setIsEtherSpotModal] = useState<boolean>(false);
	const [isUpModal, setIsUpModal] = useState<boolean>(false);
	const [addInfo, setAddInfo] = useState<any>();
	const [provider, setProvider] = useState<any>();
	const router = useRouter();

	useEffect(() => {
		const tmpPath = String(
			router.asPath.split("/")[1].split("?")[1]?.split(".")[0]
		);
		if (tmpPath == "true") {
			const tmpName = router.asPath.split("/")[1].split("?")[1].split(".")[1];
			const tmpPassword = router.asPath
				.split("/")[1]
				.split("?")[1]
				.split(".")[2];
			const tmpSpendLimit = router.asPath
				.split("/")[1]
				.split("?")[1]
				.split(".")[3];
			const tmpInfo = {
				name: tmpName,
				password: tmpPassword,
				spendLimit: tmpSpendLimit,
			};
			setAddInfo(tmpInfo);
			openUpModal();
		}
	}, []);

	// useEffect(() => {
	// 	// const network = "goerli";
	// 	const providerHost = `https://goerli.infura.io/v3/${InfuraAPIKey}`;
	// 	const tmpProvider = new ethers.providers.JsonRpcProvider(providerHost);
	// 	setProvider(tmpProvider);
	// }, []);

	const openLoginModal = () => {
		setIsLoginModal(true);
	};

	const closeLoginModal = () => {
		setIsLoginModal(false);
	};

	const openAddModal = () => {
		setIsAddModal(true);
	};

	const closeAddModal = () => {
		setIsAddModal(false);
	};

	const openUpModal = () => {
		setIsUpModal(true);
	};

	const closeUpModal = () => {
		setIsUpModal(false);
	};

	const openEtherSpotModal = () => {
		setIsEtherSpotModal(true);
	};

	const closeEtherSpotModal = () => {
		setIsEtherSpotModal(false);
	};

	return (
		<div className="bg-white min-h-screen relative">
			<LoginModal
				isLoginModal={isLoginModal}
				closeLoginModal={closeLoginModal}
			/>
			<UpModal
				isUpModal={isUpModal}
				closeUpModal={closeUpModal}
				addInfo={addInfo}
			/>
			<Modal
				isOpen={isEtherSpotModal}
				onRequestClose={closeEtherSpotModal}
				style={customStyles}
			>
				<RenderEtherspot />
			</Modal>
			<Header openLoginModal={openLoginModal} title="vitalik.eth" />
			<div className="max-w-screen-lg mx-auto mt-12 pb-12">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-4 mx-4">
					<div className="col-span-1 hidden md:block">
						<LeftMenuBlock />
						{/* <div
							onClick={openEtherSpotModal}
							className=" cursor-pointer mt-2 text-white rounded-lg p-4 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"
						>
							<div className="flex justify-start items-center">
								<div className="pr-2">EtherSpot</div>
								<BsArrowUpRight />
							</div>
						</div> */}
					</div>
					<div className="col-span-1 md:col-span-3">
						<Persona openAddModal={openAddModal} />
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
