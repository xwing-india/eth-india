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

export default function Home() {
	const [isLoginModal, setIsLoginModal] = useState<boolean>(false);
	const [isAddModal, setIsAddModal] = useState<boolean>(false);

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

	return (
		<div>
			<LoginModal
				isLoginModal={isLoginModal}
				closeLoginModal={closeLoginModal}
			/>
			<AddModal isAddModal={isAddModal} closeAddModal={closeAddModal} />
			<Header openLoginModal={openLoginModal} />
			<div className="max-w-screen-lg mx-auto mt-12">
				<div className="grid grid-cols-4 gap-4">
					<div className="col-span-1">
						<LeftMenuBlock />
					</div>
					<div className="col-span-3">
						<div className=" rounded-xl bg-gradient-to-r from-sky-400 via-blue-400 to-blue-500 p-1">
							<div className="h-full  w-full items-center justify-center bg-white rounded-lg">
								<div className="flex justify-between items-center h-[72px] px-4">
									<div className="text-2xl">Add Persona</div>
									<div></div>
								</div>
								<InputText title="name" />
								<InputText title="password" />
								<InputText title="value" />
								<div className="px-4">
									<div className="flex justify-between py-2">
										<div className="text-xl text-gray-700 font-bold">
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
								<ContractBlock />
								<ContractBlock />
								<ContractBlock />
								<div className="flex justify-end py-4 px-4">
									<div
										onClick={openAddModal}
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
