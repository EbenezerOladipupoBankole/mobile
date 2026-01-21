import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Switch, StatusBar } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors, Shadows } from '../constants/Colors';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
    const router = useRouter();
    const [pushEnabled, setPushEnabled] = React.useState(true);
    const [emailEnabled, setEmailEnabled] = React.useState(false);

    const SettingItem = ({ icon, title, subtitle, component }: any) => (
        <View style={styles.settingItem}>
            <View style={styles.settingIcon}>
                <FontAwesome name={icon} size={18} color={Colors.textSecondary} />
            </View>
            <View style={styles.settingText}>
                <Text style={styles.settingTitle}>{title}</Text>
                {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
            </View>
            {component || <FontAwesome name="chevron-right" size={12} color={Colors.textMuted} />}
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <FontAwesome name="arrow-left" size={18} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Settings</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Account</Text>
                    <SettingItem icon="user" title="Personal Information" />
                    <SettingItem icon="lock" title="Password & Security" />
                    <SettingItem icon="id-card" title="Identify Verification" subtitle="Not verified" />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Notifications</Text>
                    <SettingItem
                        icon="bell"
                        title="Push Notifications"
                        component={
                            <Switch
                                value={pushEnabled}
                                onValueChange={setPushEnabled}
                                trackColor={{ false: Colors.border, true: Colors.accent }}
                            />
                        }
                    />
                    <SettingItem
                        icon="envelope"
                        title="Email Alerts"
                        component={
                            <Switch
                                value={emailEnabled}
                                onValueChange={setEmailEnabled}
                                trackColor={{ false: Colors.border, true: Colors.accent }}
                            />
                        }
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Privacy & Terms</Text>
                    <SettingItem icon="shield" title="Privacy Policy" />
                    <SettingItem icon="file-text" title="Terms of Service" />
                </View>

                <View style={[styles.section, { marginBottom: 40 }]}>
                    <Text style={styles.sectionTitle}>Danger Zone</Text>
                    <TouchableOpacity style={styles.dangerBtn}>
                        <FontAwesome name="trash" size={16} color={Colors.error} />
                        <Text style={styles.dangerText}>Deactivate Account</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
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
    section: {
        marginTop: 24,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '800',
        color: Colors.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginLeft: 20,
        marginBottom: 12,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    settingIcon: {
        width: 32,
        alignItems: 'center',
        marginRight: 16,
    },
    settingText: {
        flex: 1,
    },
    settingTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: Colors.text,
    },
    settingSubtitle: {
        fontSize: 12,
        color: Colors.error,
        marginTop: 2,
    },
    dangerBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        paddingVertical: 16,
        paddingHorizontal: 20,
        marginTop: 4,
    },
    dangerText: {
        fontSize: 15,
        fontWeight: '700',
        color: Colors.error,
        marginLeft: 16,
    },
});
