import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';
import { SnippetCard } from '@/components/SnippetCard';
import { useSnippetStore } from '@/store/snippetStore';
import { useThemeStore } from '@/store/themeStore';
import { lightTheme, darkTheme } from '@/constants/theme';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import { User } from 'lucide-react-native';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { snippets, clearSnippets } = useSnippetStore();
  const isDark = useThemeStore((state) => state.isDark);
  const theme = isDark ? darkTheme : lightTheme;

  // For simplicity, we'll just show all snippets as if they're from the user
  // In a real app, you would filter based on the logged-in user
  const userSnippets = snippets;

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: theme.background }]}>
      <Header title="Profile" />

      <View style={[styles.profileSection, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <View style={[styles.avatarContainer, { backgroundColor: theme.primary }]}>
          <User size={40} color={theme.card} />
        </View>
        <Text style={[styles.username, { color: theme.text }]}>Game Enthusiast</Text>
        <Text style={[styles.bio, { color: theme.textSecondary }]}>Sharing my favorite gaming moments</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: theme.primary }]}>{userSnippets.length}</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Snippets</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: theme.primary }]}>{userSnippets.reduce((acc, curr) => acc + curr.likes, 0)}</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Likes</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.clearButton, { backgroundColor: COLORS.error[50] }]}
          onPress={clearSnippets}
        >
          <Text style={[styles.clearButtonText, { color: COLORS.error[600] }]}>Clear All Snippets</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.sectionTitle, { color: theme.text }]}>My Snippets</Text>

      {userSnippets.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={[styles.emptyStateText, { color: theme.textSecondary }]}>You haven't created any snippets yet.</Text>
        </View>
      ) : (
        <FlatList
          data={userSnippets}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SnippetCard snippet={item} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileSection: {
    padding: SPACING.md,
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  username: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
  },
  bio: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginTop: SPACING.xs,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: SPACING.md,
    width: '100%',
    justifyContent: 'center',
  },
  statItem: {
    alignItems: 'center',
    marginHorizontal: SPACING.md,
  },
  statNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  clearButton: {
    marginTop: SPACING.md,
    padding: SPACING.xs,
    borderRadius: 8,
  },
  clearButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    margin: SPACING.md,
  },
  listContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xxxl,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.md,
  },
  emptyStateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
});