import Header from "@/components/Header";
import Candidatos from "@/components/pages/Candidatos";
import fetchFn from "@/utils/fetchFn";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const getData = async (email: string) => {
    const response = await fetchFn(`/ccl/estado_voto?email=${email}`)
    if (response.error || response.code !== 200) {
        return redirect("/votaciones?error=server")
    }
    if (response.data.estado === "1") {
        return redirect("/votaciones?error=e_ccl")
    }

    const candidatos = await fetchFn(`/ccl/candidatos`);
    return candidatos.data
};

export default async function CclPage() {
    const session = await getServerSession();
    let candidatos;

    if (session) {
        candidatos = await getData(session && session.user?.email ? session.user.email : "")
    } else {
        return redirect("/votaciones");
    }

    return (
        <main>
            <Header validarUser />
            <div className="mt-[90px] justify-center text-center">
                <h1 className="text-3xl text-primary font-bold">
                    Votación Comité de Convivencia Laboral
                </h1>
                <div className="justify-center my-5 p-2 mx-auto md:w-[800px]">
                    <p className="text-lg">
                        <b>Votación de Comité de Convivencia Laboral</b>,
                        recuerde que solo tiene un intento de votación, debe escoger una
                        opción o <b>un voto en blanco</b> y hacer clic en el botón <b>Enviar Voto</b>
                    </p>
                </div>
            </div>

            <div>
                <Candidatos
                    candidatos={candidatos}
                    cantidad_votos={1}
                    titulo="Votacion CCL"
                    url_votacion="ccl"
                />
            </div>
        </main>
    );
}
