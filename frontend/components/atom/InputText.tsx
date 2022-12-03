import { FC } from "react";

type Prop = {
	title: string;
};

const InputText: FC<Prop> = ({ title }) => {
	return (
		<div className="px-4">
			<div className="flex justify-between py-2">
				<div className="text-xl text-gray-700 font-bold">{title}</div>
				<input className="border rounded-md border-gray-500"></input>
			</div>
		</div>
	);
};

export default InputText;
