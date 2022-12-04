import { ethers } from "ethers";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import {
	EntryPoint__factory,
	OAuthAccount,
	OAuthAccount__factory,
} from "../../typechain-types";
import {
	EntryPointContractAddress,
	InfuraAPIKey,
	OAuthContractAddress,
} from "../../util/consts";
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
	const [personas, serPersonas] =
		useState<[string, OAuthAccount.PersonaDataStructOutput][]>();
	const [balance, setBalance] = useState("");
	useEffect(() => {
		const provider = new ethers.providers.InfuraProvider(
			"goerli",
			InfuraAPIKey
		);
		const account = OAuthAccount__factory.connect(
			OAuthContractAddress,
			provider
		);
		void (async () => {
			const balance = await provider.getBalance(account.address);
			setBalance(ethers.utils.formatEther(balance));
			const personaCount = await account.totalPersona();
			const personas: [string, OAuthAccount.PersonaDataStructOutput][] = [];
			for (let i = 0; personaCount.toNumber() > i; i++) {
				personas.push(await account.getPersonaByIndex(i));
			}
			serPersonas(personas);
		})();
	}, []);
	return (
		<div className="h-[503px] rounded-xl bg-gradient-to-r from-sky-400 via-blue-400 to-blue-500 p-[3px] shadow-md relative">
			<div className="h-full w-full bg-white rounded-[9px] overflow-x-scroll">
				<div className="flex justify-between items-center h-[72px] px-4">
					<div className="flex justify-start items-end gap-4 text-sm">
						<div className="text-2xl text-black">Persona</div>
						<div className="text-lg">Balance: {balance}ETH</div>
					</div>
					<Link
						href="/add"
						className="px-6 text-white cursor-pointer font-bold py-2 text-sm rounded-lg bg-gradient-to-r from-sky-400 via-blue-400 to-blue-500"
					>
						Add
					</Link>
				</div>
				<div className="border-y-2 border-gray-300">
					<div className="grid grid-cols-7 px-4 py-1 font-bold text-gray-500 text-[14px]">
						<div className="col-span-1">Icon</div>
						<div className="col-span-2">Name</div>
						<div className="col-span-2">Allowed Contracts</div>
						<div className="col-span-2">Budget Limit</div>
					</div>
				</div>
				<div>
					{personas &&
						personas.map(([address, persona], index) => {
							return (
								<ProfileBlock
									key={address}
									name={`${address.slice(0, 6)}...${address.slice(-4)}`}
									contractAddress={persona.allowTargets}
									spendLimit={ethers.utils.formatEther(persona.balance)}
									isGuest={persona.mode.toNumber() === 16}
								/>
							);
						})}
				</div>
			</div>
		</div>
	);
};

export default Persona;
