import { Card } from "@nextui-org/card";
import { Button } from "@nextui-org/react";
import { People } from "@/types/d";

const PersonCard = ({ person, selected }: {
    person: People,
    selected: (person: People, action: boolean, contentModal: "person" | "director" | "edit") => void
}) => {
    return (
        <Card className="p-4 bg-default-white">
            <div className="flex gap-4 justify-between items-center">
                <div>
                    <p>{person.nombre}</p>
                </div>
                <div>
                    <Button title="Seleccionar" onClick={() => {
                        selected(person, false, "edit")
                    }} isIconOnly color="primary">
                        <i className="bi bi-person-plus-fill text-xl"></i>
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default PersonCard;