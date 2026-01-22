import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Animated, StatusBar, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Shadows } from '../constants/Colors';
import { Logo } from '../components/Logo';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '../utils/firebase';
import { FontAwesome } from '@expo/vector-icons';

export default function SplashScreen() {
    const router = useRouter();
    const fadeAnim = new Animated.Value(0);
    const scaleAnim = new Animated.Value(0.85);

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1200,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4,
                useNativeDriver: true,
            }),
        ]).start();

        let timer: any; // Using any for compatibility across environments

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            timer = setTimeout(() => {
                if (user) {
                    router.replace('/role-selection');
                } else {
                    router.replace('/onboarding');
                }
            }, 4000); // Slightly longer to allow the user to see the splash
        });

        return () => {
            unsubscribe();
            if (timer) clearTimeout(timer);
        };
    }, []);

    const handleManualProceed = () => {
        const user = auth.currentUser;
        if (user) {
            router.replace('/role-selection');
        } else {
            router.replace('/onboarding');
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
                <Logo size={140} iconOnly style={{ marginBottom: 20 }} />
                <Text style={styles.brandName}>ViteHire</Text>
                <Text style={styles.tagline}>Abeokuta's Talent Hub</Text>
            </Animated.View>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.getStartedBtn}
                    onPress={handleManualProceed}
                    activeOpacity={0.8}
                >
                    <Text style={styles.getStartedText}>Get Started</Text>
                    <FontAwesome name="arrow-right" size={16} color={Colors.primary} />
                </TouchableOpacity>
                <Text style={styles.footerText}>Professional • Fast • Reliable</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        alignItems: 'center',
    },
    brandName: {
        fontSize: 48,
        fontWeight: '900',
        color: Colors.white,
        letterSpacing: -1.5,
    },
    tagline: {
        fontSize: 16,
        color: Colors.textMuted,
        fontWeight: '600',
        marginTop: 8,
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
    footer: {
        position: 'absolute',
        bottom: 50,
    },
    footerText: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1,
        marginTop: 20,
    },
    getStartedBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        paddingHorizontal: 28,
        paddingVertical: 14,
        borderRadius: 20,
        ...Shadows.medium,
    },
    getStartedText: {
        color: Colors.primary,
        fontSize: 16,
        fontWeight: '800',
        marginRight: 10,
    },
});
