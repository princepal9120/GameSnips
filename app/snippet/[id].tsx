import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Heart } from 'lucide-react-native';
import { useSnippetStore } from '@/store/snippetStore';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import { formatDate } from '@/utils/helpers';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

export default function SnippetDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { snippets, toggleLike } = useSnippetStore();

    const snippet = snippets.find(s => s.id === id);

    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    const handleLike = () => {
        if (!snippet) return;

        scale.value = withSpring(1.3, { damping: 2 }, () => {
            scale.value = withSpring(1);
        });

        toggleLike(snippet.id);
    };

    if (!snippet) {
        return (
            <View style={[styles.container, { paddingTop: insets.top }]}>
                <Text style={styles.errorText}>Snippet not found</Text>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Text style={styles.backButtonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <ArrowLeft size={24} color={COLORS.gray[800]} />
                </TouchableOpacity>

                <Image
                    source={{ uri: snippet.imageUrl }}
                    style={styles.image}
                    resizeMode="cover"
                />

                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{snippet.title}</Text>
                        <TouchableOpacity onPress={handleLike}>
                            <Animated.View style={animatedStyle}>
                                <Heart
                                    size={28}
                                    color={COLORS.primary[500]}
                                    fill={snippet.likes > 0 ? COLORS.primary[500] : 'transparent'}
                                />
                            </Animated.View>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.creator}>By {snippet.creatorName}</Text>
                    <Text style={styles.date}>{formatDate(snippet.timestamp)}</Text>

                    <View style={styles.statsRow}>
                        <View style={styles.stat}>
                            <Heart size={16} color={COLORS.primary[500]} fill={COLORS.primary[500]} />
                            <Text style={styles.statText}>{snippet.likes} likes</Text>
                        </View>
                    </View>

                    <Text style={styles.descriptionLabel}>Description</Text>
                    <Text style={styles.description}>{snippet.description}</Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    scrollContent: {
        flexGrow: 1,
    },
    backButton: {
        position: 'absolute',
        top: SPACING.md,
        left: SPACING.md,
        zIndex: 10,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        padding: 8,
    },
    backButtonText: {
        fontFamily: 'Inter-SemiBold',
        color: COLORS.primary[500],
    },
    image: {
        width: '100%',
        height: 300,
    },
    content: {
        padding: SPACING.md,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.sm,
    },
    title: {
        fontFamily: 'Inter-Bold',
        fontSize: 24,
        color: COLORS.gray[900],
        flex: 1,
        marginRight: SPACING.sm,
    },
    creator: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 16,
        color: COLORS.gray[700],
        marginBottom: SPACING.xs,
    },
    date: {
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        color: COLORS.gray[500],
        marginBottom: SPACING.md,
    },
    statsRow: {
        flexDirection: 'row',
        marginBottom: SPACING.md,
        paddingVertical: SPACING.sm,
        borderTopWidth: 1,
        borderBottomWidth: SPACING.xs,
        borderColor: COLORS.gray[200],
    },
    stat: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: SPACING.md,
    },
    statText: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 14,
        color: COLORS.gray[700],
        marginLeft: 4,
    },
    descriptionLabel: {
        fontFamily: 'Inter-Bold',
        fontSize: 18,
        color: COLORS.gray[900],
        marginBottom: SPACING.xs,
    },
    description: {
        fontFamily: 'Inter-Regular',
        fontSize: 16,
        color: COLORS.gray[800],
        lineHeight: 24,
    },
    errorText: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 18,
        color: COLORS.error[500],
        textAlign: 'center',
        marginTop: SPACING.xl,
    },
});