import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Shadows } from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { Logo } from '../components/Logo';

export default function RoleSelectionScreen() {
    const router = useRouter();

    const selectRole = (role: 'seeker' | 'employer') => {
        // Here you would typically save this to global state or storage
        router.replace('/(tabs)');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Premium Decorative Header */}
            <View style={styles.header}>
                <Logo size={48} iconOnly style={styles.logo} />
                <Text style={styles.greeting}>Start your journey</Text>
                <Text style={styles.question}>Choose the path that fits your goals</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.optionsContainer}>
                    <TouchableOpacity
                        style={styles.optionCard}
                        onPress={() => selectRole('seeker')}
                        activeOpacity={0.7}
                    >
                        <View style={[styles.iconContainer, { backgroundColor: '#3B82F610' }]}>
                            <FontAwesome name="user-circle" size={32} color={Colors.accent} />
                        </View>
                        <View style={styles.textWrapper}>
                            <Text style={styles.optionTitle}>I want to be hired</Text>
                            <Text style={styles.optionDesc}>Explore local opportunities and grow your career in Abeokuta.</Text>
                        </View>
                        <View style={styles.arrowWrapper}>
                            <FontAwesome name="arrow-right" size={12} color={Colors.accent} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.optionCard}
                        onPress={() => selectRole('employer')}
                        activeOpacity={0.7}
                    >
                        <View style={[styles.iconContainer, { backgroundColor: '#10B98110' }]}>
                            <FontAwesome name="briefcase" size={28} color={Colors.success} />
                        </View>
                        <View style={styles.textWrapper}>
                            <Text style={styles.optionTitle}>I want to hire talent</Text>
                            <Text style={styles.optionDesc}>Post jobs and find the best professional talent for your team.</Text>
                        </View>
                        <View style={[styles.arrowWrapper, { backgroundColor: '#10B98115' }]}>
                            <FontAwesome name="arrow-right" size={12} color={Colors.success} />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <View style={styles.infoBox}>
                        <FontAwesome name="shield" size={14} color={Colors.textMuted} />
                        <Text style={styles.infoText}>Secure • Professional • Reliable</Text>
                    </View>
                    <Text style={styles.switchNote}>You can switch roles later in settings</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        backgroundColor: Colors.primary,
        paddingTop: 80,
        paddingHorizontal: 30,
        paddingBottom: 60,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    logo: {
        marginBottom: 32,
    },
    greeting: {
        fontSize: 34,
        fontWeight: '900',
        color: Colors.white,
        letterSpacing: -1,
    },
    question: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.6)',
        marginTop: 8,
        fontWeight: '500',
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        marginTop: -30,
    },
    optionsContainer: {
        gap: 16,
    },
    optionCard: {
        backgroundColor: Colors.white,
        borderRadius: 24,
        padding: 24,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.03)',
        ...Shadows.medium,
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
    },
    textWrapper: {
        flex: 1,
    },
    optionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: Colors.text,
        marginBottom: 4,
    },
    optionDesc: {
        fontSize: 13,
        color: Colors.textSecondary,
        lineHeight: 18,
        fontWeight: '500',
    },
    arrowWrapper: {
        width: 32,
        height: 32,
        borderRadius: 12,
        backgroundColor: '#3B82F615',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 12,
    },
    footer: {
        marginTop: 'auto',
        marginBottom: 40,
        alignItems: 'center',
    },
    infoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surfaceSecondary,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 100,
        marginBottom: 16,
    },
    infoText: {
        fontSize: 12,
        color: Colors.textSecondary,
        fontWeight: '700',
        marginLeft: 8,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    switchNote: {
        fontSize: 13,
        color: Colors.textMuted,
        fontWeight: '500',
    },
});
