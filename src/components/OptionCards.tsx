"use client"

import { useRouter } from "next/navigation";

interface Props {
    text: string;
    icon: string;
    route?: string;
    redirect: () => void;
}

const OptionCards = ({ text, icon, route, redirect }: Props) => {
    const router = useRouter();

    return (
        <div
            onClick={() => {
                if (route) return router.push(route);
                if (redirect) redirect();
            }}
            className="w-[350px] md:w-[650px] h-[60px] bg-off-white rounded-2xl my-1 transition-all  hover:text-primary hover:cursor-pointer flex justify-between items-center px-4"
        >
            <div className="flex items-center mt-4 mb-4">
                <i className={`bi bi-${icon} text-3xl`}></i>
                <p className="text-lg font-medium ml-2 select-none">{text}</p>
            </div>
            <div>
                <i className="bi bi-arrow-right-short text-3xl"></i>
            </div>
        </div>
    );
};

export default OptionCards;