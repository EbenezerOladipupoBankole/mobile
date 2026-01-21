import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { FontAwesome } from '@expo/vector-icons';
import { Colors, Shadows } from '../constants/Colors';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { API_URL } from '../constants/Config';
import { useRouter } from 'expo-router';

export default function JoinTalentScreen() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        category: '',
        skillsSummary: '',
    });
    const [cv, setCv] = useState<any>(null);

    const handlePickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
                copyToCacheDirectory: true,
            });

            if (!result.canceled) {
                setCv(result.assets[0]);
            }
        } catch (err) {
            console.error('Error picking document:', err);
        }
    };

    const handleSubmit = async () => {
        if (!form.fullName || !form.phoneNumber || !form.category || !cv) {
            Alert.alert('Incomplete Form', 'Please fill all required fields and upload your CV.');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('fullName', form.fullName);
        formData.append('phoneNumber', form.phoneNumber);
        formData.append('email', form.email);
        formData.append('category', form.category);
        formData.append('skillsSummary', form.skillsSummary);
        formData.append('cv', {
            uri: cv.uri,
            name: cv.name,
            type: 'application/pdf',
        } as any);

        try {
            const response = await fetch(`${API_URL}/talents`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.ok) {
                Alert.alert('Welcome!', 'Submission successful. You are now in the talent pool!');
                router.back();
            } else {
                const errorData = await response.json();
                Alert.alert('Upload Failed', errorData.message || 'Something went wrong.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            Alert.alert('Network Error', 'Check your internet connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <Text style={styles.title}>Join Talent Pool</Text>
                <Text style={styles.subtitle}>Let great companies find you.</Text>
            </View>

            <View style={styles.formContainer}>
                <Card style={styles.formCard}>
                    <Input
                        label="Full Name *"
                        placeholder="Victor Abeokuta"
                        value={form.fullName}
                        onChangeText={(text) => setForm({ ...form, fullName: text })}
                        leftIcon={<FontAwesome name="user-o" size={16} color={Colors.textSecondary} />}
                    />
                    <Input
                        label="Phone Number *"
                        placeholder="080 000 0000"
                        keyboardType="phone-pad"
                        value={form.phoneNumber}
                        onChangeText={(text) => setForm({ ...form, phoneNumber: text })}
                        leftIcon={<FontAwesome name="phone" size={16} color={Colors.textSecondary} />}
                    />
                    <Input
                        label="Email Address"
                        placeholder="victor@example.com"
                        keyboardType="email-address"
                        value={form.email}
                        onChangeText={(text) => setForm({ ...form, email: text })}
                        leftIcon={<FontAwesome name="envelope-o" size={16} color={Colors.textSecondary} />}
                    />
                    <Input
                        label="Industry/Category *"
                        placeholder="e.g. Graphic Design"
                        value={form.category}
                        onChangeText={(text) => setForm({ ...form, category: text })}
                        leftIcon={<FontAwesome name="briefcase" size={16} color={Colors.textSecondary} />}
                    />
                    <Input
                        label="Skills Overview *"
                        placeholder="What are you great at?"
                        multiline
                        numberOfLines={4}
                        value={form.skillsSummary}
                        onChangeText={(text) => setForm({ ...form, skillsSummary: text })}
                    />

                    <View style={styles.uploadSection}>
                        <Text style={styles.label}>CV / Resume (PDF) *</Text>
                        <TouchableOpacity
                            style={[styles.uploadBox, cv && styles.uploadBoxActive]}
                            onPress={handlePickDocument}
                        >
                            <FontAwesome
                                name={cv ? "check-circle" : "cloud-upload"}
                                size={24}
                                color={cv ? Colors.success : Colors.accent}
                            />
                            <Text style={styles.uploadText}>
                                {cv ? cv.name : "Select your PDF file"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Button
                        title="Join Now"
                        onPress={handleSubmit}
                        loading={loading}
                        style={{ marginTop: 10 }}
                    />
                </Card>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        padding: 30,
        backgroundColor: Colors.primary,
    },
    title: {
        fontSize: 26,
        fontWeight: '900',
        color: Colors.white,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.textMuted,
        marginTop: 6,
    },
    formContainer: {
        padding: 20,
        marginTop: -20,
    },
    formCard: {
        padding: 24,
        ...Shadows.medium,
    },
    label: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: 8,
    },
    uploadSection: {
        marginBottom: 24,
    },
    uploadBox: {
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: Colors.border,
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.surfaceSecondary,
    },
    uploadBoxActive: {
        borderColor: Colors.success,
        backgroundColor: '#F0FDF4',
    },
    uploadText: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: '600',
        color: Colors.textSecondary,
        textAlign: 'center',
    },
});
