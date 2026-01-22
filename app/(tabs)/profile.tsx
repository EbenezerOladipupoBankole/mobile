import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors, Shadows } from '../../constants/Colors';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { useRouter } from 'expo-router';
import { auth } from '../../utils/firebase';
import { signOut } from 'firebase/auth';
import { Alert } from 'react-native';

export default function ProfileScreen() {
    const router = useRouter();
    const user = auth.currentUser;
    const skills = ['Project Management', 'Team Leadership', 'Office Administration', 'Customer Relations'];

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            router.replace('/auth');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to sign out. Please try again.');
        }
    };

    const getInitials = (name: string | null) => {
        if (!name) return 'VH';
        const parts = name.split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.slice(0, 2).toUpperCase();
    };

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{getInitials(user?.displayName || 'ViteHire User')}</Text>
                    </View>
                    <TouchableOpacity style={styles.editAvatar}>
                        <FontAwesome name="camera" size={14} color={Colors.white} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.name}>{user?.displayName || 'ViteHire User'}</Text>
                <Text style={styles.email}>{user?.email || 'Abeokuta, Nigeria'}</Text>

                <View style={styles.badgeRow}>
                    <View style={styles.verifiedBadge}>
                        <FontAwesome name="check-circle" size={12} color={Colors.success} />
                        <Text style={styles.verifiedText}>Verified Talent</Text>
                    </View>
                </View>
            </View>

            <View style={styles.content}>
                {/* Quick Stats */}
                <View style={styles.statsGrid}>
                    <Card style={styles.statCard}>
                        <Text style={styles.statValue}>12</Text>
                        <Text style={styles.statLabel}>Applications</Text>
                    </Card>
                    <Card style={styles.statCard}>
                        <Text style={styles.statValue}>1</Text>
                        <Text style={styles.statLabel}>Saved Jobs</Text>
                    </Card>
                </View>

                {/* Professional Info Section */}
                <View style={styles.menuSection}>
                    <Text style={styles.menuTitle}>Professional Info</Text>

                    <Card style={styles.infoCard}>
                        <View style={styles.infoCardHeader}>
                            <FontAwesome name="file-text-o" size={18} color={Colors.accent} />
                            <Text style={styles.infoCardTitle}>Resume</Text>
                            <TouchableOpacity style={styles.editBtn}>
                                <Text style={styles.editText}>Update</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.infoCardSub}>Resume_ViteHire_2024.pdf</Text>
                    </Card>

                    <Card style={[styles.infoCard, { marginTop: 12 }]}>
                        <View style={styles.infoCardHeader}>
                            <FontAwesome name="gears" size={18} color={Colors.accent} />
                            <Text style={styles.infoCardTitle}>Skills</Text>
                            <TouchableOpacity style={styles.editBtn}>
                                <Text style={styles.editText}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.skillRow}>
                            {skills.map((skill, i) => (
                                <View key={i} style={styles.skillTag}>
                                    <Text style={styles.skillText}>{skill}</Text>
                                </View>
                            ))}
                        </View>
                    </Card>

                    <Card style={[styles.infoCard, { marginTop: 12 }]}>
                        <View style={styles.infoCardHeader}>
                            <FontAwesome name="briefcase" size={18} color={Colors.accent} />
                            <Text style={styles.infoCardTitle}>Work Experience</Text>
                            <TouchableOpacity style={styles.editBtn}>
                                <Text style={styles.editText}>Add</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.experienceItem}>
                            <View style={styles.expDot} />
                            <View>
                                <Text style={styles.expTitle}>Senior Admin Officer</Text>
                                <Text style={styles.expSub}>Olusola & Associates • 2021 - Present</Text>
                            </View>
                        </View>
                    </Card>
                </View>

                {/* App Settings Section */}
                <View style={styles.menuSection}>
                    <Text style={styles.menuTitle}>App settings</Text>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => router.push('/notifications')}
                    >
                        <View style={[styles.menuIcon, { backgroundColor: '#FEF2F2' }]}>
                            <FontAwesome name="bell-o" size={18} color={Colors.error} />
                        </View>
                        <Text style={styles.menuText}>Notifications</Text>
                        <FontAwesome name="chevron-right" size={12} color={Colors.textMuted} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => router.push('/settings')}
                    >
                        <View style={[styles.menuIcon, { backgroundColor: '#F0F9FF' }]}>
                            <FontAwesome name="cog" size={18} color={Colors.accent} />
                        </View>
                        <Text style={styles.menuText}>Settings</Text>
                        <FontAwesome name="chevron-right" size={12} color={Colors.textMuted} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <View style={[styles.menuIcon, { backgroundColor: '#F0FDF4' }]}>
                            <FontAwesome name="question-circle-o" size={18} color={Colors.success} />
                        </View>
                        <Text style={styles.menuText}>Help & Support</Text>
                        <FontAwesome name="chevron-right" size={12} color={Colors.textMuted} />
                    </TouchableOpacity>
                </View>

                <Button
                    title="Sign Out"
                    onPress={handleSignOut}
                    variant="outline"
                    style={{ marginTop: 24, marginBottom: 20 }}
                />

                <Text style={styles.version}>ViteHire v1.1.0 • Made in Abeokuta</Text>
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
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 30,
        backgroundColor: Colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadows.medium,
    },
    avatarText: {
        fontSize: 36,
        fontWeight: '900',
        color: Colors.white,
        letterSpacing: -1,
    },
    editAvatar: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Colors.accent,
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: Colors.surface,
    },
    name: {
        fontSize: 22,
        fontWeight: '800',
        color: Colors.text,
    },
    location: {
        fontSize: 14,
        color: Colors.textSecondary,
        fontWeight: '500',
        marginTop: 4,
    },
    email: {
        fontSize: 14,
        color: Colors.textSecondary,
        fontWeight: '500',
        marginTop: 4,
    },
    badgeRow: {
        marginTop: 12,
    },
    verifiedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ECFDF5',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    verifiedText: {
        fontSize: 12,
        fontWeight: '700',
        color: Colors.success,
        marginLeft: 6,
    },
    content: {
        padding: 24,
    },
    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
    },
    statCard: {
        width: '48%',
        alignItems: 'center',
        paddingVertical: 20,
    },
    statValue: {
        fontSize: 24,
        fontWeight: '900',
        color: Colors.primary,
    },
    statLabel: {
        fontSize: 12,
        color: Colors.textSecondary,
        fontWeight: '600',
        marginTop: 4,
    },
    menuSection: {
        marginBottom: 32,
    },
    menuTitle: {
        fontSize: 14,
        fontWeight: '800',
        color: Colors.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 16,
    },
    infoCard: {
        padding: 16,
    },
    infoCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    infoCardTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: Colors.text,
        marginLeft: 12,
        flex: 1,
    },
    editBtn: {
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    editText: {
        fontSize: 13,
        fontWeight: '700',
        color: Colors.accent,
    },
    infoCardSub: {
        fontSize: 13,
        color: Colors.textSecondary,
        marginLeft: 30,
    },
    skillRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 30,
        marginTop: 4,
    },
    skillTag: {
        backgroundColor: Colors.surfaceSecondary,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        marginRight: 8,
        marginBottom: 8,
    },
    skillText: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.text,
    },
    experienceItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginLeft: 30,
        marginTop: 4,
    },
    expDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.accent,
        marginTop: 6,
        marginRight: 12,
    },
    expTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.text,
    },
    expSub: {
        fontSize: 12,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        padding: 12,
        borderRadius: 16,
        marginBottom: 12,
        ...Shadows.small,
    },
    menuIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    menuText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
    },
    version: {
        textAlign: 'center',
        color: Colors.textMuted,
        fontSize: 12,
        marginTop: 20,
        marginBottom: 10,
    },
});
