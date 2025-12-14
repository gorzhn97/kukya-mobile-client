import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Navbar } from '../../shared/components/Navbar';
import { HouseholdsList } from '../../features/households/screens/HouseholdsList/HouseholdsList';
import { Modal, Text, View } from 'react-native';

const Stack = createNativeStackNavigator();



const AppNavigatorContent = () => {
    const currentRouteName = 'asd';
    const pageTitle = currentRouteName || 'Home';

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <Navbar
                pageTitle={pageTitle}
                onNotificationPress={() => console.log('Notifications pressed')}
                onMenuPress={() => setIsMenuOpen(!isMenuOpen)}
            />
            <Modal
                visible={isMenuOpen}
                animationType="slide"

                onRequestClose={() => setIsMenuOpen(false)}
            >

                <View>
                    <Text>Menu Content</Text>
                </View>

            </Modal>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="HouseholdsList" component={HouseholdsList} />
            </Stack.Navigator>
        </>
    );
};

export const AppNavigator = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppNavigatorContent />
        </SafeAreaView>
    );
};
