import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';
import { SnippetCard } from '@/components/SnippetCard';
import { useSnippetStore } from '@/store/snippetStore';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import { User } from 'lucide-react-native';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { snippets, clearSnippets } = useSnippetStore();

  // For simplicity, we'll just show all snippets as if they're from the user
  // In a real app, you would filter based on the logged-in user
  const userSnippets = snippets;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header title="Profile" />

      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <User size={40} color={COLORS.white} />
        </View>
        <Text style={styles.username}>Game Enthusiast</Text>
        <Text style={styles.bio}>Sharing my favorite gaming moments</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userSnippets.length}</Text>
            <Text style={styles.statLabel}>Snippets</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userSnippets.reduce((acc, curr) => acc + curr.likes, 0)}</Text>
            <Text style={styles.statLabel}>Likes</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.clearButton} onPress={clearSnippets}>
          <Text style={styles.clearButtonText}>Clear All Snippets</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>My Snippets</Text>

      {userSnippets.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>You haven't created any snippets yet.</Text>
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
    backgroundColor: COLORS.gray[50],
  },
  profileSection: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[200],
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  username: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: COLORS.gray[900],
  },
  bio: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.gray[600],
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
    color: COLORS.primary[500],
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.gray[600],
  },
  clearButton: {
    marginTop: SPACING.md,
    padding: SPACING.xs,
    backgroundColor: COLORS.error[50],
    borderRadius: 8,
  },
  clearButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: COLORS.error[600],
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: COLORS.gray[900],
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
    color: COLORS.gray[600],
    textAlign: 'center',
  },
});