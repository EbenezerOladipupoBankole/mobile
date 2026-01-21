import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View, Text, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors, Shadows } from '../../constants/Colors';
import { useRouter } from 'expo-router';

export default function JobsScreen() {
    const router = useRouter();
    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simple mock data load
        const mockData = [
            { _id: '1', title: 'Senior Sales Executive', companyName: 'Olumo Supermarket', category: 'Retail' },
            { _id: '2', title: 'React Native Developer', companyName: 'Abeokuta TechHub', category: 'Tech' },
        ];
        setTimeout(() => {
            setJobs(mockData);
            setLoading(false);
        }, 500);
    }, []);

    const renderJobItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.jobCard}
            onPress={() => router.push(`/job/${item._id}`)}
        >
            <Text style={styles.jobTitle}>{item.title}</Text>
            <Text style={styles.companyName}>{item.companyName}</Text>
            <View style={styles.tag}>
                <Text style={styles.tagText}>{item.category}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Find Jobs</Text>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color={Colors.accent} style={{ marginTop: 50 }} />
            ) : (
                <FlatList
                    data={jobs}
                    keyExtractor={(item) => item._id}
                    renderItem={renderJobItem}
                    contentContainerStyle={styles.listContainer}
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
        backgroundColor: Colors.surface,
        padding: 20,
        paddingTop: 50,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: Colors.text,
    },
    listContainer: {
        padding: 20,
    },
    jobCard: {
        backgroundColor: Colors.surface,
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        ...Shadows.small,
    },
    jobTitle: {
        fontSize: 17,
        fontWeight: '800',
        color: Colors.text,
    },
    companyName: {
        fontSize: 14,
        color: Colors.accent,
        marginTop: 4,
    },
    tag: {
        backgroundColor: Colors.surfaceSecondary,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        marginTop: 10,
        alignSelf: 'flex-start',
    },
    tagText: {
        fontSize: 12,
        color: Colors.textSecondary,
        fontWeight: '600',
    },
});
