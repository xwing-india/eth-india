import Image from "next/image";
import { FC } from "react";

type Prop = {
	src: string;
	name: string;
	address: string;
};

const ContractBlock: FC<Prop> = ({ src, name, address }) => {
	return (
		<div className="grid grid-cols-6 h-[72px] items-center px-4">
			<div className="col-span-1  flex justify-start">
				<div className="p-4 rounded-full  relative">
					<Image
						src="/images/opensea.png"
						layout="fill"
						objectFit="cover"
						className="rounded-lg"
						alt=""
					/>
				</div>
			</div>
			<div className="col-span-1 text-black">{name}</div>
			<div className="col-span-2 justify-start flex gap-1">
				<div className="bg-gray-200 rounded-md text-gray-700 font-bold text-sm px-5 py-1">
					{address.slice(0, 4) + "..." + address.slice(-4)}
				</div>
			</div>
		</div>
	);
};

export default ContractBlock;
