import { ethers } from "ethers";
import { useState } from "react";

const Test = () => {
	const [from, setFrom] = useState<string>("");
	const [to, setTo] = useState<string>("");
	const [value, setValue] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [wallet, setWallet] = useState<ethers.Wallet | null>(null);

	const doChangeFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFrom(e.target.value);
	};

	const doChangeTo = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTo(e.target.value);
	};

	const doChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const doChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
		const tmpWallet: ethers.Wallet = new ethers.Wallet(
			ethers.utils.id(e.target.value)
		);
		setWallet(tmpWallet);
	};

	const doSend = () => {
		if (!wallet) return;
		const abi = "";
		const iface = new ethers.utils.Interface(abi);
		const txn = iface.encodeFunctionData("functionName", [
			from,
			to,
			value,
			password,
		]);
	};

	return (
		<div className="bg-white min-h-screen">
			<div className="flex justify-center text-4xl pt-24 bg-clip-text text-transparent  tracking-tight bg-gradient-to-r from-sky-400 via-blue-400 to-blue-500">
				Send ETH
			</div>
			<div>
				<div className="flex justify-center mt-8">
					<div className="w-[500px]  rounded-xl  bg-gradient-to-r from-sky-400 via-blue-400 to-blue-500 p-1">
						<div className="h-full w-full px-8 items-center justify-center bg-white rounded-lg">
							<div className="flex justify-between text-black font-bold pt-[40px]">
								<div>From</div>
								<input
									onChange={doChangeFrom}
									className="bg-white border border-gray-700 rounded-md"
								></input>
							</div>
							<div className="flex justify-between text-black font-bold pt-4">
								<div>to</div>
								<input
									onChange={doChangeTo}
									className="bg-white border border-gray-700 rounded-md"
								></input>
							</div>
							<div className="flex justify-between text-black font-bold pt-4">
								<div>value</div>
								<input
									onChange={doChangeValue}
									className="bg-white border border-gray-700 rounded-md"
								></input>
							</div>
							<div className="flex justify-between text-black font-bold pt-4">
								<div>password</div>
								<input
									onChange={doChangePassword}
									className="bg-white border border-gray-700 rounded-md"
								></input>
							</div>
							<div className="flex justify-center pt-8 pb-4">
								<div
									onClick={doSend}
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
