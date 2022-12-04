import Image from "next/image";
import Avatar from "boring-avatars";
import { FC } from "react";

type Prop = {
	name: string;
	contractAddress: string[];
	spendLimit: string;
	isGuest: boolean;
};

const ProfileBlock: FC<Prop> = ({
	name,
	contractAddress,
	spendLimit,
	isGuest,
}) => {
	return (
		<div className="grid grid-cols-7 h-[72px] items-center px-4">
			<div className="col-span-1  flex justify-start text-black">
				<Avatar
					size={36}
					name={name}
					variant="marble"
					colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
				/>
			</div>
			{isGuest ? (
				<div className="col-span-2 flex justify-start items-center">
					<div className="text-black ">{name}</div>
					<div className="bg-orange-500 text-white px-3 py-1 text-xs mx-2 rounded-md font-bold">
						Guest
					</div>
				</div>
			) : (
				<div className="col-span-2 text-black">{name}</div>
			)}
			<div className="col-span-2 justify-start flex gap-1">
				{contractAddress &&
					contractAddress.map((item, index) => {
						return (
							<Avatar
								key={index}
								size={36}
								name={item}
								variant="marble"
								colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
							/>
						);
					})}
			</div>
			<div className="col-span-2 text-black">
				<span>{spendLimit}</span>
			</div>
		</div>
	);
};

export default ProfileBlock;
