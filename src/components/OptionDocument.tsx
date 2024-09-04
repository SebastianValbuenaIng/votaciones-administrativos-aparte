"use client";

import { useRouter } from "next/navigation";

interface Props {
	text: string;
	icon: string;
	route?: string;
}

const OptionDocument = ({ text, icon, route }: Props) => {
	const router = useRouter();
	return (
		<div
			onClick={() => {
				if (route) return router.push(route);
			}}
			className="w-[400px] h-[150px] bg-off-white card-shadow rounded-2xl text-center transition-all hover:text-primary cursor-pointer"
		>
			<div className="mt-8">
				<i className={`bi bi-${icon} text-4xl`}></i>
				<p className="text-xl font-medium mt-2 select-none">{text}</p>
			</div>
		</div>
	);
};

export default OptionDocument;