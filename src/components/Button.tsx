"use client";

import { cn } from "@/libs/utils";
import { useRouter } from "next/navigation";

interface Props {
	route?: string;
	onClick?: any;
	text: string;
	disabled?: boolean;
}

const Button = ({ route, text, onClick, disabled = false }: Props) => {
	const router = useRouter();

	return (
		<button
			disabled={disabled}
			className={
                cn("w-full h-11 border-2 select-none justify-center rounded-xl text-base font-medium items-center normal-shadow hover:font-semibold border-borders-light hover:border-primary bg-default-white hover:text-primary transition-all", {
                    "normal-shadow text-borders opacity-50 hover:none": disabled
                })
            }
			onClick={() => {
				if (onClick) return onClick();
				if (route) return router.push(route);
			}}
		>
			{text}
		</button>
	);
};

export default Button;