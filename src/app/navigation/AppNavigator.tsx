import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Navbar } from '../../shared/components/Navbar';
import { HouseholdsList } from '../../features/households/screens/HouseholdsList/HouseholdsList';
import { Modal, Text, Touchable, TouchableOpacity, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();



const AppNavigatorContent = () => {
    const currentRouteName = 'asd';
    const pageTitle = currentRouteName || 'Home';

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigation = useNavigation()
    const signOut = () => {
        try {
            auth().signOut();
            navigation.navigate('Login' as never);
        }
        catch (error) {
            console.log('Error signing out: ', error);
        }

    }

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
                    <TouchableOpacity onPress={() =>
                        signOut()
                    }>
                        <Text>Sign out</Text>
                    </TouchableOpacity>
                </View>

            </Modal >
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
