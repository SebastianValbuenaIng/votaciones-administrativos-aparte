"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { TailSpin } from "react-loader-spinner";
import toast from "react-hot-toast";
import Header from "@/components/Header";
import ButtonVot from "@/components/pages/ButtonVot";
import fetchFn from "@/utils/fetchFn";
import { useInfoPersonaStore } from "@/store";

export default function SelectVotacion({ error }: { error?: string }) {
    const { data: session, status } = useSession();

    const [loading, setloading] = useState(true);
    const [data, setData] = useState<any[]>([]);

    const { getInfoPersona } = useInfoPersonaStore();
    const router = useRouter();

    const getData = async () => {
        const response = await fetchFn(
            `/vot_act?estado=1&email=${session && session.user ? session.user.email : ""
            }`
        );

        if (response.error || response.code !== 200) return "/";
        setData(response.data);
        setloading(false);
    }

    useEffect(() => {
        if (status === "authenticated") getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    useEffect(() => {
        if (error && error === "server") {
            toast.error("Ha ocurrido un error", { id: "1" });
            router.push("/");
        }
        if (error && error === "e_ccl") {
            toast.error("Usted ya votó a Comite de convivencia laboral", { id: "2" });
            router.push("/");
        }
        if (error && error === "e_copasst") {
            toast.error("Usted ya votó a la Votación COPASST", { id: "3" });
            router.push("/");
        }
        if (error && error === "e_vcaprof") {
            toast.error("Usted ya votó a la Votación Consejo Académico", { id: "4" });
            router.push("/");
        }
        if (error && error === "e_vcdprof") {
            toast.error("Usted ya votó a la Votación Consejo Directivo", { id: "5" });
            router.push("/");
        }
    }, [error, router]);

    return (
        <>
            <Header validarUser />

            {loading && (
                <div className="absolute ml-[40%] lg:ml-[47%] mt-[25%] lg:mt-[7%]  justify-center px-auto items-center ">
                    <TailSpin
                        height="80"
                        width="80"
                        color="#990000"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                    />
                </div>
            )}

            {!loading && (
                <>
                    <div className="mx-auto rounded-lg justify-center items-center text-center text-3xl text-primary font-bold mt-6 transition-all">
                        <h2 className="">Elija la votación</h2>
                    </div>
                    {
                        data.every(vot => vot.estado_voto === "1") && (
                            <h2 className="text-xl font-semibold text-center text-primary mt-9">Ya ha participado en todas las votaciones habilitadas para usted</h2>
                        )
                    }
                    <div className="flex flex-col items-center justify-center gap-3 max-w-[1200px] mx-auto mt-1 rounded-xl p-5 mb-4">
                        {
                            getInfoPersona().tipoRol.trim() === "Administrativo"
                                ? (
                                    <>
                                        {
                                            data
                                                .filter((item: any) => item.idcrp !== "118" && item.idcrp !== "119")
                                                .map((item: any) => (
                                                    <ButtonVot
                                                        disabled={item.estado_voto === "1"}
                                                        key={item.id}
                                                        route={item.ruta ?? "/"}
                                                        text={item.nombre}
                                                    />
                                                ))
                                        }
                                    </>
                                ) : (
                                    <>
                                        {data.map((item: any) =>
                                            <ButtonVot
                                                disabled={item.estado_voto === "1"}
                                                key={item.id}
                                                route={item.ruta ?? "/"}
                                                text={item.nombre}
                                            />
                                        )}
                                    </>
                                )
                        }
                    </div>
                    <div className="text-center mt-[2px]">
                        <button
                            className="mx-5 w-[125px] h-11 font-semibold normal-shadow bg-default-white rounded-lg text-primary hover:text-default-white hover:bg-primary hover:border-transparent"
                            onClick={() => router.push("/")}
                        >
                            Volver
                        </button>
                    </div>
                </>
            )}
        </>
    );
}