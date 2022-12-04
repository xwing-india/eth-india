import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import Button from "./Button";

type Prop = {
	openLoginModal: any;
	title: string;
};

const Header: FC<Prop> = ({ openLoginModal, title }) => {
	const router = useRouter();
	return (
		<div className="flex justify-between items-center h-[60px] bg-gradient-to-r from-sky-400 via-blue-400 to-blue-500 pb-[3px]">
			<div className="flex h-full w-full items-center justify-center bg-white ">
				<div className="h-full w-full flex justify-between items-center mx-4">
					<Link href="/" className="font-bold text-gray-700">
						<Image src="/images/logo.png" width={160} height={10} alt="" />
					</Link>
					<Button title={title} doClick={() => router.push("/home")} />
				</div>
			</div>
		</div>
	);
};
export default Header;
