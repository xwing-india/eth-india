import Link from "next/link";
import { FC } from "react";

type Prop = {
	openLoginModal: any;
};

const Header: FC<Prop> = ({ openLoginModal }) => {
	return (
		<div className="flex justify-between items-center h-[60px] bg-gradient-to-r from-sky-400 via-blue-400 to-blue-500 pb-[3px]">
			<div className="flex h-full w-full items-center justify-center bg-white ">
				<div className="h-full w-full flex justify-between items-center mx-4">
					<Link href="/" className="font-bold text-gray-700">
						FireWallet
					</Link>
					<Link href="/home">
						<div className="px-6 text-white cursor-pointer font-bold py-2 text-sm rounded-lg bg-gradient-to-r from-sky-400 via-blue-400 to-blue-500">
							Login by Demo
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
};
export default Header;
