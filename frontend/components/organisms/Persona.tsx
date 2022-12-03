import Link from "next/link";
import { FC } from "react";
import ProfileBlock from "../atom/ProfileBlock";

type Prop = {
	openAddModal: any;
};

const data = [
	{
		name: "Main",
		contractAddress: ["0x00", "0x01", "0x02"],
		spendLimit: "0.1",
		isGuest: false,
	},
	{
		name: "GamiFi",
		contractAddress: ["0x00", "0x01", "0x02"],
		spendLimit: "0.55",
		isGuest: false,
	},
	{
		name: "DAO",
		contractAddress: ["0x00", "0x03", "0x04"],
		spendLimit: "0.15",
		isGuest: true,
	},
];

const raw = [1, 2, 3];

const Persona: FC<Prop> = ({ openAddModal }) => {
	return (
		<div className="h-[503px] rounded-xl bg-gradient-to-r from-sky-400 via-blue-400 to-blue-500 p-[3px] shadow-md">
			<div className="h-full  w-full items-center justify-center bg-white rounded-[9px]">
				<div className="flex justify-between items-center h-[72px] px-4">
					<div className="text-2xl text-black">Persona</div>
					<div className="px-6 text-white cursor-pointer font-bold py-2 text-sm rounded-lg bg-gradient-to-r from-sky-400 via-blue-400 to-blue-500">
						<Link href="/add">Add</Link>
					</div>
				</div>
				<div className="border-y-2 border-gray-300">
					<div className="grid grid-cols-7 px-4 py-1 font-bold text-gray-500 text-[14px]">
						<div className="col-span-1">Icon</div>
						<div className="col-span-2">Name</div>
						<div className="col-span-2">Allowed Contracts</div>
						<div className="col-span-2">Budget Limit</div>
					</div>
				</div>
				<>
					{data &&
						data.map((item, index) => {
							return (
								<ProfileBlock
									name={item.name}
									contractAddress={item.contractAddress}
									spendLimit={item.spendLimit}
									isGuest={item.isGuest}
								/>
							);
						})}
				</>
			</div>
		</div>
	);
};

export default Persona;
