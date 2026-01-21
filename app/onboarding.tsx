import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, FlatList, Animated, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { Button } from '../components/Button';
import { FontAwesome } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const SLIDES = [
    {
        id: '1',
        title: 'Find Your Next Job',
        description: 'Explore the latest career opportunities specifically within Abeokuta and its surroundings.',
        icon: 'search',
        color: '#3B82F6',
    },
    {
        id: '2',
        title: 'Hire Best Talent',
        description: 'Post jobs and connect with thousands of skilled professionals ready to work.',
        icon: 'briefcase',
        color: '#10B981',
    },
    {
        id: '3',
        title: 'Join Talent Pool',
        description: 'Submit your profile and CV to get noticed by top employers in the city.',
        icon: 'id-card-o',
        color: '#F59E0B',
    },
];

export default function OnboardingScreen() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const renderItem = ({ item }) => (
        <View style={styles.slide}>
            <View style={[styles.iconContainer, { backgroundColor: `${item.color}15` }]}>
                <FontAwesome name={item.icon as any} size={80} color={item.color} />
            </View>
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
                            onPress={() => slidesRef.current.scrollToIndex({ index: currentIndex + 1 })}
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
        backgroundColor: Colors.white,
    },
    slide: {
        width,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    iconContainer: {
        width: 200,
        height: 200,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
    },
    textContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        color: Colors.text,
        textAlign: 'center',
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        color: Colors.textSecondary,
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 20,
    },
    footer: {
        flex: 1,
        paddingHorizontal: 40,
        justifyContent: 'space-between',
        paddingBottom: 50,
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 32,
    },
    dot: {
        height: 8,
        borderRadius: 4,
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
        paddingVertical: 18,
    },
    nextText: {
        fontSize: 18,
        fontWeight: '800',
        color: Colors.accent,
        marginRight: 10,
    },
    skipBtn: {
        alignItems: 'center',
    },
    skipText: {
        color: Colors.textMuted,
        fontSize: 14,
        fontWeight: '600',
    },
});
