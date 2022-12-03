import Header from "../components/atom/Header";
import LeftMenuBlock from "../components/molecules/LeftMenuBlock";
import Persona from "../components/organisms/Persona";
import { useState } from "react";
import LoginModal from "../components/LoginModal";
import Link from "next/link";

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
		<div className="min-h-screen text-black bg-white isolate">
			<Header openLoginModal={() => {}} />
			<div>
				<div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40">
					<h1 className="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">
						Data to enrich your online business
					</h1>
					<p className="mt-6 text-lg leading-8 text-gray-600 sm:text-center">
						Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
						lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
						fugiat aliqua.
					</p>
					<div className="mt-8 flex gap-x-4 sm:justify-center">
						<Link
							href="/home"
							className="px-6 text-white cursor-pointer font-bold pt-[10px] pb-2 text-sm rounded-lg bg-gradient-to-r from-sky-400 via-blue-400 to-blue-500"
						>
							Get Start
						</Link>
						<a
							href="#"
							className="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
						>
							Live demo
							<span className="text-gray-400" aria-hidden="true">
								&rarr;
							</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
