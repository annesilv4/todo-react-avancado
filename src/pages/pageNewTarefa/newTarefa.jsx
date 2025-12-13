import FormTarefa from "../../components/formTarefa/formTarefa";
import FormEditTarefa from "../../components/formEditTarefa/formEditTarefa";
import { useState } from "react";
import { createTask } from "../../api/apiTarefa";

export default function Tarefa() {
    const [isAdd, setIsAdd] = useState(false);

    return (
        <>
            {isAdd ? (
                <FormTarefa onBackToTarefa={() => setIsAdd(false)} onSubmit={createTask} />
            ) : (
                <FormEditTarefa onBackToTarefa={() => setIsAdd(false)} />
            )}
        </>
    );
}
