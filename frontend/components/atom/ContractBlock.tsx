import Image from "next/image";
import { FC } from "react";
import Avatar from "boring-avatars";

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
					<Avatar
						size={36}
						name={name}
						variant="marble"
						colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
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
