import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import ChainModal from "../ChainModal";
import Button from "./Button";

type Prop = {
	openLoginModal: any;
	title: string;
};

const Header: FC<Prop> = ({ openLoginModal, title }) => {
	const [isChainModal, setIsChainModal] = useState<boolean>(false);
	const [chainId, setChainId] = useState();
	const openChainModal = () => {
		setIsChainModal(true);
	};

	const closeChainModal = () => {
		setIsChainModal(false);
	};
	const router = useRouter();
	return (
		<>
			<ChainModal
				isChainModal={isChainModal}
				closeChainModal={closeChainModal}
				setChainId={setChainId}
			/>
			<div className="flex justify-between items-center h-[60px] bg-gradient-to-r from-sky-400 via-blue-400 to-blue-500 pb-[3px]">
				<div className="flex h-full w-full items-center justify-center bg-white ">
					<div className="h-full w-full flex justify-between items-center mx-4">
						<Link href="/" className="font-bold text-gray-700">
							<Image src="/images/logo.png" width={160} height={10} alt="" />
						</Link>
						<div className="flex justify-center items-center gap-6">
							<div
								onClick={openChainModal}
								className=" cursor-pointer rounded-full border-2 px-6 py-1 border-gray-500 text-gray-500 font-bold"
							>
								select chain
							</div>
							<Button title={title} doClick={() => router.push("/home")} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default Header;
