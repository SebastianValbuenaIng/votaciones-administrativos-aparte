"use client";

import { Candidato } from "@/types/d";
import { useState } from "react";
import Modal from "../Modal";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import Button from "../Button";
import fetchFn from "@/utils/fetchFn";
import { Image } from "@nextui-org/react";
import { cn } from "@/libs/utils";

interface Props {
    candidatos: Candidato[];
    cantidad_votos: number;
    titulo: string;
    url_votacion: string;
}

export default function Candidatos({
    candidatos,
    cantidad_votos = 1,
    titulo,
    url_votacion,
}: Props) {
    const { data: session } = useSession();
    const router = useRouter();
    const [selected, setSelected] = useState<Candidato[]>([]);
    const [IsOpenModal, setIsOpenModal] = useState<boolean>(true);
    const [contenModal, setContenModal] = useState<"instrucciones" | "completo" | "confirmarVoto">(
        "instrucciones"
    );

    const guardarCandidato = (candidatos: any) => {
        const candidatoEncontrado = selected.find(
            (item) => item.id === candidatos.id
        );

        if (candidatoEncontrado) {
            return setSelected(selected.filter((item) => item.id !== candidatos.id));
        }

        if (selected.length >= cantidad_votos) {
            return toast.error(
                cantidad_votos === 1
                    ? "Solo puede seleccionar máximo un candidato"
                    : `Solo puede seleccionar máximo  ${cantidad_votos} candidatos`,
                { id: "100" }
            );
        }

        setSelected([...selected, candidatos]);
    };

    const enviarVoto = async () => {
        // Valor del idcrp con base a la URL
        let idcrp: number;

        if (url_votacion === "ccl") {
            idcrp = 121;
        } else if (url_votacion === "copasst") {
            idcrp = 120;
        } else if (url_votacion === "vcaprof") {
            idcrp = 118;
        } else if (url_votacion === "vcdprof") {
            idcrp = 119;
        } else {
            idcrp = 0;
        }

        // Petición para guardar el voto
        const response = await fetchFn(`/${url_votacion}/votar?email=${session && session.user ? session.user.email : ""}`,
            {
                method: "POST",
                body: {
                    candidatos: selected.map((candidato) => candidato.nroton),
                    idcrp: idcrp
                },
            }
        );

        // Evaluar la respuesta en caso de un error para mostrar toast
        if (response.error || response.code !== 200) {
            return toast.error("No se pudo registrar el voto", {
                position: "bottom-center",
                id: "4",
            });
        }

        setContenModal("completo");
        setIsOpenModal(true);
    };

    const confirmarVoto = () => {
        if (selected.length === 0)
            return toast.error("Seleccione las opciones", { id: "5" });

        if (cantidad_votos > 1) {
            if (selected.length < cantidad_votos) {
                const votoBlanco = selected.find(
                    (candidato) => candidato.narc === "imblanco"
                );
                if (!votoBlanco) {
                    return toast.error(
                        "Debe seleccionar 2 opciones \n o un voto en blanco",
                        { id: "6" }
                    );
                }
            }
        }

        setContenModal("confirmarVoto");
        setIsOpenModal(true);
    }

    const setClass = (idCandidato: number) => {
        const candidatoEncontrado = selected.find(
            (item) => item.id === idCandidato
        );

        return candidatoEncontrado ? true : false;
    };

    return (
        <>
            <Modal
                isOpen={IsOpenModal}
                classContainer={cn("max-w-[500px]", {
                    "max-w-[300px]": contenModal === "confirmarVoto"
                })}
                setIsOpen={setIsOpenModal}
                closeDisabled={contenModal === "completo" ? true : false}
            >
                {contenModal === "instrucciones" && (
                    <>
                        <p className="py-4 px-2">
                            Bienvenido a la <b>{titulo}</b>, recuerde que solo tiene un intento
                            de votación, debe escoger{" "}
                            <b>
                                {cantidad_votos === 1
                                    ? "una opción"
                                    : `${cantidad_votos} opciones`}{" "}
                            </b>{" "}
                            máximo o <b>un voto en blanco</b> y hacer clic en el botón{" "}
                            <b>Enviar Voto</b>
                        </p>
                        <div className="flex-center">
                            <button
                                type="button"
                                className="mt-5 rounded-md border bg-primary text-default-white px-4 py-2 text-sm font-medium"
                                onClick={() => {
                                    setIsOpenModal(false);
                                }}
                            >
                                Entendido
                            </button>
                        </div>
                    </>
                )}

                {contenModal === "completo" && (
                    <>
                        <p className="py-4 px-2 text-center">
                            Su voto a sido guardado con éxito <br />
                            <b>Gracias por votar!</b>
                            <br />
                        </p>
                        <div className="flex-center">
                            <button
                                type="button"
                                className="mt-5 rounded-md border bg-primary text-default-white px-4 py-2 text-sm font-medium"
                                onClick={() => {
                                    router.push("/votaciones");
                                    setIsOpenModal(false);
                                }}
                            >
                                Entendido
                            </button>
                        </div>
                    </>


                )}

                {contenModal === "confirmarVoto" && (
                    <>
                        <p className="py-4 px-2 text-center">¿Está seguro de enviar su voto?</p>
                        <div className="flex justify-center gap-10">
                            <button onClick={enviarVoto} className="hover:font-semibold transition-all">Sí</button>
                            <button onClick={() => setIsOpenModal(false)} className="hover:font-semibold hover:text-primary transition-all">No</button>
                        </div>
                    </>
                )}


            </Modal>

            <RadioGroup value={selected} onChange={guardarCandidato}>
                <div className="mx-auto w-[95%] max-w-lg lg:max-w-[1125px] grid grid-cols-1 gap-x-[50px] gap-y-5 lg:grid-cols-2 select-none">
                    {candidatos?.map((candidato) => (
                        <RadioGroup.Option
                            key={candidato.nombre}
                            value={candidato}
                            className={cn(
                                "cursor-pointer flex items-center p-6 text-default-white bg-primary font-medium text-center w-full h-[140px] transition-all rounded-xl strong-shadow", {
                                "bg-dark-primary": setClass(candidato.id)
                            }
                            )}
                        >
                            {/* Imagen */}
                            <div>
                                <Image
                                    className="max-w-[100px] max-h-[100px] rounded-xl absolute left-0 z-30"
                                    src={`/images/candidatos/${candidato.narc}.gif`}
                                    width={93}
                                    height={93}
                                />

                                <Image
                                    className="max-w-[100px] max-h-[100px] rounded-xl"
                                    src={'/images/candidatos/usuario.gif'}
                                    width={90}
                                    height={90}
                                />
                            </div>

                            <div className="flex flex-col justify-between w-full h-[70px] mb-2">
                                <p className="text-center text-2xl md:text-5xl">{candidato.nroton}</p>
                                <p className=" md:text-lg">{candidato.nombre}</p>
                            </div>

                            {!selected.find((item) => item.id === candidato.id) && (
                                <div className="rounded-full w-12 h-8 md:w-12 md:h-9 opacity-40 bg-default-white"></div>
                            )}

                            {selected.find((item) => item.id === candidato.id) && (
                                <div className="rounded-full p-1  text-dark-primary bg-default-white">
                                    <CheckIcon className=" rounded-full h-7 w-7" />
                                </div>
                            )}
                        </RadioGroup.Option>
                    ))}
                </div>
            </RadioGroup>

            <div className="flex justify-between gap-14 mx-auto my-10 w-[300px]">
                <Button text="Enviar Voto" onClick={confirmarVoto} />
                <Button disabled={false} text="Volver" route="/votaciones" />
            </div>
        </>
    );
}