import { FaGithub } from "react-icons/fa";
const Footer = () => {
	return (
		<div className="absolute bottom-0 w-full">
			<div className="flex justify-end mx-8 py-4">
				<div></div>
				<a href="" className="flex justify-center items-center gap-2">
					<FaGithub size={16} color={"#3482F6"} />
					<div className=" text-blue-500">Github</div>
				</a>
			</div>
		</div>
	);
};

export default Footer;
