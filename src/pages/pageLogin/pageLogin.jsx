import { useState } from "react";

import FormLoginUser from "../../components/formUser/formUser.jsx";
import FormNewUser from "../../components/formNewUser/formNewUser.jsx";

export default function PageLogin() {
    const [isNew, setIsNew] = useState(false);

    return (
        <>
            {isNew ? (
                <FormNewUser onBackToLogin={() => setIsNew(false)} />
            ) : (
                <FormLoginUser onGoToRegister={() => setIsNew(true)} />
            )}
        </>
    );
}