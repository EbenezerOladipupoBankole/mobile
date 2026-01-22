import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Alert, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors, Shadows } from '../constants/Colors';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { API_URL } from '../constants/Config';
import { useRouter } from 'expo-router';

export default function PostJobScreen() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        companyName: '',
        title: '',
        category: '',
        jobType: 'Full-time',
        description: '',
        requirements: '',
        whatsappContact: '',
    });

    const handleSubmit = async () => {
        if (!form.companyName || !form.title || !form.category || !form.whatsappContact) {
            Alert.alert('Required Fields', 'Please ensure all marked fields are filled.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/jobs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (response.ok) {
                Alert.alert('Success!', 'Your job posting is now pending review.');
                router.back();
            } else {
                const errorData = await response.json();
                Alert.alert('Submission Error', errorData.message || 'Could not post job.');
            }
        } catch (error) {
            console.error('Post job error:', error);
            Alert.alert('Connection Error', 'Please check your internet.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <FontAwesome name="arrow-left" size={18} color={Colors.white} />
                </TouchableOpacity>
                <Text style={styles.title}>Post a Job</Text>
                <Text style={styles.subtitle}>Find your next star employee in Abeokuta.</Text>
            </View>

            <View style={styles.formContainer}>
                <Card style={styles.formCard}>
                    {/* Section: Company Info */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <FontAwesome name="building" size={16} color={Colors.primary} />
                            <Text style={styles.sectionTitle}>Company Information</Text>
                        </View>
                        <Input
                            label="Company Name *"
                            placeholder="Olusola & Associates"
                            value={form.companyName}
                            onChangeText={(text) => setForm({ ...form, companyName: text })}
                            leftIcon={<FontAwesome name="id-badge" size={16} color={Colors.textSecondary} />}
                        />
                    </View>

                    {/* Section: Job Details */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <FontAwesome name="briefcase" size={16} color={Colors.primary} />
                            <Text style={styles.sectionTitle}>Job Details</Text>
                        </View>
                        <Input
                            label="Position Title *"
                            placeholder="e.g. Project Manager"
                            value={form.title}
                            onChangeText={(text) => setForm({ ...form, title: text })}
                            leftIcon={<FontAwesome name="pencil" size={16} color={Colors.textSecondary} />}
                        />
                        <Input
                            label="Job Category *"
                            placeholder="e.g. Administration"
                            value={form.category}
                            onChangeText={(text) => setForm({ ...form, category: text })}
                            leftIcon={<FontAwesome name="folder-open" size={16} color={Colors.textSecondary} />}
                        />
                        <Input
                            label="Job Type *"
                            placeholder="Full-time, Part-time, Remote"
                            value={form.jobType}
                            onChangeText={(text) => setForm({ ...form, jobType: text })}
                            leftIcon={<FontAwesome name="clock-o" size={16} color={Colors.textSecondary} />}
                        />
                        <Input
                            label="Job Description *"
                            placeholder="What will they be doing?"
                            multiline
                            numberOfLines={5}
                            value={form.description}
                            onChangeText={(text) => setForm({ ...form, description: text })}
                        />
                        <Input
                            label="Requirements *"
                            placeholder="Skills and qualifications..."
                            multiline
                            numberOfLines={4}
                            value={form.requirements}
                            onChangeText={(text) => setForm({ ...form, requirements: text })}
                        />
                    </View>

                    {/* Section: Contact */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <FontAwesome name="phone" size={16} color={Colors.primary} />
                            <Text style={styles.sectionTitle}>Contact & Submission</Text>
                        </View>
                        <Input
                            label="WhatsApp Number *"
                            placeholder="234 801 234 5678"
                            keyboardType="phone-pad"
                            value={form.whatsappContact}
                            onChangeText={(text) => setForm({ ...form, whatsappContact: text })}
                            leftIcon={<FontAwesome name="whatsapp" size={18} color={Colors.success} />}
                        />
                        <Text style={styles.hint}>Format: International code (234) + number</Text>
                    </View>

                    <Button
                        title="Publish Job"
                        onPress={handleSubmit}
                        loading={loading}
                        size="large"
                        style={styles.publishBtn}
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
        paddingTop: 60,
        paddingHorizontal: 30,
        paddingBottom: 60,
        backgroundColor: Colors.primary,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        color: Colors.white,
        letterSpacing: -1,
    },
    subtitle: {
        fontSize: 15,
        color: 'rgba(255,255,255,0.6)',
        marginTop: 6,
        lineHeight: 22,
    },
    formContainer: {
        padding: 20,
        marginTop: -40,
    },
    formCard: {
        padding: 24,
        borderRadius: 28,
        ...Shadows.medium,
    },
    section: {
        marginBottom: 32,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: Colors.surfaceSecondary,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
        alignSelf: 'flex-start',
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '800',
        color: Colors.primary,
        marginLeft: 8,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    hint: {
        fontSize: 12,
        color: Colors.textMuted,
        marginBottom: 8,
        marginTop: -10,
        marginLeft: 4,
    },
    publishBtn: {
        marginTop: 10,
        borderRadius: 16,
    },
});
