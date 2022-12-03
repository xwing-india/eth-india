import Link from "next/link";

const LeftMenuBlock = () => {
	return (
		<div className=" h-[242px] rounded-xl bg-gradient-to-r from-sky-400 via-blue-400 to-blue-500 p-1">
			<div className="h-full w-full px-4 items-center justify-center bg-white rounded-lg">
				<div className="w-full text-gray-700 h-12 text-lg font-bold flex  items-center pt-2">
					<Link href="/">Persona</Link>
				</div>
			</div>
		</div>
	);
};

export default LeftMenuBlock;
