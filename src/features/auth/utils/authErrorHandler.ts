import { FirebaseAuthTypes } from '@react-native-firebase/auth';

interface AuthErrorResult {
    message: string;
    field?: 'email' | 'password' | 'general';
}

const AUTH_ERROR_MESSAGES: Record<string, AuthErrorResult> = {
    'auth/invalid-email': {
        message: 'Invalid email address',
        field: 'email',
    },
    'auth/user-disabled': {
        message: 'This account has been disabled',
        field: 'general',
    },
    'auth/user-not-found': {
        message: 'No account found with this email',
        field: 'email',
    },
    'auth/wrong-password': {
        message: 'Incorrect password',
        field: 'password',
    },
    'auth/invalid-credential': {
        message: 'Invalid email or password',
        field: 'general',
    },
    'auth/too-many-requests': {
        message: 'Too many failed attempts. Please try again later',
        field: 'general',
    },
    'auth/network-request-failed': {
        message: 'Network error. Please check your connection',
        field: 'general',
    },
    'auth/weak-password': {
        message: 'Password is too weak',
        field: 'password',
    },
    'auth/email-already-in-use': {
        message: 'Email is already registered',
        field: 'email',
    },
};

export const handleAuthError = (error: any): AuthErrorResult => {
    const errorCode = error?.code;

    if (errorCode && AUTH_ERROR_MESSAGES[errorCode]) {
        return AUTH_ERROR_MESSAGES[errorCode];
    }

    return {
        message: error?.message || 'An unexpected error occurred',
        field: 'general',
    };
};
