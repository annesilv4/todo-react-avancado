import FormTarefa from "../../components/formTarefa/formTarefa";
import FormEditTarefa from "../../components/formEditTarefa/formEditTarefa";
import { useState } from "react";

export default function Tarefa() {
    const [isAdd, setIsAdd] = useState(false);

    return (
        <>
            {isAdd ? (
                <FormTarefa onBackToTarefa={() => setIsAdd(false)} />
            ) : (
                <FormEditTarefa onBackToTarefa={() => setIsAdd(false)} />
            )}
        </>
    );
}
