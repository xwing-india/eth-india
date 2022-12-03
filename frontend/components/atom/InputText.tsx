import { FC } from "react";

type Prop = {
	title: string;
	doChange: any;
};

const InputText: FC<Prop> = ({ title, doChange }) => {
	return (
		<div className="px-4">
			<div className="flex justify-between py-2">
				<div className="text-lg text-gray-700 font-bold">{title}</div>
				<input
					onChange={doChange}
					className="border rounded-md px-1 text-black border-gray-500 bg-white"
				></input>
			</div>
		</div>
	);
};

export default InputText;
