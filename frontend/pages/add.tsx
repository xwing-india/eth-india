import Header from "../components/atom/Header";
import LeftMenuBlock from "../components/molecules/LeftMenuBlock";
import { useState } from "react";
import LoginModal from "../components/LoginModal";
import AddModal from "../components/AddModal";
import ContractBlock from "../components/atom/ContractBlock";
import InputText from "../components/atom/InputText";
import { ethers } from "ethers";
import { sendToBundler } from "../util/DemoAccountAPI";
import { OAuthContractAddress } from "../util/consts";
import { OAuthAccount, OAuthAccount__factory } from "../typechain-types";
import ConfirmModal from "../components/ConfirmModal";
import Button from "../components/atom/Button";
import Footer from "../components/atom/Footer";
import { useRouter } from "next/router";

export default function Home() {
	const router = useRouter();

	const [isLoginModal, setIsLoginModal] = useState<boolean>(false);
	const [isAddModal, setIsAddModal] = useState<boolean>(false);
	const [isConfirmModal, setIsConfirmModal] = useState<boolean>(false);
	const [name, setName] = useState<string>("");
	const [password, setPassWord] = useState<string>("");
	const [spendLimit, setSpendLimit] = useState<string>("");
	const [wallet, setWallet] = useState<ethers.Wallet>();
	const [whiteList, setWhiteList] = useState<string[]>([]);
	const [displayWhiteList, setDisplayWhiteList] = useState<any[]>([]);
	const [blackList, setBlackList] = useState<string[]>();
	const [rootPassword, setRootPassword] = useState<string>();

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

	const openConfirmModal = () => {
		setIsConfirmModal(true);
	};

	const closeConfirmModal = () => {
		setIsConfirmModal(false);
	};

	const doChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const doChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassWord(e.target.value);
		const tmpWallet: ethers.Wallet = new ethers.Wallet(
			ethers.utils.id(String(e.target.value))
		);
		setWallet(tmpWallet);
	};

	const doChangeSpendLimit = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSpendLimit(e.target.value);
	};

	const createPersona = async () => {
		if (!wallet) return;
		const data = OAuthAccount__factory.createInterface().encodeFunctionData(
			"createPersona",
			[wallet.address, whiteList, blackList || [], spendLimit]
		);
		const txHash = await sendToBundler(
			"goerli",
			rootPassword || "",
			OAuthContractAddress,
			OAuthContractAddress,
			0,
			data
		);
		console.log(`https://goerli.etherscan.io/tx/${txHash}`);
		await router.push("/home");
	};

	return (
		<div className="bg-white min-h-screen relative">
			<LoginModal
				isLoginModal={isLoginModal}
				closeLoginModal={closeLoginModal}
			/>
			<AddModal
				isAddModal={isAddModal}
				closeAddModal={closeAddModal}
				whiteList={whiteList}
				setWhiteList={setWhiteList}
				displayWhiteList={displayWhiteList}
				setDisplayWhiteList={displayWhiteList}
			/>
			<ConfirmModal
				isConfirmModal={isConfirmModal}
				closeConfirmModal={closeConfirmModal}
				setRootPassword={setRootPassword}
				createPersona={createPersona}
			/>
			<Header openLoginModal={openLoginModal} title="vitalik.eth" />
			<div className="max-w-screen-lg mx-auto mt-12">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-4 mx-4">
					<div className="col-span-1 hidden md:block">
						<LeftMenuBlock />
					</div>
					<div className="col-span-3 mb-24 rounded-xl shadow-md">
						<div className=" rounded-xl bg-gradient-to-r from-sky-400 via-blue-400 to-blue-500 p-[3px]">
							<div className="h-full  w-full items-center justify-center bg-white rounded-[9px]">
								<div className="flex justify-between items-center h-[72px] px-4">
									<div className="text-2xl text-black">Add Persona</div>
									<div></div>
								</div>
								<InputText title="name" doChange={doChangeName} />
								<InputText title="password" doChange={doChangePassword} />
								<InputText title="Budget Limit" doChange={doChangeSpendLimit} />
								<div className="px-4">
									<div className="flex justify-between py-2">
										<div className="text-lg text-gray-700 font-bold">
											Allow Contract
										</div>
										<button
											onClick={openAddModal}
											className="border py-1 px-4 rounded-md text-gray-500 border-gray-500"
										>
											+add
										</button>
									</div>
								</div>
								<div className="border-y-2 border-gray-300 mt-4">
									<div className="grid grid-cols-6 px-4 py-1 font-bold text-gray-500 text-[14px]">
										<div className="col-span-1">Icon</div>
										<div className="col-span-1">Name</div>
										<div className="col-span-2">Allow contract</div>
									</div>
								</div>
								<div className="mb-24">
									{displayWhiteList &&
										displayWhiteList.map((item, idx) => {
											return (
												<ContractBlock
													key={idx}
													src=""
													name={item.name}
													address={item.address}
												/>
											);
										})}
								</div>
								<div className="flex justify-end py-4 px-4">
									<Button title="Create Persona" doClick={openConfirmModal} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
