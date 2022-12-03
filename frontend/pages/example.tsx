const Test = () => {
	return (
		<div className="">
			<div className="flex justify-center text-4xl mt-16">Send ETH</div>
			<div className="flex justify-center mt-8">
				<div className="w-[500px]  h-[242px] rounded-xl bg-gradient-to-r from-sky-400 via-blue-400 to-blue-500 p-1">
					<div className="h-full w-full px-4 items-center justify-center bg-white rounded-lg">
						<div className="flex justify-between">
							<div className="w-full h-12 text-lg font-bold flex  items-center pt-2">
								from
							</div>
							<input className="border my-4 border-gray-500"></input>
						</div>
						<div className="flex justify-between">
							<div className="w-full h-12 text-lg font-bold flex  items-center pt-2">
								to
							</div>
							<input className="border my-4 border-gray-500"></input>
						</div>{" "}
						<div className="flex justify-between">
							<div className="w-full h-12 text-lg font-bold flex  items-center pt-2">
								value
							</div>
							<input className="border my-4 border-gray-500"></input>
						</div>{" "}
						<div className="flex justify-between">
							<div className="w-full h-12 text-lg font-bold flex  items-center pt-2">
								password
							</div>
							<input className="border my-4 border-gray-500"></input>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Test;
