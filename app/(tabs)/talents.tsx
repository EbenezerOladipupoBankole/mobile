import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View, Text, ActivityIndicator, TouchableOpacity, RefreshControl, Image, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors, Shadows } from '../../constants/Colors';
import { useRouter } from 'expo-router';
import { talentService } from '../../utils/talentService';

export default function TalentsScreen() {
    const router = useRouter();
    const [talents, setTalents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchTalents = async () => {
        const data = await talentService.getTalents();
        setTalents(data);
        setLoading(false);
        setRefreshing(false);
    };

    useEffect(() => {
        fetchTalents();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchTalents();
    };

    const renderTalentItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => {
                // Future: Talent detail page
                Alert.alert('Talent Profile', `Category: ${item.category}\nSkills: ${item.skillsSummary || 'N/A'}`);
            }}
        >
            <View style={styles.cardHeader}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{item.fullName?.substring(0, 2).toUpperCase()}</Text>
                </View>
                <View style={styles.headerInfo}>
                    <Text style={styles.name}>{item.fullName}</Text>
                    <Text style={styles.category}>{item.category}</Text>
                </View>
                <TouchableOpacity
                    style={styles.whatsappBtn}
                    onPress={() => Linking.openURL(`https://wa.me/${item.phoneNumber?.replace(/\D/g, '')}`)}
                >
                    <FontAwesome name="whatsapp" size={20} color={Colors.white} />
                </TouchableOpacity>
            </View>

            <View style={styles.skillsSection}>
                <Text style={styles.skillsTitle}>Skills Summary</Text>
                <Text style={styles.skillsText} numberOfLines={3}>
                    {item.skillsSummary || 'No skills summary provided.'}
                </Text>
            </View>

            <View style={styles.cardFooter}>
                <View style={styles.tag}>
                    <FontAwesome name="calendar-o" size={12} color={Colors.textMuted} />
                    <Text style={styles.tagText}>Joined {new Date(item.createdAt?.seconds * 1000).toLocaleDateString()}</Text>
                </View>
                {item.cvPath && (
                    <TouchableOpacity
                        style={styles.cvBtn}
                        onPress={() => Linking.openURL(item.cvPath)}
                    >
                        <FontAwesome name="file-pdf-o" size={14} color={Colors.accent} />
                        <Text style={styles.cvBtnText}>View CV</Text>
                    </TouchableOpacity>
                )}
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={Colors.accent} />
                    <Text style={styles.loaderText}>Loading Talent Pool...</Text>
                </View>
            ) : (
                <FlatList
                    data={talents}
                    keyExtractor={(item) => item.id}
                    renderItem={renderTalentItem}
                    contentContainerStyle={styles.listContainer}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <FontAwesome name="users" size={64} color={Colors.border} />
                            <Text style={styles.emptyTitle}>No Talents Yet</Text>
                            <Text style={styles.emptySubtitle}>The talent pool is currently empty. Check back soon!</Text>
                        </View>
                    }
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.accent} />
                    }
                />
            )}
        </View>
    );
}

import { Alert } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    listContainer: {
        padding: 20,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderText: {
        marginTop: 12,
        color: Colors.textSecondary,
        fontWeight: '600',
    },
    card: {
        backgroundColor: Colors.surface,
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        ...Shadows.medium,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 15,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    avatarText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: '800',
    },
    headerInfo: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: '800',
        color: Colors.text,
    },
    category: {
        fontSize: 14,
        color: Colors.accent,
        fontWeight: '700',
        marginTop: 2,
    },
    whatsappBtn: {
        backgroundColor: Colors.success,
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadows.small,
    },
    skillsSection: {
        backgroundColor: Colors.surfaceSecondary,
        padding: 12,
        borderRadius: 12,
        marginBottom: 16,
    },
    skillsTitle: {
        fontSize: 12,
        fontWeight: '800',
        color: Colors.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    skillsText: {
        fontSize: 14,
        color: Colors.text,
        lineHeight: 20,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tagText: {
        fontSize: 12,
        color: Colors.textMuted,
        marginLeft: 6,
        fontWeight: '500',
    },
    cvBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F9FF',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    cvBtnText: {
        color: Colors.accent,
        fontSize: 13,
        fontWeight: '700',
        marginLeft: 6,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: Colors.text,
        marginTop: 20,
    },
    emptySubtitle: {
        fontSize: 15,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginTop: 8,
        paddingHorizontal: 40,
    },
});
