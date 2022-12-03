import Header from "../components/Header";
import LeftMenuBlock from "../components/LeftMenuBlock";
import Persona from "../components/Persona";
import ProfileBlock from "../components/ProfileBlock";
import Modal from "react-modal";
import { useState } from "react";
import LoginModal from "../components/LoginModal";
import AddModal from "../components/AddModal";
import Image from "next/image";
import ContractBlock from "../components/ContractBlock";
import InputText from "../components/atom/InputText";
import { ethers } from "ethers";
import {sendToBundler} from "../util/DemoAccountAPI";
import {isAwaitExpression} from "tsutils";
import {OAuthContractAddress} from "../util/consts";
import {OAuthAccount, OAuthAccount__factory} from "../typechain-types";

export default function Home() {
	const [isLoginModal, setIsLoginModal] = useState<boolean>(false);
	const [isAddModal, setIsAddModal] = useState<boolean>(false);
	const [name, setName] = useState<string>("");
	const [password, setPassWord] = useState<string>("");
	const [spendLimit, setSpendLimit] = useState<string>("");
	const [wallet, setWallet] = useState<ethers.Wallet>();
	const [whiteList, setWhiteList] = useState<string[]>([]);
	const [blackList, setBlackList] = useState<string[]>();

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

	const doChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const doChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassWord(e.target.value);
		const tmpWallet: ethers.Wallet = new ethers.Wallet(
			ethers.utils.id(e.target.value)
		);
		setWallet(tmpWallet);
	};

	const doChangeSpendLimit = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSpendLimit(e.target.value);
	};

	const createPersona = async () => {
		if (!wallet) return;
		const data = OAuthAccount__factory.createInterface().encodeFunctionData(
			"createPersona", [
			wallet.address,
			whiteList,
			blackList || [],
			spendLimit,
		]);
		await sendToBundler("ethereum", password, OAuthContractAddress, OAuthContractAddress, 0, data);
	};

	return (
		<div className="bg-white">
			<LoginModal
				isLoginModal={isLoginModal}
				closeLoginModal={closeLoginModal}
			/>
			<AddModal
				isAddModal={isAddModal}
				closeAddModal={closeAddModal}
				whiteList={whiteList}
				setWhiteList={setWhiteList}
			/>
			<Header openLoginModal={openLoginModal} />
			<div className="max-w-screen-lg mx-auto mt-12">
				<div className="grid grid-cols-4 gap-4">
					<div className="col-span-1">
						<LeftMenuBlock />
					</div>
					<div className="col-span-3 mb-24">
						<div className=" rounded-xl bg-gradient-to-r from-sky-400 via-blue-400 to-blue-500 p-1">
							<div className="h-full  w-full items-center justify-center bg-white rounded-lg">
								<div className="flex justify-between items-center h-[72px] px-4">
									<div className="text-2xl text-black">Add Persona</div>
									<div></div>
								</div>
								<InputText title="name" doChange={doChangeName} />
								<InputText title="password" doChange={doChangePassword} />
								<InputText
									title="spending limits"
									doChange={doChangeSpendLimit}
								/>
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
										<div className="col-span-1">icon</div>
										<div className="col-span-1">name</div>
										<div className="col-span-2">allow contract</div>
									</div>
								</div>
								{whiteList &&
									whiteList.map(() => {
										return <ContractBlock />;
									})}
								<div className="flex justify-end py-4 px-4">
									<div
										onClick={() => {}}
										className="px-6 text-white cursor-pointer font-bold py-3 text-sm rounded-xl bg-gradient-to-r from-sky-400 via-blue-400 to-blue-500"
									>
										Create Persona
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
