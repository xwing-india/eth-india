import Link from "next/link";

const LeftMenuBlock = () => {
	return (
		<div className=" h-[242px] rounded-xl bg-gradient-to-r from-sky-400 via-blue-400 to-blue-500 p-[3px] shadow-md">
			<div className="h-full w-full px-4 items-center justify-center bg-white rounded-[9px]">
				<div className="w-full text-gray-700 h-12 text-lg font-bold flex  items-center pt-2">
					<Link href="/home">Persona</Link>
				</div>
			</div>
		</div>
	);
};

export default LeftMenuBlock;
