const Test = () => {
	return (
		<div className="bg-white min-h-screen">
			<div className="flex justify-center text-4xl pt-24 text-black">
				Send ETH
			</div>
			<div>
				<div className="flex justify-center mt-8">
					<div className="w-[500px]  rounded-xl bg-gradient-to-r from-sky-400 via-blue-400 to-blue-500 p-1">
						<div className="h-full w-full px-8 items-center justify-center bg-white rounded-lg">
							<div className="flex justify-between text-black font-bold pt-[40px]">
								<div>From</div>
								<input
									onChange={() => {}}
									className="bg-white border border-gray-700 rounded-md"
								></input>
							</div>
							<div className="flex justify-between text-black font-bold pt-4">
								<div>to</div>
								<input
									onChange={() => {}}
									className="bg-white border border-gray-700 rounded-md"
								></input>
							</div>
							<div className="flex justify-between text-black font-bold pt-4">
								<div>value</div>
								<input
									onChange={() => {}}
									className="bg-white border border-gray-700 rounded-md"
								></input>
							</div>
							<div className="flex justify-between text-black font-bold pt-4">
								<div>password</div>
								<input
									onChange={() => {}}
									className="bg-white border border-gray-700 rounded-md"
								></input>
							</div>
							<div className="flex justify-center pt-8 pb-4">
								<div
									onClick={() => {}}
									className="px-6 text-white cursor-pointer font-bold py-2 text-sm rounded-xl bg-gradient-to-r from-sky-400 via-blue-400 to-blue-500"
								>
									Send ETH
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Test;
