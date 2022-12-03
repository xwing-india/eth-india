const ProfileBlock = ({}) => {
	return (
		<div className="grid grid-cols-6 h-[72px] items-center px-4">
			<div className="col-span-1  flex justify-start">
				<div className="p-4 rounded-full bg-red-400"></div>
			</div>
			<div className="col-span-1">Persona1</div>
			<div className="col-span-2 justify-start flex gap-1">
				<div className="p-4 rounded-full bg-red-400"></div>
				<div className="p-4 rounded-full bg-red-400"></div>
				<div className="p-4 rounded-full bg-red-400"></div>
			</div>
			<div className="col-span-2">
				<span>0.01</span>
				<span className="pl-2">/</span>
				<span className="pl-2">0.1</span>
			</div>
		</div>
	);
};

export default ProfileBlock;
