import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { handleAuthError } from '../utils/authErrorHandler';

export const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);



    const validateEmail = (input: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!input) {
            setEmailError('Email is required');
            return false;
        } else if (!emailRegex.test(input)) {
            setEmailError('Please enter a valid email address');
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

            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, emailError ? styles.inputError : null]}
                    placeholder="Email"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={handleEmailChange}
                    onBlur={() => validateEmail(email)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, passwordError ? styles.inputError : null]}
                    placeholder="Password"
                    placeholderTextColor="#999"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={handlePasswordChange}
                    onBlur={() => validatePassword(password)}
                />
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
                disabled={isLoading}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#666',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 40,
        color: '#000',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        backgroundColor: '#fff',
        color: '#000',
    },
    inputError: {
        borderColor: '#FF3B30',
        borderWidth: 2,
    },
    errorText: {
        color: '#FF3B30',
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#007AFF',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});