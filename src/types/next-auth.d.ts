import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            name: string | null | undefined;
            email: string;
            image: string | null | undefined;
            rol_convocatorias: string;
            token: string;
        };
    }
}