import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors, Shadows } from '../../constants/Colors';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';

export default function ProfileScreen() {
    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>VH</Text>
                    </View>
                    <TouchableOpacity style={styles.editAvatar}>
                        <FontAwesome name="camera" size={14} color={Colors.white} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.name}>ViteHire User</Text>
                <Text style={styles.location}>Abeokuta, Nigeria</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.statsGrid}>
                    <Card style={styles.statCard}>
                        <Text style={styles.statValue}>12</Text>
                        <Text style={styles.statLabel}>Jobs Applied</Text>
                    </Card>
                    <Card style={styles.statCard}>
                        <Text style={styles.statValue}>5</Text>
                        <Text style={styles.statLabel}>CV Views</Text>
                    </Card>
                </View>

                <View style={styles.menuSection}>
                    <Text style={styles.menuTitle}>Account Settings</Text>

                    <TouchableOpacity style={styles.menuItem}>
                        <View style={[styles.menuIcon, { backgroundColor: '#F0F9FF' }]}>
                            <FontAwesome name="user-o" size={18} color={Colors.accent} />
                        </View>
                        <Text style={styles.menuText}>Edit Profile</Text>
                        <FontAwesome name="chevron-right" size={12} color={Colors.textMuted} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <View style={[styles.menuIcon, { backgroundColor: '#F0FDF4' }]}>
                            <FontAwesome name="file-text-o" size={18} color={Colors.success} />
                        </View>
                        <Text style={styles.menuText}>Manage CV</Text>
                        <FontAwesome name="chevron-right" size={12} color={Colors.textMuted} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <View style={[styles.menuIcon, { backgroundColor: '#FEF2F2' }]}>
                            <FontAwesome name="bell-o" size={18} color={Colors.error} />
                        </View>
                        <Text style={styles.menuText}>Notifications</Text>
                        <FontAwesome name="chevron-right" size={12} color={Colors.textMuted} />
                    </TouchableOpacity>
                </View>

                <Button
                    title="Sign Out"
                    onPress={() => { }}
                    variant="outline"
                    style={{ marginTop: 24 }}
                />

                <Text style={styles.version}>ViteHire v1.0.0</Text>
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
        marginBottom: 24,
    },
    menuTitle: {
        fontSize: 14,
        fontWeight: '800',
        color: Colors.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 16,
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
        marginTop: 40,
        marginBottom: 20,
    },
});
