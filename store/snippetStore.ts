import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Snippet } from '@/types/snippet';
import { MOCK_SNIPPETS } from '@/utils/mockData';

interface SnippetState {
  snippets: Snippet[];
  fetchSnippets: () => Promise<void>;
  addSnippet: (snippet: Snippet) => void;
  toggleLike: (snippetId: string) => void;
  clearSnippets: () => void;
}

export const useSnippetStore = create<SnippetState>()(
  persist(
    (set, get) => ({
      snippets: MOCK_SNIPPETS,
      
      fetchSnippets: async () => {
        // In a real app, this would be an API call
        // For demo purposes, we'll just return the mock data
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        set({ snippets: MOCK_SNIPPETS });
      },
      
      addSnippet: (snippet: Snippet) => {
        set(state => ({
          snippets: [snippet, ...state.snippets],
        }));
      },
      
      toggleLike: (snippetId: string) => {
        set(state => ({
          snippets: state.snippets.map(snippet => 
            snippet.id === snippetId
              ? { ...snippet, likes: snippet.likes > 0 ? 0 : 1 }
              : snippet
          ),
        }));
      },
      
      clearSnippets: () => {
        set({ snippets: [] });
      },
    }),
    {
      name: 'snippets-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);