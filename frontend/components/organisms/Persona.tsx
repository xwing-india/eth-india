import Link from "next/link";
import { FC } from "react";
import ProfileBlock from "../atom/ProfileBlock";

type Prop = {
	openAddModal: any;
};

const Persona: FC<Prop> = ({ openAddModal }) => {
	return (
		<div className="h-[503px] rounded-xl bg-gradient-to-r from-sky-400 via-blue-400 to-blue-500 p-1">
			<div className="h-full  w-full items-center justify-center bg-white rounded-lg">
				<div className="flex justify-between items-center h-[72px] px-4">
					<div className="text-2xl text-black">Persona</div>
					<div className="px-6 text-white cursor-pointer font-bold py-2 text-sm rounded-xl bg-gradient-to-r from-sky-400 via-blue-400 to-blue-500">
						<Link href="/add">Add</Link>
					</div>
				</div>
				<div className="border-y-2 border-gray-300">
					<div className="grid grid-cols-6 px-4 py-1 font-bold text-gray-500 text-[14px]">
						<div className="col-span-1">icon</div>
						<div className="col-span-1">name</div>
						<div className="col-span-2">allow contract</div>
						<div className="col-span-2">allow price</div>
					</div>
				</div>
				<ProfileBlock />
				<ProfileBlock />
				<ProfileBlock />
				<ProfileBlock />
			</div>
		</div>
	);
};

export default Persona;
