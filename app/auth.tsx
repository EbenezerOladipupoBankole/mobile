import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { FontAwesome } from '@expo/vector-icons';

export default function AuthScreen() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleAuth = () => {
        setLoading(true);
        // Simulate auth
        setTimeout(() => {
            setLoading(false);
            router.replace('/role-selection');
        }, 1500);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <StatusBar barStyle="dark-content" />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <View style={styles.logoCircle}>
                        <FontAwesome name="flash" size={32} color={Colors.white} />
                    </View>
                    <Text style={styles.title}>{isLogin ? 'Welcome Back' : 'Create Account'}</Text>
                    <Text style={styles.subtitle}>
                        {isLogin ? 'Sign in to continue your career journey' : 'Join Abeokuta\'s premier job marketplace'}
                    </Text>
                </View>

                <View style={styles.form}>
                    {!isLogin && (
                        <Input
                            placeholder="Full Name"
                            leftIcon={<FontAwesome name="user-o" size={16} color={Colors.textMuted} />}
                        />
                    )}
                    <Input
                        placeholder="Email Address"
                        keyboardType="email-address"
                        leftIcon={<FontAwesome name="envelope-o" size={16} color={Colors.textMuted} />}
                    />
                    <Input
                        placeholder="Password"
                        secureTextEntry
                        leftIcon={<FontAwesome name="lock" size={16} color={Colors.textMuted} />}
                    />

                    {isLogin && (
                        <TouchableOpacity style={styles.forgotBtn}>
                            <Text style={styles.forgotText}>Forgot Password?</Text>
                        </TouchableOpacity>
                    )}

                    <Button
                        title={isLogin ? 'Sign In' : 'Create Account'}
                        onPress={handleAuth}
                        loading={loading}
                        size="large"
                        style={styles.authBtn}
                    />

                    <View style={styles.socialContainer}>
                        <Text style={styles.socialTitle}>Or continue with</Text>
                        <View style={styles.socialButtons}>
                            <TouchableOpacity style={styles.socialBtn}>
                                <FontAwesome name="google" size={20} color={Colors.text} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialBtn}>
                                <FontAwesome name="apple" size={20} color={Colors.text} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                    </Text>
                    <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                        <Text style={styles.toggleText}>{isLogin ? 'Sign Up' : 'Sign In'}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 24,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logoCircle: {
        width: 64,
        height: 64,
        borderRadius: 20,
        backgroundColor: Colors.accent,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        color: Colors.text,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        color: Colors.textSecondary,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    form: {
        width: '100%',
    },
    forgotBtn: {
        alignSelf: 'flex-end',
        marginBottom: 24,
    },
    forgotText: {
        color: Colors.accent,
        fontWeight: '600',
        fontSize: 14,
    },
    authBtn: {
        marginVertical: 10,
    },
    socialContainer: {
        marginTop: 32,
        alignItems: 'center',
    },
    socialTitle: {
        fontSize: 14,
        color: Colors.textMuted,
        marginBottom: 16,
    },
    socialButtons: {
        flexDirection: 'row',
        gap: 16,
    },
    socialBtn: {
        width: 56,
        height: 56,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.border,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 40,
    },
    footerText: {
        color: Colors.textSecondary,
        fontSize: 14,
    },
    toggleText: {
        color: Colors.accent,
        fontWeight: '700',
        fontSize: 14,
    },
});
