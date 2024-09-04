"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import Modal from "../Modal";

export default function Login({ searchParams }: any) {
    let [IsOpenInstruc, setIsOpenInstruc] = useState<boolean>(true);
    const router = useRouter();

    const { status } = useSession();

    useEffect(() => {
        const error = searchParams.error ? searchParams.error : false;
        if (error) {
            if (error === "auth") {
                toast.error("su cuenta no esta activa, por favor cerrar sesión.", {
                    position: "bottom-center",
                    id: "error1",
                });
            }
            if (error === "rol") {
                toast.error(
                    "usted esta usando una cuenta de estudiante, por favor cerrar sesión.",
                    { position: "bottom-center", id: "error2" }
                );
            }
            router.push("/login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (status === "unauthenticated") signIn("azure-ad", { callbackUrl: "/" });
    }, [status]);

    return (
        <>

        </>
    );
}