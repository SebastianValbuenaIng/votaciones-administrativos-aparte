import Footer from "@/components/Footer";
import SelectVotacion from "@/components/pages/SelectVotacion";
import { PersonaActiva } from "@/types";
import fetchFn from "@/utils/fetchFn";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function VotacionesPage() {
    const session = await getServerSession();

    let infoPersona: PersonaActiva = {
        id: 0,
        nombre: "",
        nroDocumento: "",
        emplId: "",
        email: "",
        tipoDocumento: "",
        tipoRol: ""
    };

    if (session) {
        const email = session.user?.email || "";
        const domain = email.split("@")[1];
        if (domain === "escuelaing.edu.co") {
            const response = await fetchFn(`/personas?email=${email}`);
            if (response.code === 400) return redirect("/logout?error=auth");

            infoPersona = response.data;
        } else {
            return redirect("/logout?error=rol");
        }
    }


	return (
		<>
			<main className="margin-header relative ">
				<SelectVotacion />
			</main>
			<Footer	 />
		</>
	);
}