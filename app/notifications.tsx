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
        title: 'New Job Alert',
        message: '3 new jobs found matching your "Tech" interest in Abeokuta.',
        time: '5h ago',
        type: 'alert',
        read: true
    },
    {
        id: '3',
        title: 'Welcome to ViteHire',
        message: 'Complete your profile to increase your chances of being hired by 40%.',
        time: '1d ago',
        type: 'welcome',
        read: true
    }
];

export default function NotificationsScreen() {
    const router = useRouter();

    const getIcon = (type: string) => {
        switch (type) {
            case 'view': return { name: 'eye', color: Colors.accent };
            case 'alert': return { name: 'briefcase', color: Colors.warning };
            case 'welcome': return { name: 'star', color: Colors.success };
            default: return { name: 'bell-o', color: Colors.textMuted };
        }
    };

    const renderItem = ({ item }: { item: typeof NOTIFICATIONS[0] }) => {
        const icon = getIcon(item.type);
        return (
            <TouchableOpacity style={[styles.notificationItem, !item.read && styles.unreadItem]}>
                <View style={[styles.iconContainer, { backgroundColor: icon.color + '15' }]}>
                    <FontAwesome name={icon.name as any} size={18} color={icon.color} />
                </View>
                <View style={styles.textContainer}>
                    <View style={styles.notifHeader}>
                        <Text style={styles.notifTitle}>{item.title}</Text>
                        {!item.read && <View style={styles.unreadDot} />}
                    </View>
                    <Text style={styles.notifMessage}>{item.message}</Text>
                    <Text style={styles.notifTime}>{item.time}</Text>
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
        paddingVertical: 10,
    },
    notificationItem: {
        flexDirection: 'row',
        padding: 20,
        backgroundColor: Colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    unreadItem: {
        backgroundColor: '#F8FAFC',
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    notifHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    notifTitle: {
        fontSize: 15,
        fontWeight: '800',
        color: Colors.text,
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.accent,
    },
    notifMessage: {
        fontSize: 14,
        color: Colors.textSecondary,
        lineHeight: 20,
        marginBottom: 8,
    },
    notifTime: {
        fontSize: 12,
        color: Colors.textMuted,
        fontWeight: '500',
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
        paddingHorizontal: 40,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: Colors.text,
        marginTop: 20,
    },
    emptySubtitle: {
        fontSize: 14,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginTop: 8,
        lineHeight: 20,
    },
});
