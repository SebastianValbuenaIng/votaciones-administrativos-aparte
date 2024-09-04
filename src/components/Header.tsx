"use client"

import { useState } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import Menu from "@/components/Menu";
import Modal from "./Modal";
import Link from "next/link";

interface Props {
    validarUser: boolean;
}

const Header = ({ validarUser }: Props) => {
    const { data, status } = useSession();

    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <header className="fixed top-0 left-0 right-0  w-full h-[65px] text-start shadow-sm bg-gray-box border-b border-borders-light z-40 select-none">
            <Modal
                isOpen={showModal}
                setIsOpen={setShowModal}
                classContainer="max-w-[450px]"
            >
                <>
                    <h1 className="flex flex-col mt-4 mb-6 text-xl font-semibold text-primary text-center gap-1 outline-none">
                        Cerrar sesión
                    </h1>
                    <div>
                        <p className="text-lg text-center items-center justify-center rounded-lg outline-none">
                            ¿Seguro que quiere cerrar sesión?
                        </p>
                    </div>
                    <div className="flex items-center gap-7 pb-3 justify-center text-center">
                        <div className="mt-5">
                            <button
                                onClick={() => {
                                    signOut({ redirect: false });
                                    window.location.href = 'https://www.escuelaing.edu.co/es/';
                                }}
                                type="button"
                                className="inline-flex font-base hover:text-primary outline-none hover:font-bold border-none transition-all justify-center rounded-lg px-4 text-lg"
                            >
                                Cerrar sesión
                            </button>
                        </div>
                        <div className="mt-5">
                            <button
                                type="button"
                                className="inline-flex font-base hover:font-bold outline-none border-none transition-all justify-center rounded-lg px-4 text-lg"
                                onClick={() => {
                                    setShowModal(false);
                                }}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </>
            </Modal>
            <nav className="mx-auto flex items-center justify-between container-class gap-4">
                <Menu validarUser={validarUser} />

                <section className="h-[65px] w-[105px] flex justify-between">
                    <Link href={"/"}>
                        <Image
                            src="/images/ecijg60.png"
                            width={105}
                            height={60}
                            alt="Logo header"
                            className="cursor-pointer"
                            priority={true}
                        />
                    </Link>
                </section>

                {
                    validarUser && (
                        <ul className="hidden lg:flex flex-col items-center justify-center font-medium lg:flex-row ">
                            <li>
                                <Link href={"/"} className="w-full mx-3 transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link className="w-full py-2 mx-3 transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0" href={"/announcement"}>
                                    Aplicantes convocatorias
                                </Link>
                            </li>
                            <li>
                                <Link href={"https://siaci-escuelaing.azurewebsites.net/Account/Login?ReturnUrl=%2F"} className="w-full mx-3 transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
                                    SIACI
                                </Link>
                            </li>
                            <li>
                                <Link href={"https://empleados.escuelaing.edu.co/intraeci/InicioPlanes"} className="w-full py-2 mx-3 transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
                                    Planes
                                </Link>
                            </li>
                            <li>
                                <Link href={"https://empleados.escuelaing.edu.co/intraeci/presupuesto"} className="w-full py-2 mx-3 transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
                                    Presupuesto
                                </Link>
                            </li>
                            <li>
                                <Link href={"https://horus.escuelaing.edu.co/planeacion/"} className="w-full py-2 mx-3 transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
                                    Proyectos
                                </Link>
                            </li>
                            <li>
                                <Link href={"http://copernico.escuelaing.edu.co/software/"} className="w-full py-2 mx-3 transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
                                    Descargas
                                </Link>
                            </li>
                        </ul>
                    )
                }

                {/* Botón de cerrar sesión */}
                <section className="h-[65px] md:w-[105px] flex justify-start items-center gap-4 md:mr-3">

                    {
                        status === 'authenticated' && (
                            <>
                                <button
                                    className="bg-primary h-10 items-center hidden lg:block hover:bg-dark-primary text-off-white justify-center rounded-xl"
                                    onClick={() => setShowModal(true)}
                                >
                                    <i className="bi bi-box-arrow-right sm:text-base text-center px-4"></i>

                                </button>

                                <div className="w-[36px] h-[36px] bg-default rounded-full overflow-hidden flex-center select-none cursor-pointer ring-2 ring-offset-2 ring-offset-default ring-primary mr-9 md:mr-0">
                                    {(data.user?.image) &&
                                        <Image src={data.user.image} loading="lazy" width={36} height={36} alt="User image" />}

                                    {(!data.user?.image && data.user?.name) && <p
                                        className="text-base">{data.user.name?.split(" ")[0][0] + (data.user.name?.split(" ")[data.user.name?.split(" ").length - 1][0])}</p>}
                                </div>
                            </>
                        )
                    }

                </section>
            </nav>
        </header>
    );
};

export default Header;