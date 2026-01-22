import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, FlatList, Animated, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Shadows } from '../constants/Colors';
import { Button } from '../components/Button';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Logo } from '../components/Logo';

const { width, height } = Dimensions.get('window');

const SLIDES = [
    {
        id: '1',
        title: 'Find Real Jobs in Abeokuta',
        description: 'Connect with top employers in Ogun State and secure your next big career move.',
        icon: 'search',
        colors: ['#3B82F6', '#2563EB'],
    },
    {
        id: '2',
        title: 'Hire Top Local Talent',
        description: 'Streamline your recruitment process with a pool of verified professionals right in your city.',
        icon: 'briefcase',
        colors: ['#10B981', '#059669'],
    },
    {
        id: '3',
        title: 'Grow Your Career',
        description: 'Access resources, networking opportunities, and a community dedicated to professional excellence.',
        icon: 'line-chart',
        colors: ['#F59E0B', '#D97706'],
    },
];

export default function OnboardingScreen() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef<FlatList>(null);

    const viewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems && viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.slide}>
            <LinearGradient
                colors={item.colors}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.iconCircle}>
                    {item.id === '1' ? (
                        <Logo size={80} color="transparent" iconOnly />
                    ) : (
                        <FontAwesome name={item.icon as any} size={70} color={Colors.white} />
                    )}
                </View>
            </LinearGradient>

            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={{ flex: 3 }}>
                <FlatList
                    data={SLIDES}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                        useNativeDriver: false,
                    })}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                />
            </View>

            <View style={styles.footer}>
                <View style={styles.indicatorContainer}>
                    {SLIDES.map((_, i) => {
                        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                        const dotWidth = scrollX.interpolate({
                            inputRange,
                            outputRange: [10, 24, 10],
                            extrapolate: 'clamp',
                        });
                        const opacity = scrollX.interpolate({
                            inputRange,
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: 'clamp',
                        });
                        return <Animated.View style={[styles.dot, { width: dotWidth, opacity }]} key={i.toString()} />;
                    })}
                </View>

                <View style={styles.buttonContainer}>
                    {currentIndex === SLIDES.length - 1 ? (
                        <Button
                            title="Get Started"
                            onPress={() => router.replace('/auth')}
                            size="large"
                        />
                    ) : (
                        <TouchableOpacity
                            onPress={() => slidesRef.current?.scrollToIndex({ index: currentIndex + 1 })}
                            style={styles.nextBtn}
                        >
                            <Text style={styles.nextText}>Next</Text>
                            <FontAwesome name="arrow-right" size={14} color={Colors.accent} />
                        </TouchableOpacity>
                    )}
                </View>

                <TouchableOpacity
                    style={styles.skipBtn}
                    onPress={() => router.replace('/auth')}
                >
                    <Text style={styles.skipText}>Skip Onboarding</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    slide: {
        width,
        alignItems: 'center',
        paddingTop: 60,
    },
    gradient: {
        width: width * 0.8,
        height: width * 0.8,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
        ...Shadows.large,
    },
    iconCircle: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    textContainer: {
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
        color: Colors.text,
        textAlign: 'center',
        marginBottom: 16,
        letterSpacing: -1,
    },
    description: {
        fontSize: 17,
        color: Colors.textSecondary,
        textAlign: 'center',
        lineHeight: 26,
        paddingHorizontal: 20,
    },
    footer: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: 'space-between',
        paddingBottom: 50,
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 32,
    },
    dot: {
        height: 6,
        borderRadius: 3,
        backgroundColor: Colors.accent,
        marginHorizontal: 4,
    },
    buttonContainer: {
        width: '100%',
    },
    nextBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.surface,
        paddingVertical: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.border,
        ...Shadows.small,
    },
    nextText: {
        fontSize: 17,
        fontWeight: '700',
        color: Colors.text,
        marginRight: 10,
    },
    skipBtn: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    skipText: {
        color: Colors.textMuted,
        fontSize: 14,
        fontWeight: '600',
    },
});
