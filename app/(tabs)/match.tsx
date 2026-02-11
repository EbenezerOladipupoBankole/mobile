import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors, Shadows } from '../../constants/Colors';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    runOnJS,
    interpolate,
    Extrapolate
} from 'react-native-reanimated';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { jobService } from '../../utils/jobService';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

export default function MatchScreen() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showMatchModal, setShowMatchModal] = useState(false);
    const router = useRouter();

    const translateX = useSharedValue(0);
    const rotate = useSharedValue(0);

    const fetchJobs = async () => {
        setLoading(true);
        const data = await jobService.getJobs();
        setJobs(data);
        setCurrentIndex(0);
        setLoading(false);
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const nextCard = () => {
        setCurrentIndex(prev => prev + 1);
        setShowMatchModal(false);
        translateX.value = 0;
        rotate.value = 0;
    };

    const onSwipeComplete = (direction: 'left' | 'right') => {
        if (direction === 'right') {
            setShowMatchModal(true);
        } else {
            nextCard();
        }
    };

    const gesture = Gesture.Pan()
        .onUpdate((event) => {
            translateX.value = event.translationX;
            rotate.value = event.translationX / 20;
        })
        .onEnd((event) => {
            if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
                const direction = event.translationX > 0 ? 'right' : 'left';
                translateX.value = withSpring(direction === 'right' ? SCREEN_WIDTH * 1.5 : -SCREEN_WIDTH * 1.5, {}, () => {
                    runOnJS(onSwipeComplete)(direction);
                });
            } else {
                translateX.value = withSpring(0);
                rotate.value = withSpring(0);
            }
        });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { rotate: `${rotate.value}deg` }
            ]
        };
    });

    const likeOpacity = useAnimatedStyle(() => {
        const opacity = interpolate(translateX.value, [0, 50], [0, 1], Extrapolate.CLAMP);
        return { opacity };
    });

    const nopeOpacity = useAnimatedStyle(() => {
        const opacity = interpolate(translateX.value, [-50, 0], [1, 0], Extrapolate.CLAMP);
        return { opacity };
    });

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={Colors.accent} />
            </View>
        );
    }

    const currentJob = jobs[currentIndex];

    if (!currentJob) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Match Mode</Text>
                </View>
                <View style={styles.emptyContainer}>
                    <FontAwesome name="check-circle" size={80} color={Colors.accent} />
                    <Text style={styles.emptyTitle}>All Caught Up!</Text>
                    <Text style={styles.emptySubtitle}>You've swiped through all available jobs in your area.</Text>
                    <TouchableOpacity
                        style={styles.refreshBtn}
                        onPress={fetchJobs}
                    >
                        <Text style={styles.refreshBtnText}>Check for New Jobs</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Match Mode</Text>
                <View style={styles.betaBadge}>
                    <Text style={styles.betaText}>BETA</Text>
                </View>
            </View>

            <View style={styles.cardContainer}>
                <GestureDetector gesture={gesture}>
                    <Animated.View style={[styles.card, animatedStyle, Shadows.large]}>
                        <View style={styles.logoContainer}>
                            <Text style={styles.logoEmoji}>🏢</Text>
                        </View>

                        <View style={styles.jobInfo}>
                            <Text style={styles.jobTitle}>{currentJob.title}</Text>
                            <Text style={styles.companyName}>{currentJob.companyName}</Text>

                            <View style={styles.detailRow}>
                                <FontAwesome name="map-marker" size={16} color={Colors.textSecondary} />
                                <Text style={styles.detailText}>Abeokuta, Ogun</Text>
                            </View>

                            <View style={styles.detailRow}>
                                <FontAwesome name="tag" size={16} color={Colors.accent} />
                                <Text style={styles.detailText}>{currentJob.category}</Text>
                            </View>

                            <View style={styles.typeTag}>
                                <Text style={styles.typeText}>{currentJob.jobType}</Text>
                            </View>

                            <View style={styles.descContainer}>
                                <Text style={styles.descTitle}>Description</Text>
                                <Text style={styles.descText} numberOfLines={6}>{currentJob.description}</Text>
                            </View>
                        </View>

                        {/* Overlays */}
                        <Animated.View style={[styles.likeOverlay, likeOpacity]}>
                            <Text style={styles.likeText}>LIKE</Text>
                        </Animated.View>
                        <Animated.View style={[styles.nopeOverlay, nopeOpacity]}>
                            <Text style={styles.nopeText}>PASS</Text>
                        </Animated.View>
                    </Animated.View>
                </GestureDetector>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity
                    style={[styles.actionBtn, styles.passBtn]}
                    onPress={() => {
                        translateX.value = withSpring(-SCREEN_WIDTH * 1.5, {}, () => runOnJS(onSwipeComplete)('left'));
                    }}
                >
                    <FontAwesome name="times" size={28} color={Colors.error} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.actionBtn, styles.likeBtn]}
                    onPress={() => {
                        translateX.value = withSpring(SCREEN_WIDTH * 1.5, {}, () => runOnJS(onSwipeComplete)('right'));
                    }}
                >
                    <FontAwesome name="heart" size={28} color={Colors.white} />
                </TouchableOpacity>
            </View>

            <Modal
                visible={showMatchModal}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.modalOverlay}>
                    <LinearGradient
                        colors={['rgba(15, 23, 42, 0.95)', 'rgba(59, 130, 246, 0.95)']}
                        style={styles.modalContent}
                    >
                        <FontAwesome name="bolt" size={80} color={Colors.white} />
                        <Text style={styles.modalTitle}>IT'S A MATCH!</Text>
                        <Text style={styles.modalSubtitle}>
                            You've applied for the {currentJob.title} position at {currentJob.companyName}!
                        </Text>

                        <TouchableOpacity
                            style={styles.modalActionBtn}
                            onPress={() => nextCard()}
                        >
                            <Text style={styles.modalActionText}>Keep Swiping</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.modalSecondaryBtn}
                            onPress={() => {
                                setShowMatchModal(false);
                                router.push(`/job/${currentJob.id}`);
                            }}
                        >
                            <Text style={styles.modalSecondaryText}>View Job Details</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </Modal>
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
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: Colors.surface,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: Colors.text,
        letterSpacing: 1,
    },
    betaBadge: {
        backgroundColor: Colors.accent,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginLeft: 8,
    },
    betaText: {
        color: Colors.white,
        fontSize: 10,
        fontWeight: '900',
    },
    cardContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    card: {
        width: '100%',
        height: '90%',
        backgroundColor: Colors.surface,
        borderRadius: 30,
        padding: 24,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    logoContainer: {
        width: 80,
        height: 80,
        backgroundColor: Colors.surfaceSecondary,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    logoEmoji: {
        fontSize: 40,
    },
    jobInfo: {
        flex: 1,
    },
    jobTitle: {
        fontSize: 28,
        fontWeight: '900',
        color: Colors.text,
        marginBottom: 4,
    },
    companyName: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.accent,
        marginBottom: 20,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    detailText: {
        marginLeft: 8,
        fontSize: 15,
        color: Colors.textSecondary,
        fontWeight: '600',
    },
    typeTag: {
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 100,
        alignSelf: 'flex-start',
        marginTop: 10,
        marginBottom: 24,
    },
    typeText: {
        color: Colors.accent,
        fontWeight: '700',
        fontSize: 13,
    },
    descContainer: {
        marginTop: 10,
    },
    descTitle: {
        fontSize: 14,
        fontWeight: '800',
        color: Colors.text,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 8,
    },
    descText: {
        fontSize: 15,
        color: Colors.textSecondary,
        lineHeight: 22,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 40,
        gap: 20,
    },
    actionBtn: {
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadows.medium,
    },
    passBtn: {
        backgroundColor: Colors.white,
    },
    likeBtn: {
        backgroundColor: Colors.accent,
    },
    likeOverlay: {
        position: 'absolute',
        top: 40,
        right: 40,
        borderWidth: 4,
        borderColor: '#22c55e',
        paddingHorizontal: 10,
        borderRadius: 10,
        transform: [{ rotate: '15deg' }],
    },
    likeText: {
        color: '#22c55e',
        fontSize: 32,
        fontWeight: '900',
    },
    nopeOverlay: {
        position: 'absolute',
        top: 40,
        left: 40,
        borderWidth: 4,
        borderColor: Colors.error,
        paddingHorizontal: 10,
        borderRadius: 10,
        transform: [{ rotate: '-15deg' }],
    },
    nopeText: {
        color: Colors.error,
        fontSize: 32,
        fontWeight: '900',
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    emptyTitle: {
        fontSize: 24,
        fontWeight: '900',
        color: Colors.text,
        marginTop: 20,
    },
    emptySubtitle: {
        fontSize: 16,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 30,
        lineHeight: 22,
    },
    refreshBtn: {
        backgroundColor: Colors.accent,
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 12,
    },
    refreshBtnText: {
        color: Colors.white,
        fontWeight: '800',
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        width: '90%',
        padding: 40,
        borderRadius: 30,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 32,
        fontWeight: '900',
        color: Colors.white,
        marginTop: 20,
        marginBottom: 10,
    },
    modalSubtitle: {
        fontSize: 18,
        color: 'rgba(255,255,255,0.9)',
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 26,
    },
    modalActionBtn: {
        backgroundColor: Colors.white,
        paddingHorizontal: 40,
        paddingVertical: 18,
        borderRadius: 15,
        width: '100%',
        alignItems: 'center',
        marginBottom: 16,
    },
    modalActionText: {
        color: Colors.accent,
        fontSize: 18,
        fontWeight: '800',
    },
    modalSecondaryBtn: {
        paddingVertical: 10,
    },
    modalSecondaryText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '600',
        opacity: 0.8,
    },
});
