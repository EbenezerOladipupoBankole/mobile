import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { Colors, Shadows } from '../constants/Colors';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'small' | 'medium' | 'large';
    loading?: boolean;
    disabled?: boolean;
    icon?: React.ReactNode;
}

export const Button = ({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    loading,
    disabled,
    icon
}: ButtonProps) => {
    const containerStyle = [
        styles.button,
        styles[size],
        styles[variant],
        (disabled || loading) && styles.disabled,
        variant === 'primary' && !disabled && !loading && Shadows.small,
    ];

    const textStyle = [
        styles.text,
        styles[`${size}Text`],
        styles[`${variant}Text`],
        disabled && styles.disabledText,
    ];

    return (
        <TouchableOpacity
            style={containerStyle as any}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'primary' ? Colors.white : Colors.accent} />
            ) : (
                <View style={styles.content}>
                    {icon && <View style={styles.iconContainer}>{icon}</View>}
                    <Text style={textStyle}>{title}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        marginRight: 8,
    },
    // Sizes
    small: { paddingVertical: 8, paddingHorizontal: 16 },
    medium: { paddingVertical: 14, paddingHorizontal: 24 },
    large: { paddingVertical: 18, paddingHorizontal: 32 },

    // Variants
    primary: { backgroundColor: Colors.accent },
    secondary: { backgroundColor: Colors.primary },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: Colors.accent
    },
    ghost: { backgroundColor: 'transparent' },

    disabled: { opacity: 0.5 },

    // Text Styles
    text: { fontWeight: '700', letterSpacing: 0.5 },
    smallText: { fontSize: 13 },
    mediumText: { fontSize: 16 },
    largeText: { fontSize: 18 },

    primaryText: { color: Colors.white },
    secondaryText: { color: Colors.white },
    outlineText: { color: Colors.accent },
    ghostText: { color: Colors.accent },
    disabledText: { color: Colors.textMuted },
});
