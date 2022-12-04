import Header from "../components/atom/Header";
import LeftMenuBlock from "../components/molecules/LeftMenuBlock";
import Persona from "../components/organisms/Persona";
import { useState } from "react";
import LoginModal from "../components/LoginModal";
import Link from "next/link";
import Head from "next/head";
import Footer from "../components/atom/Footer";

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
		<div className="min-h-screen relative text-black bg-white isolate">
			<Head>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
				<meta name="msapplication-TileColor" content="#da532c" />
				<meta name="theme-color" content="#ffffff"></meta>
			</Head>
			<Header openLoginModal={() => {}} title="Login by Demo" />
			<div>
				<div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40">
					<h1 className="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">
						One wallet Multi accounts
					</h1>
					<p className="mt-6 text-lg leading-8 text-gray-600 sm:text-center">
						firewallet is an EIP4337 compliant secure contract wallet that
						enables you to create roles. the role can limit the amount of money
						that can transfer and the contract that can call.
					</p>
					<div className="mt-8 flex sm:justify-center gap-3">
						<div className="rounded-lg bg-gradient-to-r from-sky-400 via-blue-400 to-blue-500 p-[3px]">
							<input
								type="text"
								className=" h-full w-full rounded-[5px] pl-2 bg-white"
								placeholder="Enter Address or ENS"
							/>
						</div>
						<Link
							href="/home"
							className="px-4 text-white cursor-pointer font-bold pt-[10px] pb-2 text-sm rounded-lg bg-gradient-to-r from-sky-400 via-blue-400 to-blue-500"
						>
							Get Start
						</Link>
					</div>
				</div>
				<Footer />
			</div>
		</div>
	);
}
