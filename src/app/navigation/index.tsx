import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigator } from './AuthNavigator';
import { AppNavigator } from './AppNavigator';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { SplashScreen } from '../../shared/components/SplashScreen';

export const RootNavigator = () => {

    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
    const [initializing, setInitializing] = useState(true);

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(u => {
            setUser(u);
            setInitializing(false);
        });
        return unsubscribe;
    }, []);

    if (initializing) {
        return <SplashScreen />;
    }

    return (
        <NavigationContainer>
            {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
};
