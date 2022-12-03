import Header from "../components/Header";
import LeftMenuBlock from "../components/LeftMenuBlock";
import Persona from "../components/Persona";
import ProfileBlock from "../components/ProfileBlock";
import Modal from "react-modal";
import { useState } from "react";
import LoginModal from "../components/LoginModal";
import AddModal from "../components/AddModal";

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
		<div className="bg-white min-h-screen">
			<LoginModal
				isLoginModal={isLoginModal}
				closeLoginModal={closeLoginModal}
			/>
			<Header openLoginModal={openLoginModal} />
			<div className="max-w-screen-lg mx-auto mt-12">
				<div className="grid grid-cols-4 gap-4">
					<div className="col-span-1">
						<LeftMenuBlock />
					</div>
					<div className="col-span-3">
						<Persona openAddModal={openAddModal} />
					</div>
				</div>
			</div>
		</div>
	);
}
