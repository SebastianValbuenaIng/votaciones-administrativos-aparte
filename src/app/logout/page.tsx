"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";

export default function LogoutPage({
    searchParams,
}: {
    params: object;
    searchParams: { error: string };
}) {
    useEffect(() => {
        signOut({
            callbackUrl: "https://www.escuelaing.edu.co/es/",
            redirect: false
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <></>
}
