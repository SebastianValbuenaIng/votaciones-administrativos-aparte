"use client";

import { cn } from "@/libs/utils";
import { useRouter } from "next/navigation";

interface Props {
    route: string;
    text: string;
    disabled?: boolean;
}

const ButtonVot = ({ route, text, disabled = false }: Props) => {
    const router = useRouter();

    return (
        <button
            disabled={disabled}
            className={
                cn("w-[350px] md:w-[600px] h-[100px] text-base rounded-xl transition-all card-shadow bg-default-white my-2 font-semibold hover:text-primary flex items-center justify-between p-2", {
                    "text-default-400 normal-shadow bg-borders-light hover:none hover:text-default-400": disabled
                })
            }
            onClick={() => router.push(route)}
        >
            <div className="flex gap-2 items-center">
                <i className="bi bi-check2-square text-3xl"></i>
                <p className="text-xl font-medium">{text}</p>
            </div>

            <div>
                <i className="bi bi-arrow-right-short text-3xl"></i>
            </div>
        </button>
    );
};

export default ButtonVot;