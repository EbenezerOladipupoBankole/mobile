import React from 'react';
import { StyleSheet, ScrollView, View, Text, Linking, Alert, StatusBar } from 'react-native';
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
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                        <FontAwesome name="arrow-left" size={18} color={Colors.text} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Job Details</Text>
                    <TouchableOpacity style={styles.backBtn}>
                        <FontAwesome name="share-alt" size={18} color={Colors.text} />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <Card style={styles.mainCard}>
                        <View style={styles.logoContainer}>
                            <FontAwesome name="building" size={30} color={Colors.accent} />
                        </View>
                        <Text style={styles.jobTitle}>{title || 'Job Title'}</Text>
                        <Text style={styles.companyName}>{company || 'Company Name'}</Text>

                        <View style={styles.infoRow}>
                            <View style={styles.infoItem}>
                                <FontAwesome name="map-marker" size={14} color={Colors.textSecondary} />
                                <Text style={styles.infoText}>Abeokuta, NG</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <FontAwesome name="clock-o" size={14} color={Colors.textSecondary} />
                                <Text style={styles.infoText}>Full-time</Text>
                            </View>
                        </View>
                    </Card>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Description</Text>
                        <Text style={styles.descriptionText}>
                            {description || 'Detailed job description will appear here. This includes the daily tasks and expectations for the role.'}
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Requirements</Text>
                        <View style={styles.bulletItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.bulletText}>Minimum of 2 years experience in a similar role.</Text>
                        </View>
                        <View style={styles.bulletItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.bulletText}>Excellent communication and interpersonal skills.</Text>
                        </View>
                        <View style={styles.bulletItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.bulletText}>Resident of Abeokuta or willing to relocate.</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Button
                    title="Apply via WhatsApp"
                    onPress={handleApply}
                    icon={<FontAwesome name="whatsapp" size={20} color={Colors.white} />}
                    style={styles.applyBtn}
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
        marginBottom: 30,
    },
    logoContainer: {
        width: 70,
        height: 70,
        borderRadius: 24,
        backgroundColor: Colors.surfaceSecondary,
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
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 12,
    },
    infoText: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginLeft: 6,
        fontWeight: '600',
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: Colors.text,
        marginBottom: 16,
    },
    descriptionText: {
        fontSize: 16,
        lineHeight: 26,
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
        lineHeight: 24,
        color: Colors.textSecondary,
        flex: 1,
    },
    footer: {
        padding: 20,
        paddingBottom: 40,
        backgroundColor: Colors.surface,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        ...Shadows.medium,
    },
    applyBtn: {
        width: '100%',
    },
});
