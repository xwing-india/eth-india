import { FC } from "react";

type Prop = {
	title: string;
	doClick: () => void;
};

const Button: FC<Prop> = ({ title, doClick }) => {
	return (
		<div
			onClick={doClick}
			className="px-6 text-white cursor-pointer font-bold py-[10px] text-sm rounded-lg bg-gradient-to-r from-sky-400 via-blue-400 to-blue-500"
		>
			{title}
		</div>
	);
};

export default Button;
