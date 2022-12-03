import ProfileBlock from "../components/profileBlock";

export default function Home() {
	return (
		<div>
			<div className="flex justify-between items-center h-[60px] bg-gradient-to-r from-sky-400 via-blue-400 to-blue-500 pb-1">
				<div className="flex h-full w-full items-center justify-center bg-white ">
					<div className="h-full w-full flex justify-between items-center mx-4">
						<div>PersonaWallet</div>
						<div>header</div>
					</div>
				</div>
			</div>
			<div className="max-w-screen-lg mx-auto mt-12">
				<div className="grid grid-cols-4 gap-4">
					<div className="col-span-1 h-[242px] rounded-xl bg-gradient-to-r from-sky-400 via-blue-400 to-blue-500 p-1">
						<div className="h-full w-full px-4 items-center justify-center bg-white rounded-lg">
							<div className="w-full h-12 text-lg font-bold flex  items-center pt-2">
								Persona
							</div>
							<div className="w-full h-12 text-lg font-bold flex  items-center">
								Setting
							</div>
						</div>
					</div>
					<div className="col-span-3 h-[503px] rounded-xl bg-gradient-to-r from-sky-400 via-blue-400 to-blue-500 p-1">
						<div className="h-full  w-full items-center justify-center bg-white rounded-lg">
							<div className="flex justify-between items-center h-[72px] px-4">
								<div className="text-2xl">Persona</div>
								<div className="px-8 text-white font-bold py-2 rounded-xl bg-gradient-to-r from-sky-400 via-blue-400 to-blue-500">
									add
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
				</div>
			</div>
		</div>
	);
}
