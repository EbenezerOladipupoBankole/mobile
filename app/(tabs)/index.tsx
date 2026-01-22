import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, StatusBar, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { Colors, Shadows } from '../../constants/Colors';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Card } from '../../components/Card';
import { Logo } from '../../components/Logo';

export default function HomeScreen() {
  const router = useRouter();

  const categories = [
    { id: '1', name: 'Software', icon: 'code', color: '#E0E7FF', iconColor: '#4338CA' },
    { id: '2', name: 'Design', icon: 'paint-brush', color: '#FDF2F7', iconColor: '#BE185D' },
    { id: '3', name: 'Marketing', icon: 'line-chart', color: '#ECFDF5', iconColor: '#047857' },
    { id: '4', name: 'Admin', icon: 'building', color: '#FFF7ED', iconColor: '#C2410C' },
    { id: '5', name: 'Health', icon: 'heartbeat', color: '#FEF2F2', iconColor: '#B91C1C' },
  ];

  const featuredCompanies = [
    { id: '1', name: 'Olusola & Associates', jobs: 12, initials: 'OA' },
    { id: '2', name: 'Rock City Tech', jobs: 5, initials: 'RC' },
    { id: '3', name: 'Gateway Retail', jobs: 8, initials: 'GR' },
    { id: '4', name: 'Abeokuta Health', jobs: 3, initials: 'AH' },
  ];

  const recentJobs = [
    {
      id: '1',
      title: 'Administrative Manager',
      company: 'Olusola & Associates',
      location: 'Abeokuta, Nigeria',
      type: 'Full-time',
      salary: '₦120k - 150k',
      time: '2h ago',
      initials: 'OA'
    },
    {
      id: '2',
      title: 'Junior Web Developer',
      company: 'Rock City Tech',
      location: 'On-site',
      type: 'Contract',
      salary: '₦80k - 100k',
      time: '5h ago',
      initials: 'RC'
    }
  ];

  return (
    <View style={styles.outerContainer}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Premium Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.headerBrand}>
              <Logo size={50} iconOnly style={styles.headerLogo} />
              <View>
                <Text style={styles.greeting}>Welcome to</Text>
                <Text style={styles.brandName}>ViteHire</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.notificationBtn}>
              <FontAwesome name="bell-o" size={20} color={Colors.white} />
            </TouchableOpacity>
          </View>

          <Text style={styles.heroText}>Find professional opportunities in Abeokuta. (Updated)</Text>

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
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll} contentContainerStyle={{ paddingRight: 40 }}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[styles.categoryCard, { backgroundColor: cat.color }]}
                  onPress={() => router.push({
                    pathname: '/jobs',
                    params: { category: cat.name }
                  })}
                >
                  <View style={[styles.categoryIcon, { backgroundColor: 'white' }]}>
                    <FontAwesome name={cat.icon as any} size={18} color={cat.iconColor} />
                  </View>
                  <Text style={styles.categoryText}>{cat.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Featured Companies */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Featured Companies</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.companyScroll} contentContainerStyle={{ paddingRight: 40 }}>
              {featuredCompanies.map((company) => (
                <TouchableOpacity key={company.id} style={styles.companyCard}>
                  <View style={styles.companyLogo}>
                    <Text style={styles.companyInitials}>{company.initials}</Text>
                  </View>
                  <Text style={styles.companyNameText} numberOfLines={1}>{company.name}</Text>
                  <Text style={styles.companyJobs}>{company.jobs} positions</Text>
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

            {recentJobs.map((job) => (
              <TouchableOpacity key={job.id} onPress={() => router.push('/jobs')}>
                <Card style={styles.premiumJobCard}>
                  <View style={styles.jobTopRow}>
                    <View style={styles.jobLogoCircle}>
                      <Text style={styles.jobLogoText}>{job.initials}</Text>
                    </View>
                    <View style={styles.jobMeta}>
                      <Text style={styles.premiumJobTitle}>{job.title}</Text>
                      <Text style={styles.premiumCompanyName}>{job.company}</Text>
                    </View>
                    <TouchableOpacity style={styles.saveBtn}>
                      <FontAwesome name="heart-o" size={18} color={Colors.textMuted} />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.jobTagContainer}>
                    <View style={styles.premiumTag}>
                      <FontAwesome name="briefcase" size={10} color={Colors.textSecondary} style={{ marginRight: 4 }} />
                      <Text style={styles.premiumTagText}>{job.type}</Text>
                    </View>
                    <View style={styles.premiumTag}>
                      <FontAwesome name="map-marker" size={10} color={Colors.textSecondary} style={{ marginRight: 4 }} />
                      <Text style={styles.premiumTagText}>{job.location.split(',')[0]}</Text>
                    </View>
                    <Text style={styles.premiumSalary}>{job.salary}</Text>
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
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
    marginTop: 8,
  },
  categoryCard: {
    width: 100,
    height: 120,
    borderRadius: 24,
    padding: 12,
    marginRight: 16,
    justifyContent: 'space-between',
    ...Shadows.small,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.text,
  },
  companyScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
    marginTop: 8,
  },
  companyCard: {
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 20,
    marginRight: 16,
    width: 150,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.small,
  },
  companyLogo: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: Colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  companyInitials: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.accent,
  },
  companyNameText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
  },
  companyJobs: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
    fontWeight: '500',
  },
  premiumJobCard: {
    padding: 20,
    borderRadius: 24,
    marginBottom: 16,
  },
  jobTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  jobLogoCircle: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: Colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  jobLogoText: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textSecondary,
  },
  jobMeta: {
    flex: 1,
  },
  premiumJobTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 2,
  },
  premiumCompanyName: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  saveBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: Colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  jobTagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  premiumTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceSecondary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    marginRight: 10,
  },
  premiumTagText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  premiumSalary: {
    marginLeft: 'auto',
    fontSize: 14,
    fontWeight: '800',
    color: Colors.success,
  },
});
