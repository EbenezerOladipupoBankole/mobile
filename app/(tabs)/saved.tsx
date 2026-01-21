import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors, Shadows } from '../../constants/Colors';
import { Card } from '../../components/Card';
import { useRouter } from 'expo-router';

// Mock data for saved jobs
const SAVED_JOBS = [
  {
    _id: '1',
    title: 'Senior Sales Executive',
    companyName: 'Olumo Supermarket',
    category: 'Retail',
    jobType: 'Full-time',
    dateSaved: '2 days ago'
  }
];

export default function SavedJobsScreen() {
  const router = useRouter();

  const renderJobItem = ({ item }: { item: typeof SAVED_JOBS[0] }) => (
    <Card style={styles.jobCard}>
      <TouchableOpacity
        onPress={() => router.push({
          pathname: `/job/${item._id}`,
          params: {
            title: item.title,
            company: item.companyName,
          }
        })}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.jobTitle}>{item.title}</Text>
          <TouchableOpacity>
            <FontAwesome name="bookmark" size={18} color={Colors.accent} />
          </TouchableOpacity>
        </View>
        <Text style={styles.companyName}>{item.companyName}</Text>

        <View style={styles.badgeContainer}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.category}</Text>
          </View>
          <Text style={styles.savedDate}>Saved {item.dateSaved}</Text>
        </View>
      </TouchableOpacity>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={SAVED_JOBS}
        keyExtractor={(item) => item._id}
        renderItem={renderJobItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <FontAwesome name="bookmark-o" size={60} color={Colors.border} />
            <Text style={styles.emptyTitle}>No Saved Jobs</Text>
            <Text style={styles.emptySubtitle}>Jobs you save will appear here for easy access.</Text>
            <TouchableOpacity
              style={styles.browseBtn}
              onPress={() => router.push('/jobs')}
            >
              <Text style={styles.browseBtnText}>Browse Jobs</Text>
            </TouchableOpacity>
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
  listContainer: {
    padding: 20,
  },
  jobCard: {
    marginBottom: 16,
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  jobTitle: {
    fontSize: 16,
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
    marginTop: 12,
  },
  badge: {
    backgroundColor: Colors.surfaceSecondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 10,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  savedDate: {
    fontSize: 12,
    color: Colors.textMuted,
    marginLeft: 'auto',
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
  browseBtn: {
    marginTop: 24,
    backgroundColor: Colors.accent,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  browseBtnText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 15,
  },
});
