import React from 'react';
import { StyleSheet, ScrollView, View, Text, Linking, Alert, StatusBar, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { Colors, Shadows } from '../../constants/Colors';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';

export default function JobDetailsScreen() {
    const { id, title, company, description, contact } = useLocalSearchParams();
    const router = useRouter();

    const handleApply = () => {
        const whatsappUrl = `whatsapp://send?phone=${contact}&text=Hello, I am interested in the ${title} position at ${company}. I found this on ViteHire.`;

        Linking.canOpenURL(whatsappUrl)
            .then((supported) => {
                if (supported) {
                    return Linking.openURL(whatsappUrl);
                } else {
                    Alert.alert('WhatsApp Required', 'Please install WhatsApp to apply for this job.');
                }
            })
            .catch((err) => console.error('An error occurred', err));
    };

    return (
        <View style={styles.outerContainer}>
            <StatusBar barStyle="dark-content" />

            {/* Custom Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <FontAwesome name="arrow-left" size={18} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Job Details</Text>
                <TouchableOpacity style={styles.backBtn}>
                    <FontAwesome name="share-alt" size={18} color={Colors.text} />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    {/* Hero Section */}
                    <Card style={styles.mainCard}>
                        <View style={styles.logoContainer}>
                            <FontAwesome name="briefcase" size={30} color={Colors.accent} />
                        </View>
                        <Text style={styles.jobTitle}>{title || 'Administrative Manager'}</Text>
                        <Text style={styles.companyName}>{company || 'Olusola & Associates'}</Text>

                        <View style={styles.infoRow}>
                            <View style={styles.infoItem}>
                                <FontAwesome name="map-marker" size={14} color={Colors.textSecondary} />
                                <Text style={styles.infoText}>Abeokuta, NG</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <FontAwesome name="clock-o" size={14} color={Colors.textSecondary} />
                                <Text style={styles.infoText}>Full-time</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <FontAwesome name="money" size={14} color={Colors.success} />
                                <Text style={[styles.infoText, { color: Colors.success }]}>₦120k+</Text>
                            </View>
                        </View>
                    </Card>

                    {/* Job Details Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Job Description</Text>
                        <Text style={styles.descriptionText}>
                            {description || 'We are looking for a highly motivated and detail-oriented Administrative Manager to oversee our office operations. The ideal candidate will be responsible for managing staff, coordinating schedules, and ensuring the smooth day-to-day functioning of our Abeokuta office.'}
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Key Responsibilities</Text>
                        {[
                            'Oversee daily office operations and staff performance.',
                            'Manage office budgets and supplies.',
                            'Coordinate internal and external communications.',
                            'Ensure compliance with company policies and procedures.',
                            'Handle administrative tasks for the executive team.'
                        ].map((item, index) => (
                            <View key={index} style={styles.bulletItem}>
                                <View style={styles.bullet} />
                                <Text style={styles.bulletText}>{item}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Qualifications</Text>
                        {[
                            'Bachelor\'s degree in Business Administration or related field.',
                            '3+ years of experience in an administrative management role.',
                            'Excellent organizational and leadership skills.',
                            'Proficiency in Microsoft Office Suite.',
                            'Strong communication and interpersonal abilities.'
                        ].map((item, index) => (
                            <View key={index} style={styles.bulletItem}>
                                <View style={styles.bullet} />
                                <Text style={styles.bulletText}>{item}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Company Info Card */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>About the Company</Text>
                        <Card style={styles.companyCard}>
                            <View style={styles.companyHeader}>
                                <View style={styles.companyLogoSmall}>
                                    <FontAwesome name="building" size={20} color={Colors.border} />
                                </View>
                                <View>
                                    <Text style={styles.companyTitleSmall}>{company || 'Olusola & Associates'}</Text>
                                    <Text style={styles.companyIndustry}>Professional Services • 50-200 Employees</Text>
                                </View>
                            </View>
                            <Text style={styles.companyDescription}>
                                Olusola & Associates is a leading professional services firm based in Abeokuta, providing top-notch solutions to clients across various sectors.
                            </Text>
                            <TouchableOpacity style={styles.viewProfileBtn}>
                                <Text style={styles.viewProfileText}>View Company Profile</Text>
                            </TouchableOpacity>
                        </Card>
                    </View>
                </View>

                {/* Related Jobs Section */}
                <View style={styles.relatedSection}>
                    <Text style={[styles.sectionTitle, { marginLeft: 20 }]}>Related Positions</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.relatedScroll}>
                        {[1, 2, 3].map((i) => (
                            <Card key={i} style={styles.relatedCard}>
                                <Text style={styles.relatedTitle}>Operations Assistant</Text>
                                <Text style={styles.relatedCompany}>Green View Hub</Text>
                                <View style={styles.relatedFooter}>
                                    <Text style={styles.relatedSalary}>₦80k+</Text>
                                    <FontAwesome name="chevron-right" size={10} color={Colors.textMuted} />
                                </View>
                            </Card>
                        ))}
                        <View style={{ width: 40 }} />
                    </ScrollView>
                </View>
            </ScrollView>

            {/* Sticky Footer */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.saveBtn}>
                    <FontAwesome name="bookmark-o" size={20} color={Colors.accent} />
                </TouchableOpacity>
                <Button
                    title="Apply via WhatsApp"
                    onPress={handleApply}
                    icon={<FontAwesome name="whatsapp" size={20} color={Colors.white} />}
                    style={styles.applyBtn}
                    variant="primary"
                />
            </View>
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
    header: {
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
    content: {
        padding: 20,
    },
    mainCard: {
        alignItems: 'center',
        padding: 30,
        marginBottom: 24,
    },
    logoContainer: {
        width: 70,
        height: 70,
        borderRadius: 24,
        backgroundColor: '#EEF2FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        ...Shadows.small,
    },
    jobTitle: {
        fontSize: 22,
        fontWeight: '900',
        color: Colors.text,
        textAlign: 'center',
    },
    companyName: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.accent,
        marginTop: 6,
        textAlign: 'center',
    },
    infoRow: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'center',
        width: '100%',
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    infoText: {
        fontSize: 13,
        color: Colors.textSecondary,
        marginLeft: 6,
        fontWeight: '600',
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: Colors.text,
        marginBottom: 16,
        letterSpacing: 0.2,
    },
    descriptionText: {
        fontSize: 15,
        lineHeight: 24,
        color: Colors.textSecondary,
    },
    bulletItem: {
        flexDirection: 'row',
        marginBottom: 12,
        paddingRight: 10,
    },
    bullet: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: Colors.accent,
        marginTop: 10,
        marginRight: 12,
    },
    bulletText: {
        fontSize: 15,
        lineHeight: 22,
        color: Colors.textSecondary,
        flex: 1,
    },
    companyCard: {
        padding: 16,
        backgroundColor: Colors.surface,
    },
    companyHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    companyLogoSmall: {
        width: 44,
        height: 44,
        borderRadius: 10,
        backgroundColor: Colors.surfaceSecondary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    companyTitleSmall: {
        fontSize: 15,
        fontWeight: '700',
        color: Colors.text,
    },
    companyIndustry: {
        fontSize: 12,
        color: Colors.textMuted,
        marginTop: 2,
    },
    companyDescription: {
        fontSize: 14,
        color: Colors.textSecondary,
        lineHeight: 20,
    },
    viewProfileBtn: {
        marginTop: 16,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: Colors.surfaceSecondary,
    },
    viewProfileText: {
        color: Colors.accent,
        fontWeight: '700',
        fontSize: 14,
    },
    relatedSection: {
        marginBottom: 40,
    },
    relatedScroll: {
        marginTop: 16,
        paddingLeft: 20,
    },
    relatedCard: {
        width: 180,
        padding: 16,
        marginRight: 16,
    },
    relatedTitle: {
        fontSize: 14,
        fontWeight: '800',
        color: Colors.text,
        marginBottom: 4,
    },
    relatedCompany: {
        fontSize: 12,
        color: Colors.accent,
        fontWeight: '600',
        marginBottom: 12,
    },
    relatedFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    relatedSalary: {
        fontSize: 13,
        fontWeight: '700',
        color: Colors.success,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        paddingBottom: 35,
        backgroundColor: Colors.surface,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        ...Shadows.medium,
    },
    saveBtn: {
        width: 56,
        height: 56,
        borderRadius: 16,
        backgroundColor: Colors.surfaceSecondary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    applyBtn: {
        flex: 1,
        height: 56,
    },
});
