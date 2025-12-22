import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { handleAuthError } from '../utils/authErrorHandler';
import FormInput from '../../../shared/components/FormInput';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../../shared/theme';

export const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();



    const validateEmail = (input: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!input) {
            setEmailError('Email is required');
            return false;
        } else if (!emailRegex.test(input)) {
            setEmailError('Pl   ease enter a valid email address');
            return false;
        } else {
            setEmailError('');
            return true;
        }
    };

    const validatePassword = (input: string) => {
        if (!input) {
            setPasswordError('Password is required');
            return false;
        } else {
            setPasswordError('');
            return true;
        }
    };

    const handleLogin = async () => {
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);

        if (!isEmailValid || !isPasswordValid) {
            return;
        }

        setIsLoading(true);
        try {
            await auth().signInWithEmailAndPassword(email, password);
        } catch (error: any) {
            const { message, field } = handleAuthError(error);

            if (field === 'email') {
                setEmailError(message);
            } else if (field === 'password') {
                setPasswordError(message);
            }

            Alert.alert('Login Failed', message);
        } finally {
            setIsLoading(false);
        }
    }


    const handleEmailChange = (text: string) => {
        setEmail(text);
        if (emailError) {
            validateEmail(text);
        }
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
        if (passwordError) {
            validatePassword(text);
        }
    };

    const navigateToSignUp = (): void => {
        navigation.navigate('SignUp' as never);
    }

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.loadingText}>Logging in...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome Back</Text>

            <FormInput
                placeholder="Email"
                value={email}
                onChangeText={handleEmailChange}
                onBlur={() => validateEmail(email)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                error={emailError}
            />

            <FormInput
                placeholder="Password"
                value={password}
                onChangeText={handlePasswordChange}
                onBlur={() => validatePassword(password)}
                secureTextEntry={true}
                error={passwordError}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
                disabled={isLoading}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>Or</Text>
            <TouchableOpacity
                style={styles.signupButton}
                onPress={() => navigateToSignUp()}
                activeOpacity={0.8}
            >
                <Text style={styles.signupText}>Sign Up</Text>
            </TouchableOpacity>
        </View >
    );



}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: colors.background ?? '#ffffff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background ?? '#ffffff',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: colors.text.secondary ?? '#666666',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 40,
        color: colors.text.primary ?? '#000000',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: colors.border ?? '#dddddd',
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        backgroundColor: colors.background ?? '#ffffff',
        color: colors.text.primary ?? '#000000',
    },
    inputError: {
        borderColor: colors.error ?? '#FF3B30',
        borderWidth: 2,
    },
    errorText: {
        color: colors.error ?? '#FF3B30',
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: colors.primary ?? '#007AFF',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: colors.text.inverse ?? '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    orText: {
        marginTop: 12,
        marginBottom: 8,
    },
    signupButton: {
        alignSelf: 'stretch',
        marginTop: 8,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.primary ?? '#007AFF',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupText: {
        color: colors.primary ?? '#007AFF',
        fontSize: 16,
        fontWeight: '600',
    },
});