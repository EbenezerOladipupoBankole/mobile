import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Shadows } from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function RoleSelectionScreen() {
    const router = useRouter();

    const selectRole = (role: 'seeker' | 'employer') => {
        // Here you would typically save this to global state or storage
        router.replace('/(tabs)');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.content}>
                <Text style={styles.greeting}>Welcome to ViteHire</Text>
                <Text style={styles.question}>Select your path to get started</Text>

                <View style={styles.optionsContainer}>
                    <TouchableOpacity
                        style={[styles.optionCard, { borderLeftColor: '#3B82F6' }]}
                        onPress={() => selectRole('seeker')}
                    >
                        <View style={[styles.iconWrapper, { backgroundColor: '#3B82F615' }]}>
                            <FontAwesome name="user-md" size={32} color="#3B82F6" />
                        </View>
                        <View style={styles.textWrapper}>
                            <Text style={styles.optionTitle}>Hire Me</Text>
                            <Text style={styles.optionDesc}>I am looking for job opportunities in Abeokuta.</Text>
                        </View>
                        <FontAwesome name="chevron-right" size={14} color={Colors.border} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.optionCard, { borderLeftColor: '#10B981' }]}
                        onPress={() => selectRole('employer')}
                    >
                        <View style={[styles.iconWrapper, { backgroundColor: '#10B98115' }]}>
                            <FontAwesome name="building" size={28} color="#10B981" />
                        </View>
                        <View style={styles.textWrapper}>
                            <Text style={styles.optionTitle}>Post Jobs & Talent</Text>
                            <Text style={styles.optionDesc}>I want to find skilled professionals for my team.</Text>
                        </View>
                        <FontAwesome name="chevron-right" size={14} color={Colors.border} />
                    </TouchableOpacity>
                </View>

                <View style={styles.infoBox}>
                    <FontAwesome name="info-circle" size={16} color={Colors.textMuted} />
                    <Text style={styles.infoText}>You can switch your role anytime in the profile settings.</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: 'center',
    },
    content: {
        padding: 24,
    },
    greeting: {
        fontSize: 32,
        fontWeight: '900',
        color: Colors.text,
        letterSpacing: -0.5,
    },
    question: {
        fontSize: 16,
        color: Colors.textSecondary,
        marginTop: 8,
        marginBottom: 48,
    },
    optionsContainer: {
        gap: 20,
    },
    optionCard: {
        backgroundColor: Colors.white,
        borderRadius: 20,
        padding: 24,
        flexDirection: 'row',
        alignItems: 'center',
        borderLeftWidth: 6,
        ...Shadows.medium,
    },
    iconWrapper: {
        width: 64,
        height: 64,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
    },
    textWrapper: {
        flex: 1,
    },
    optionTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: Colors.text,
        marginBottom: 4,
    },
    optionDesc: {
        fontSize: 14,
        color: Colors.textSecondary,
        lineHeight: 20,
    },
    infoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 48,
        paddingHorizontal: 30,
    },
    infoText: {
        fontSize: 12,
        color: Colors.textMuted,
        marginLeft: 10,
        textAlign: 'center',
        lineHeight: 18,
    },
});
