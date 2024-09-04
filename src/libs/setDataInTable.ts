import { Announcement } from "../types/d";
import { formatDate } from "@/libs/functionsStrings";

const range = (len: number) => {
    const arr: Array<number> = [];
    for (let i: number = 0; i < len; i++) {
        arr.push(i);
    }
    return arr;
};

const printConvocatoria = (
    data: Announcement[],
    position: number
): Announcement => {
    return {
        descon: "",
        idcon: String(data[position].idcon),
        nombre: String(data[position].nombre),
        ffin: formatDate(String(data[position].ffin)),
    };
};

export function setConvocatoriaInTable(data: Announcement[]) {
    const setDataInTableLevel = (): Announcement[] => {
        return range(data.length).map((d): Announcement => {
            return printConvocatoria(data, d);
        });
    };

    return setDataInTableLevel();
}