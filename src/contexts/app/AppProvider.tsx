import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import auth from '@react-native-firebase/auth';



export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const currentUser = auth().currentUser;
    const [households, setHouseholds] = useState<any[]>([]);

    useEffect(() => {
        const init = () => {
            if (currentUser) {
                const fetchedHouseholds = [
                    { id: 1, name: 'Household 1' },
                    { id: 2, name: 'Household 2' },
                ];
                setHouseholds(fetchedHouseholds);
            }
        }
        init();
    }, [])

    return (
        <AppContext.Provider value={{ households, setHouseholds }}>
            {children}
        </AppContext.Provider>
    );

}