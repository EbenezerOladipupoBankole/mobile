import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '../constants/Colors';

interface LogoProps {
    size?: number;
    style?: ViewStyle;
    iconOnly?: boolean;
    color?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 40, style, iconOnly = false, color = Colors.accent }) => {
    const iconSize = size;
    const borderRadius = size * 0.3;
    const fontSize = size * 0.6;

    return (
        <View style={[styles.container, style]}>
            <View style={[styles.icon, { width: iconSize, height: iconSize, borderRadius, backgroundColor: color }]}>
                <Text style={[styles.letter, { fontSize }]}>V</Text>
            </View>
            {!iconOnly && (
                <Text style={[styles.text, { fontSize: fontSize * 0.9 }]}>ViteHire</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    icon: {
        backgroundColor: Colors.accent,
        alignItems: 'center',
        justifyContent: 'center',
    },
    letter: {
        color: Colors.white,
        fontWeight: '900',
    },
    text: {
        color: Colors.white,
        fontWeight: '900',
        letterSpacing: -0.5,
    },
});
