import Header from "../components/atom/Header";
import LeftMenuBlock from "../components/molecules/LeftMenuBlock";
import Persona from "../components/organisms/Persona";
import { useState } from "react";
import LoginModal from "../components/LoginModal";

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
			<div className="max-w-screen-lg mx-auto mt-12 pb-12">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-4 mx-4">
					<div className="col-span-1 hidden md:block">
						<LeftMenuBlock />
					</div>
					<div className="col-span-1 md:col-span-3">
						<Persona openAddModal={openAddModal} />
					</div>
				</div>
			</div>
		</div>
	);
}
