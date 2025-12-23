import { createContext, useState } from 'react';
import Loading from '../components/loading/loading';

export const LoadingContext = createContext();

export function LoadingProvider({ children }) {
    const [loading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {loading && <Loading />}
            {children}
        </LoadingContext.Provider>
    );
}
