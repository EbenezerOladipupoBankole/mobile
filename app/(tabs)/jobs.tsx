import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View, Text, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors, Shadows } from '../../constants/Colors';
import { Input } from '../../components/Input';
import { Card } from '../../components/Card';
import { API_URL } from '../../constants/Config';
import { useRouter, useLocalSearchParams } from 'expo-router';

interface Job {
    _id: string;
    title: string;
    companyName: string;
    category: string;
    jobType: string;
    description: string;
    requirements: string;
    whatsappContact: string;
}

export default function JobsScreen() {
    const router = useRouter();
    const { category, search } = useLocalSearchParams();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [filterText, setFilterText] = useState('');

    useEffect(() => {
        fetchJobs();
    }, []);

    useEffect(() => {
        if (category) {
            setFilterText(category as string);
        } else if (search) {
            setFilterText(search as string);
        }
    }, [category, search]);

    useEffect(() => {
        const text = filterText.toLowerCase();
        const filtered = jobs.filter(job =>
            job.title.toLowerCase().includes(text) ||
            job.companyName.toLowerCase().includes(text) ||
            job.category.toLowerCase().includes(text)
        );
        setFilteredJobs(filtered);
    }, [filterText, jobs]);

    const fetchJobs = async () => {
        try {
            const response = await fetch(`${API_URL}/jobs`);
            const data = await response.json();
            setJobs(data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
            // Fallback/Mock data
            const mockData = [
                { _id: '1', title: 'Senior Sales Executive', companyName: 'Olumo Supermarket', category: 'Retail', jobType: 'Full-time', description: 'Experienced sales personnel needed.', requirements: '3+ years experience', whatsappContact: '2341234567' },
                { _id: '2', title: 'React Native Developer', companyName: 'Abeokuta TechHub', category: 'Tech', jobType: 'Remote', description: 'Build mobile apps.', requirements: 'React Native, TypeScript', whatsappContact: '2347654321' },
                { _id: '3', title: 'Front Desk Officer', companyName: 'Green View Hotel', category: 'Hospitality', jobType: 'Full-time', description: 'Manage reception.', requirements: 'Excellent communication', whatsappContact: '2349998887' },
            ];
            setJobs(mockData);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchJobs();
    };

    const renderJobItem = ({ item }: { item: Job }) => (
        <Card style={styles.jobCard}>
            <TouchableOpacity
                onPress={() => router.push({
                    pathname: `/job/${item._id}`,
                    params: {
                        title: item.title,
                        company: item.companyName,
                        description: item.description,
                        contact: item.whatsappContact
                    }
                })}
            >
                <View style={styles.cardHeader}>
                    <Text style={styles.jobTitle}>{item.title}</Text>
                    <FontAwesome name="bookmark-o" size={18} color={Colors.textMuted} />
                </View>
                <Text style={styles.companyName}>{item.companyName}</Text>

                <View style={styles.badgeContainer}>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{item.category}</Text>
                    </View>
                    <View style={[styles.badge, { backgroundColor: Colors.surfaceSecondary }]}>
                        <Text style={[styles.badgeText, { color: Colors.accent }]}>{item.jobType}</Text>
                    </View>
                    <Text style={styles.timeAgo}>2h ago</Text>
                </View>
            </TouchableOpacity>
        </Card>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Input
                    placeholder="Filter by title or company..."
                    leftIcon={<FontAwesome name="filter" size={14} color={Colors.textSecondary} />}
                    style={styles.filterInput}
                    value={filterText}
                    onChangeText={setFilterText}
                />
            </View>

            {loading && !refreshing ? (
                <ActivityIndicator size="large" color={Colors.accent} style={{ marginTop: 50 }} />
            ) : (
                <FlatList
                    data={filteredJobs}
                    keyExtractor={(item) => item._id}
                    renderItem={renderJobItem}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.accent} />
                    }
                    ListEmptyComponent={
                        <View style={styles.emptyState}>
                            <FontAwesome name="search" size={48} color={Colors.border} />
                            <Text style={styles.emptyText}>No jobs found today.</Text>
                        </View>
                    }
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        padding: 16,
        backgroundColor: Colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    filterInput: {
        marginBottom: 0,
        minHeight: 48,
    },
    listContainer: {
        padding: 16,
    },
    jobCard: {
        marginBottom: 16,
        padding: 20,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    jobTitle: {
        fontSize: 17,
        fontWeight: '800',
        color: Colors.text,
        flex: 1,
        marginRight: 10,
    },
    companyName: {
        fontSize: 14,
        color: Colors.accent,
        fontWeight: '600',
        marginTop: 4,
    },
    badgeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
    },
    badge: {
        backgroundColor: Colors.surfaceSecondary,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        marginRight: 10,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '700',
        color: Colors.textSecondary,
    },
    timeAgo: {
        fontSize: 12,
        color: Colors.textMuted,
        marginLeft: 'auto',
    },
    emptyState: {
        alignItems: 'center',
        marginTop: 100,
    },
    emptyText: {
        marginTop: 16,
        fontSize: 16,
        color: Colors.textSecondary,
        fontWeight: '500',
    },
});
