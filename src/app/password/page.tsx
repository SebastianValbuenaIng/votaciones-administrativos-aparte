"use client";

import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import OptionCards from "@/components/OptionCards";
import Footer from "@/components/Footer";

export default function PasswordPage() {
    const router = useRouter();
    return (
        <>
            <main className="margin-header">
                <Header validarUser />

                <h1 className="text-3xl text-center mt-10 text-primary font-bold">
                    Gestione su contraseña:
                </h1>
                <div className="mx-auto w-[95%] max-w-[1500px] gap-8 mt-10 flex flex-wrap justify-center">
                    <OptionCards
                        text="Manual para cambio de contraseña"
                        icon="file-earmark-lock2"
                        route="https://gestorpasswd.escuelaing.edu.co/resources/1/Manual%20de%20usuario%20BSR%20SSO%20-%20Escuela%20Colombiana%20de%20Ingenier%C3%ADa%20Julio%20Garavito.pdf"
                    />
                    <OptionCards
                        text="Cambiar su contraseña"
                        icon="key"
                        route="https://gestorpasswd.escuelaing.edu.co/Portal/osiris/LoginForm"
                    />
                </div>
                <div className="justify-center text-center mt-10 h-[90px]">
                    <button
                        className="mx-5 w-[125px] max-w-xs h-12 lg:text-base text-center opacity-100 rounded-xl normal-shadow bg-default-white font-semibold text-primary hover:bg-primary hover:text-default-white"
                        onClick={() => router.push("/")}
                    >
                        Volver
                    </button>
                </div>
            </main>
            <Footer />
        </>
    );
}