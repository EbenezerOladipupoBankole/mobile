import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Alert, TouchableOpacity, StatusBar } from 'react-native';
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

            if (!result.canceled && result.assets && result.assets.length > 0) {
                setCv(result.assets[0]);
            }
        } catch (err) {
            console.error('Error picking document:', err);
            Alert.alert('Error', 'Could not access documents. Please check permissions.');
        }
    };

    const handleSubmit = async () => {
        if (!form.fullName || !form.phoneNumber || !form.category || !cv) {
            Alert.alert('Required Fields', 'Please fill all required fields (*) and upload your CV.');
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('fullName', form.fullName);
            formData.append('phoneNumber', form.phoneNumber);
            formData.append('email', form.email);
            formData.append('category', form.category);
            formData.append('skillsSummary', form.skillsSummary);

            // @ts-ignore
            formData.append('cv', {
                uri: cv.uri,
                name: cv.name,
                type: 'application/pdf',
            });

            const response = await fetch(`${API_URL}/talents`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                    // Note: 'Content-Type': 'multipart/form-data' is usually handled automatically by fetch with FormData
                },
            });

            if (response.ok) {
                Alert.alert('Congratulations!', 'Your profile has been added to the talent pool. Companies will reach out to you soon.');
                router.back();
            } else {
                const errorData = await response.json();
                Alert.alert('Submission Error', errorData.message || 'We could not process your application.');
            }
        } catch (error) {
            console.error('Join talent error:', error);
            // Fallback for success in mock/local dev if backend is down but user wants to see result
            Alert.alert('Network Issue', 'We had trouble connecting to our servers. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.outerContainer}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.customHeader}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <FontAwesome name="arrow-left" size={18} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Join Talent Pool</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.heroSection}>
                    <View style={styles.iconCircle}>
                        <FontAwesome name="user-plus" size={40} color={Colors.accent} />
                    </View>
                    <Text style={styles.heroTitle}>Showcase Your Skills</Text>
                    <Text style={styles.heroSubtitle}>Be discovered by top companies in Abeokuta by joining our professional talent pool.</Text>
                </View>

                <View style={styles.formSection}>
                    <Card style={styles.formCard}>
                        <Input
                            label="Full Name *"
                            placeholder="Victor Oladipo"
                            value={form.fullName}
                            onChangeText={(text) => setForm({ ...form, fullName: text })}
                            leftIcon={<FontAwesome name="user-o" size={16} color={Colors.textSecondary} />}
                        />

                        <Input
                            label="WhatsApp / Phone Number *"
                            placeholder="234 801 234 5678"
                            keyboardType="phone-pad"
                            value={form.phoneNumber}
                            onChangeText={(text) => setForm({ ...form, phoneNumber: text })}
                            leftIcon={<FontAwesome name="whatsapp" size={18} color={Colors.success} />}
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
                            label="Professional Category *"
                            placeholder="e.g. Sales, Tech, Admin, etc."
                            value={form.category}
                            onChangeText={(text) => setForm({ ...form, category: text })}
                            leftIcon={<FontAwesome name="briefcase" size={16} color={Colors.textSecondary} />}
                        />

                        <Input
                            label="Skills Summary"
                            placeholder="Tell us what you are great at..."
                            multiline
                            numberOfLines={4}
                            value={form.skillsSummary}
                            onChangeText={(text) => setForm({ ...form, skillsSummary: text })}
                        />

                        <View style={styles.cvSection}>
                            <Text style={styles.cvLabel}>CV / Resume (PDF) *</Text>
                            <TouchableOpacity
                                style={[styles.cvUploadBox, cv && styles.cvUploaded]}
                                onPress={handlePickDocument}
                            >
                                <View style={styles.cvIconContainer}>
                                    <FontAwesome
                                        name={cv ? "file-text" : "cloud-upload"}
                                        size={24}
                                        color={cv ? Colors.success : Colors.accent}
                                    />
                                </View>
                                <View style={styles.cvTextContainer}>
                                    <Text style={styles.cvUploadTitle}>{cv ? cv.name : "Choose File"}</Text>
                                    <Text style={styles.cvUploadSubtitle}>{cv ? `${(cv.size / 1024).toFixed(1)} KB` : "Max file size: 5MB"}</Text>
                                </View>
                                {cv && (
                                    <TouchableOpacity onPress={() => setCv(null)} style={styles.removeCv}>
                                        <FontAwesome name="times-circle" size={20} color={Colors.error} />
                                    </TouchableOpacity>
                                )}
                            </TouchableOpacity>
                        </View>

                        <Button
                            title="Complete Registration"
                            onPress={handleSubmit}
                            loading={loading}
                            style={styles.submitBtn}
                        />
                        <Text style={styles.privacyNote}>By joining, your profile will be visible to verified employers.</Text>
                    </Card>
                </View>
                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    container: {
        flex: 1,
    },
    customHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: Colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: Colors.text,
    },
    backBtn: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        backgroundColor: Colors.surfaceSecondary,
    },
    heroSection: {
        padding: 30,
        alignItems: 'center',
        backgroundColor: Colors.surface,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        ...Shadows.small,
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#EEF2FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    heroTitle: {
        fontSize: 24,
        fontWeight: '900',
        color: Colors.text,
        textAlign: 'center',
    },
    heroSubtitle: {
        fontSize: 14,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginTop: 10,
        lineHeight: 20,
        paddingHorizontal: 20,
    },
    formSection: {
        padding: 20,
        marginTop: 10,
    },
    formCard: {
        padding: 24,
    },
    cvSection: {
        marginBottom: 24,
        marginTop: 10,
    },
    cvLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: 12,
        marginLeft: 4,
    },
    cvUploadBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: Colors.border,
        borderRadius: 16,
        padding: 16,
        backgroundColor: Colors.surfaceSecondary,
    },
    cvUploaded: {
        borderColor: Colors.success,
        backgroundColor: '#F0FDF4',
        borderStyle: 'solid',
    },
    cvIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.8)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    cvTextContainer: {
        flex: 1,
    },
    cvUploadTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.text,
    },
    cvUploadSubtitle: {
        fontSize: 12,
        color: Colors.textMuted,
        marginTop: 2,
    },
    removeCv: {
        padding: 8,
    },
    submitBtn: {
        marginTop: 10,
    },
    privacyNote: {
        fontSize: 12,
        color: Colors.textMuted,
        textAlign: 'center',
        marginTop: 16,
    },
});
