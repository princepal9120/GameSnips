import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useState, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { SnippetCard } from '@/components/SnippetCard';
import { Header } from '@/components/Header';
import { useSnippetStore } from '@/store/snippetStore';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';

export default function FeedScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const { snippets, fetchSnippets } = useSnippetStore();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchSnippets();
    setRefreshing(false);
  }, [fetchSnippets]);

  const handleSnippetPress = (id: string) => {
    router.push(`/snippet/${id}`);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header title="GameSnips" />
      <FlatList
        data={snippets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SnippetCard
            snippet={item}
            onPress={() => handleSnippetPress(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary[500]]}
            tintColor={COLORS.primary[500]}
          />
        }
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        windowSize={5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray[50],
  },
  listContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xxxl,
  },
});