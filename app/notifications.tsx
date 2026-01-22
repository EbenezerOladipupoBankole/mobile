import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors, Shadows } from '../constants/Colors';
import { useRouter } from 'expo-router';

const NOTIFICATIONS = [
    {
        id: '1',
        title: 'Application Viewed',
        message: 'Olusola & Associates viewed your application for "Administrative Manager".',
        time: '2h ago',
        type: 'view',
        read: false
    },
    {
        id: '2',
        title: 'Interview Invite',
        message: 'Rock City Tech wants to schedule an interview with you for "Web Developer".',
        time: '5h ago',
        type: 'invite',
        read: false
    },
    {
        id: '3',
        title: 'New Jobs Found',
        message: '5 new positions matching your skills were posted in Abeokuta today.',
        time: '8h ago',
        type: 'alert',
        read: true
    },
    {
        id: '4',
        title: 'Profile Strenght',
        message: 'Your profile is 80% complete. Add your latest project to stand out!',
        time: '1d ago',
        type: 'welcome',
        read: true
    }
];

export default function NotificationsScreen() {
    const router = useRouter();

    const getIcon = (type: string) => {
        switch (type) {
            case 'view': return { name: 'eye', color: '#6366F1' }; // Indigo
            case 'invite': return { name: 'calendar-check-o', color: '#10B981' }; // Emerald
            case 'alert': return { name: 'bell', color: '#F59E0B' }; // Amber
            case 'welcome': return { name: 'star', color: '#EC4899' }; // Pink
            default: return { name: 'circle', color: Colors.textMuted };
        }
    };

    const renderItem = ({ item }: { item: typeof NOTIFICATIONS[0] }) => {
        const icon = getIcon(item.type);
        return (
            <TouchableOpacity style={[styles.notificationCard, !item.read && styles.unreadCard]}>
                <View style={[styles.iconCircle, { backgroundColor: icon.color + '15' }]}>
                    <FontAwesome name={icon.name as any} size={20} color={icon.color} />
                </View>
                <View style={styles.contentArea}>
                    <View style={styles.notifTop}>
                        <Text style={[styles.titleText, !item.read && styles.unreadTitle]}>{item.title}</Text>
                        <Text style={styles.timeText}>{item.time}</Text>
                    </View>
                    <Text style={styles.messageText} numberOfLines={2}>{item.message}</Text>
                    {!item.read && <View style={styles.pulseDot} />}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <FontAwesome name="arrow-left" size={18} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notifications</Text>
                <TouchableOpacity>
                    <Text style={styles.markRead}>Mark all as read</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={NOTIFICATIONS}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <FontAwesome name="bell-slash-o" size={60} color={Colors.border} />
                        <Text style={styles.emptyTitle}>All caught up!</Text>
                        <Text style={styles.emptySubtitle}>You'll receive notifications about your applications and new job alerts here.</Text>
                    </View>
                }
            />
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
    markRead: {
        fontSize: 13,
        fontWeight: '700',
        color: Colors.accent,
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 40,
    },
    notificationCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: Colors.surface,
        borderRadius: 24,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: Colors.border,
        ...Shadows.small,
    },
    unreadCard: {
        backgroundColor: '#F8FAFC',
        borderColor: Colors.accent + '20',
    },
    iconCircle: {
        width: 48,
        height: 48,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    contentArea: {
        flex: 1,
        position: 'relative',
    },
    notifTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    titleText: {
        fontSize: 15,
        fontWeight: '700',
        color: Colors.textSecondary,
    },
    unreadTitle: {
        color: Colors.text,
        fontWeight: '800',
    },
    timeText: {
        fontSize: 12,
        color: Colors.textMuted,
        fontWeight: '500',
    },
    messageText: {
        fontSize: 14,
        color: Colors.textSecondary,
        lineHeight: 20,
    },
    pulseDot: {
        position: 'absolute',
        top: -2,
        right: -2,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.accent,
        borderWidth: 2,
        borderColor: Colors.surface,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
        paddingHorizontal: 40,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: Colors.text,
        marginTop: 20,
        letterSpacing: -0.5,
    },
    emptySubtitle: {
        fontSize: 15,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginTop: 10,
        lineHeight: 22,
    },
});
