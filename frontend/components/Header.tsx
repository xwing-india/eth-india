import { FC } from "react";

type Prop = {
	openLoginModal: any;
};

const Header: FC<Prop> = ({ openLoginModal }) => {
	return (
		<div className="flex justify-between items-center h-[60px] bg-gradient-to-r from-sky-400 via-blue-400 to-blue-500 pb-1">
			<div className="flex h-full w-full items-center justify-center bg-white ">
				<div className="h-full w-full flex justify-between items-center mx-4">
					<div className="font-bold">FireWallet</div>
					<div
						onClick={openLoginModal}
						className="px-6 text-white cursor-pointer font-bold py-2 text-sm rounded-xl bg-gradient-to-r from-sky-400 via-blue-400 to-blue-500"
					>
						Login
					</div>
				</div>
			</div>
		</div>
	);
};
export default Header;
