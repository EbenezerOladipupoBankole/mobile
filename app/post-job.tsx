import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Alert } from 'react-native';
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
                <Text style={styles.title}>Post a Job</Text>
                <Text style={styles.subtitle}>Find your next star employee.</Text>
            </View>

            <View style={styles.formContainer}>
                <Card style={styles.formCard}>
                    <Input
                        label="Company Name *"
                        placeholder="Olusola & Associates"
                        value={form.companyName}
                        onChangeText={(text) => setForm({ ...form, companyName: text })}
                        leftIcon={<FontAwesome name="building-o" size={16} color={Colors.textSecondary} />}
                    />
                    <Input
                        label="Position Title *"
                        placeholder="e.g. Project Manager"
                        value={form.title}
                        onChangeText={(text) => setForm({ ...form, title: text })}
                        leftIcon={<FontAwesome name="id-card-o" size={16} color={Colors.textSecondary} />}
                    />
                    <Input
                        label="Job Category *"
                        placeholder="e.g. Administration"
                        value={form.category}
                        onChangeText={(text) => setForm({ ...form, category: text })}
                    />
                    <Input
                        label="Job Type *"
                        placeholder="Full-time, Part-time, Remote"
                        value={form.jobType}
                        onChangeText={(text) => setForm({ ...form, jobType: text })}
                    />
                    <Input
                        label="Job Description *"
                        placeholder="Describe the role and responsibilities..."
                        multiline
                        numberOfLines={5}
                        value={form.description}
                        onChangeText={(text) => setForm({ ...form, description: text })}
                    />
                    <Input
                        label="Requirements *"
                        placeholder="Qualifications, experience, etc."
                        multiline
                        numberOfLines={4}
                        value={form.requirements}
                        onChangeText={(text) => setForm({ ...form, requirements: text })}
                    />
                    <Input
                        label="WhatsApp Number *"
                        placeholder="234 801 234 5678"
                        keyboardType="phone-pad"
                        value={form.whatsappContact}
                        onChangeText={(text) => setForm({ ...form, whatsappContact: text })}
                        leftIcon={<FontAwesome name="whatsapp" size={18} color={Colors.success} />}
                    />
                    <Text style={styles.hint}>Format: International code (234) + number</Text>

                    <Button
                        title="Publish Job"
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
    hint: {
        fontSize: 12,
        color: Colors.textMuted,
        marginBottom: 24,
        marginTop: -10,
        marginLeft: 4,
    },
});
