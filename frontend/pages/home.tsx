import Header from "../components/atom/Header";
import LeftMenuBlock from "../components/molecules/LeftMenuBlock";
import Persona from "../components/organisms/Persona";
import { useEffect, useState } from "react";
import LoginModal from "../components/LoginModal";
import { useRouter } from "next/router";
import UpModal from "../components/UpModal";
import Footer from "../components/atom/Footer";

export default function Home() {
	const [isLoginModal, setIsLoginModal] = useState<boolean>(false);
	const [isAddModal, setIsAddModal] = useState<boolean>(false);
	const [isUpModal, setIsUpModal] = useState<boolean>(false);
	const [addInfo, setAddInfo] = useState<any>();
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
			<Header openLoginModal={openLoginModal} title="vitalik.eth" />
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
			<Footer />
		</div>
	);
}
