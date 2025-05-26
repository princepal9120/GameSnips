import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Heart } from 'lucide-react-native';
import { useSnippetStore } from '@/store/snippetStore';
import { useThemeStore } from '@/store/themeStore';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import { formatDate } from '@/utils/helpers';
import { lightTheme, darkTheme } from '@/constants/theme';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

export default function SnippetDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { snippets, toggleLike } = useSnippetStore();
    const isDark = useThemeStore(state => state.isDark);
    const theme = isDark ? darkTheme : lightTheme;

    const snippet = snippets.find(s => s.id === id);
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handleLike = () => {
        if (!snippet) return;

        scale.value = withSpring(1.3, { damping: 2 }, () => {
            scale.value = withSpring(1);
        });

        toggleLike(snippet.id);
    };

    if (!snippet) {
        return (
            <View style={[styles.container, { paddingTop: insets.top, backgroundColor: theme.background }]}>
                <Text style={[styles.errorText, { color: theme.error }]}>Snippet not found</Text>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Text style={{ color: theme.primary, fontFamily: 'Inter-SemiBold' }}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={[styles.container, { paddingTop: insets.top, backgroundColor: theme.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <ArrowLeft size={24} color={theme.text} />
                </TouchableOpacity>

                <Image
                    source={{ uri: snippet.imageUrl }}
                    style={styles.image}
                    resizeMode="cover"
                />

                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={[styles.title, { color: theme.text }]}>{snippet.title}</Text>
                        <TouchableOpacity onPress={handleLike}>
                            <Animated.View style={animatedStyle}>
                                <Heart
                                    size={28}
                                    color={theme.primary}
                                    fill={snippet.likes > 0 ? theme.primary : 'transparent'}
                                />
                            </Animated.View>
                        </TouchableOpacity>
                    </View>

                    <Text style={[styles.creator, { color: theme.subtext }]}>By {snippet.creatorName}</Text>
                    <Text style={[styles.date, { color: theme.muted }]}>
                        {formatDate(snippet.timestamp)}
                    </Text>

                    <View style={[styles.statsRow, { borderColor: theme.border }]}>
                        <View style={styles.stat}>
                            <Heart size={16} color={theme.primary} fill={theme.primary} />
                            <Text style={[styles.statText, { color: theme.subtext }]}>{snippet.likes} likes</Text>
                        </View>
                    </View>

                    <Text style={[styles.descriptionLabel, { color: theme.text }]}>Description</Text>
                    <Text style={[styles.description, { color: theme.subtext }]}>{snippet.description}</Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        flex: 1,
        marginRight: SPACING.sm,
    },
    creator: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 16,
        marginBottom: SPACING.xs,
    },
    date: {
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        marginBottom: SPACING.md,
    },
    statsRow: {
        flexDirection: 'row',
        marginBottom: SPACING.md,
        paddingVertical: SPACING.sm,
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    stat: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: SPACING.md,
    },
    statText: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 14,
        marginLeft: 4,
    },
    descriptionLabel: {
        fontFamily: 'Inter-Bold',
        fontSize: 18,
        marginBottom: SPACING.xs,
    },
    description: {
        fontFamily: 'Inter-Regular',
        fontSize: 16,
        lineHeight: 24,
    },
    errorText: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 18,
        textAlign: 'center',
        marginTop: SPACING.xl,
    },
});
