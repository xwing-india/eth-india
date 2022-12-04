import Link from "next/link";
import { useEffect, useState } from "react";
import { OAuthAccount,OAuthAccount__factory } from "../../typechain-types";
import { ethers } from "ethers";
import { OAuthContractAddress, InfuraAPIKey } from "../../util/consts";

const LeftMenuBlock = () => {
	const [balance,setBalance] = useState("");

	useEffect(()=>{
		const provider = new ethers.providers.InfuraProvider("goerli", InfuraAPIKey)
		const account = OAuthAccount__factory.connect(
			OAuthContractAddress,
			provider
		  );
		  void (async () => {
			const balance = await provider.getBalance(account.address);
			setBalance(ethers.utils.formatEther(balance))
		  })();
	},[])
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
