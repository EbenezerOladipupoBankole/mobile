import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, StatusBar, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { Colors, Shadows } from '../../constants/Colors';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Card } from '../../components/Card';

export default function HomeScreen() {
  const router = useRouter();

  const categories = [
    { id: '1', name: 'Tech', icon: 'laptop' },
    { id: '2', name: 'Retail', icon: 'shopping-cart' },
    { id: '3', name: 'Edu', icon: 'book' },
    { id: '4', name: 'Health', icon: 'plus-square' },
  ];

  return (
    <View style={styles.outerContainer}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Premium Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.headerBrand}>
              <Image
                source={require('../../assets/images/logo.png')}
                style={styles.headerLogo}
              />
              <View>
                <Text style={styles.greeting}>Welcome to</Text>
                <Text style={styles.brandName}>ViteHire</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.notificationBtn}>
              <FontAwesome name="bell-o" size={20} color={Colors.white} />
            </TouchableOpacity>
          </View>

          <Text style={styles.heroText}>Find professional opportunities in Abeokuta.</Text>

          <View style={styles.searchContainer}>
            <Input
              placeholder="Search by job title, company..."
              leftIcon={<FontAwesome name="search" size={16} color={Colors.textSecondary} />}
              style={styles.searchInput}
            />
          </View>
        </View>

        <View style={styles.content}>
          {/* Quick Stats/Badges */}
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.actionItem}
              onPress={() => router.push('/post-job')}
            >
              <View style={[styles.actionIcon, { backgroundColor: '#EEF2FF' }]}>
                <FontAwesome name="briefcase" size={20} color={Colors.accent} />
              </View>
              <Text style={styles.actionLabel}>Post Job</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionItem}
              onPress={() => router.push('/join-talent')}
            >
              <View style={[styles.actionIcon, { backgroundColor: '#ECFDF5' }]}>
                <FontAwesome name="user-plus" size={20} color={Colors.success} />
              </View>
              <Text style={styles.actionLabel}>Join Talent</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionItem}
              onPress={() => router.push('/jobs')}
            >
              <View style={[styles.actionIcon, { backgroundColor: '#FFF7ED' }]}>
                <FontAwesome name="search" size={20} color={Colors.warning} />
              </View>
              <Text style={styles.actionLabel}>Find Jobs</Text>
            </TouchableOpacity>
          </View>

          {/* Categories */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Industries</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={styles.categoryChip}
                  onPress={() => router.push({
                    pathname: '/jobs',
                    params: { category: cat.name }
                  })}
                >
                  <FontAwesome name={cat.icon as any} size={14} color={Colors.accent} style={{ marginRight: 6 }} />
                  <Text style={styles.categoryText}>{cat.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Featured Jobs */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recently Posted</Text>
              <TouchableOpacity onPress={() => router.push('/jobs')}>
                <Text style={styles.seeAll}>View all</Text>
              </TouchableOpacity>
            </View>

            <Card style={styles.featuredJobCard}>
              <View style={styles.jobInfoRow}>
                <View style={styles.jobLogoStub}>
                  <Text style={styles.logoText}>OA</Text>
                </View>
                <View style={styles.jobDetailsHeader}>
                  <Text style={styles.jobTitle}>Administrative Manager</Text>
                  <Text style={styles.companyName}>Olusola & Associates</Text>
                </View>
              </View>
              <View style={styles.jobTags}>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>Full-time</Text>
                </View>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>On-site</Text>
                </View>
                <Text style={styles.jobSalary}>₦120k - 150k</Text>
              </View>
              <Button
                title="View Details"
                onPress={() => router.push('/jobs')}
                variant="primary"
                size="small"
                style={{ marginTop: 16 }}
              />
            </Card>
          </View>
        </View>
      </ScrollView>
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
    backgroundColor: Colors.primary,
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 40,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    ...Shadows.medium,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLogo: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
  greeting: {
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: '500',
  },
  brandName: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  notificationBtn: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    marginBottom: 24,
    maxWidth: '80%',
  },
  searchContainer: {
    marginBottom: -65, // Overlap with content
  },
  searchInput: {
    ...Shadows.medium,
    backgroundColor: Colors.white,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  actionItem: {
    alignItems: 'center',
    width: '30%',
  },
  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    ...Shadows.small,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.text,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: 0.2,
  },
  seeAll: {
    color: Colors.accent,
    fontWeight: '700',
    fontSize: 14,
  },
  categoryScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  featuredJobCard: {
    padding: 20,
  },
  jobInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  jobLogoStub: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: Colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  logoText: {
    fontWeight: '800',
    color: Colors.textSecondary,
  },
  jobDetailsHeader: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 4,
  },
  companyName: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  jobTags: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tag: {
    backgroundColor: Colors.surfaceSecondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  jobSalary: {
    marginLeft: 'auto',
    fontSize: 14,
    fontWeight: '700',
    color: Colors.success,
  },
});
