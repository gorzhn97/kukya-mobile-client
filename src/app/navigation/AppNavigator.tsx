import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
    return (
        <Stack.Navigator>
            {/* Main app screens will be added here */}
            <Stack.Screen name="Home" component={() => <></>} />
        </Stack.Navigator>
    );
};
