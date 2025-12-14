import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme';

interface NavbarProps {
    pageTitle: string;
    onNotificationPress?: () => void;
    onMenuPress?: () => void;
}

export const Navbar = ({
    pageTitle,
    onNotificationPress,
    onMenuPress
}: NavbarProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.leftSection}>
                <Text style={styles.greeting}>Welcome back!</Text>
                <Text style={styles.pageTitle}>{pageTitle}</Text>
            </View>

            <View style={styles.rightSection}>
                {onNotificationPress && (
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={onNotificationPress}
                    >
                        <Text style={styles.iconText}>N</Text>
                    </TouchableOpacity>
                )}

                {onMenuPress && (
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={onMenuPress}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.iconText}>M</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: colors.background,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    leftSection: {
        flex: 1,
    },
    greeting: {
        fontSize: 12,
        color: colors.text.secondary,
        marginBottom: 2,
    },
    pageTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: colors.text.primary,
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconText: {
        fontSize: 20,
        color: colors.text.primary,
    },
});