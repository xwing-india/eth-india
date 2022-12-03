import { FC } from "react";

type Prop = {
	title: string;
	doChange: any;
};

const InputText: FC<Prop> = ({ title, doChange }) => {
	return (
		<div className="px-4">
			<div className="flex justify-between py-2">
				<div className="text-xl text-gray-700 font-bold">{title}</div>
				<input
					onChange={doChange}
					className="border rounded-md border-gray-500 bg-white"
				></input>
			</div>
		</div>
	);
};

export default InputText;
