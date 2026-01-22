import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, StatusBar, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { FontAwesome } from '@expo/vector-icons';
import { Logo } from '../components/Logo';
import { auth } from '../utils/firebase';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile
} from '@firebase/auth';


export default function AuthScreen() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAuth = async () => {
        if (!email || !password || (!isLogin && !fullName)) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            if (isLogin) {
                // Sign In
                await signInWithEmailAndPassword(auth, email.trim(), password);
                router.replace('/role-selection');
            } else {
                // Sign Up
                const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
                // Update profile with full name
                await updateProfile(userCredential.user, {
                    displayName: fullName.trim()
                });
                router.replace('/role-selection');
            }
        } catch (error: any) {
            console.error(error);
            let errorMessage = 'An error occurred during authentication.';

            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'This email is already in use. Try signing in instead.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email address format.';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'Password should be at least 6 characters.';
            } else if (error.code === 'auth/invalid-credential') {
                errorMessage = isLogin
                    ? 'Invalid email or password. Please check your details and try again.'
                    : 'The provided credentials are not valid. Please ensure you are using a valid email.';
            } else if (error.code === 'auth/operation-not-allowed') {
                errorMessage = 'Email/Password accounts are not enabled in the Firebase Console. Please check your project settings.';
            }

            Alert.alert('Authentication Failed', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <StatusBar barStyle="dark-content" />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Logo size={64} iconOnly style={styles.logo} />
                    <Text style={styles.title}>{isLogin ? 'Welcome Back' : 'Create Account'}</Text>
                    <Text style={styles.subtitle}>
                        {isLogin ? 'Sign in to continue your career journey' : 'Join Abeokuta\'s premier job marketplace'}
                    </Text>
                </View>

                <View style={styles.form}>
                    {!isLogin && (
                        <Input
                            placeholder="Full Name"
                            value={fullName}
                            onChangeText={setFullName}
                            leftIcon={<FontAwesome name="user-o" size={16} color={Colors.textMuted} />}
                        />
                    )}
                    <Input
                        placeholder="Email Address"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        leftIcon={<FontAwesome name="envelope-o" size={16} color={Colors.textMuted} />}
                    />
                    <Input
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
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
    logo: {
        marginBottom: 20,
        shadowColor: Colors.accent,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
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
