import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

interface FormInputProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    secureTextEntry?: boolean;
    keyboardType?: any;
    onBlur?: () => void;
    error?: string;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    autoCorrect?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
    value,
    onChangeText,
    placeholder,
    secureTextEntry = false,
    keyboardType = 'default',
    onBlur,
    error,
    autoCapitalize = 'none',
    autoCorrect = false,
}) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, error ? styles.inputError : null]}
                placeholder={placeholder}
                placeholderTextColor="#999"
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                onBlur={onBlur}
                autoCapitalize={autoCapitalize}
                autoCorrect={autoCorrect}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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
});

export default FormInput;
