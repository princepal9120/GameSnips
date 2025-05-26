import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Header } from '@/components/Header';
import { ImageSelector } from '@/components/ImageSelector';
import { useSnippetStore } from '@/store/snippetStore';
import { useThemeStore } from '@/store/themeStore';
import { lightTheme, darkTheme } from '@/constants/theme';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import { generateId } from '@/utils/helpers';

export default function CreateScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { addSnippet } = useSnippetStore();
  const isDark = useThemeStore((state) => state.isDark);
  const theme = isDark ? darkTheme : lightTheme;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    image: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      title: '',
      description: '',
      image: '',
    };

    if (!title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    } else if (title.length > 50) {
      newErrors.title = 'Title must be less than 50 characters';
      isValid = false;
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    } else if (description.length > 150) {
      newErrors.description = 'Description must be less than 150 characters';
      isValid = false;
    }

    if (!selectedImage) {
      newErrors.image = 'Please select an image';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const newSnippet = {
        id: generateId(),
        title,
        description,
        creatorName: creatorName || 'Anonymous',
        imageUrl: selectedImage,
        likes: 0,
        timestamp: Date.now(),
      };

      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      addSnippet(newSnippet);

      Alert.alert('Success', 'Your snippet has been created!');

      // Reset form
      setTitle('');
      setDescription('');
      setCreatorName('');
      setSelectedImage('');

      // Navigate back to feed
      router.push('/(tabs)');
    } catch (error) {
      Alert.alert('Error', 'Failed to create snippet. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: insets.top, backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <Header title="Create Snippet" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.text }]}>Title</Text>
          <TextInput
            style={[styles.input, {
              backgroundColor: theme.card,
              color: theme.text,
              borderColor: theme.border
            }]}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter snippet title"
            placeholderTextColor={theme.textSecondary}
            maxLength={50}
          />
          {errors.title ? <Text style={styles.errorText}>{errors.title}</Text> : null}
          <Text style={[styles.charCount, { color: theme.textSecondary }]}>{title.length}/50</Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.text }]}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea, {
              backgroundColor: theme.card,
              color: theme.text,
              borderColor: theme.border
            }]}
            value={description}
            onChangeText={setDescription}
            placeholder="Describe your game snippet"
            placeholderTextColor={theme.textSecondary}
            multiline
            maxLength={150}
          />
          {errors.description ? <Text style={styles.errorText}>{errors.description}</Text> : null}
          <Text style={[styles.charCount, { color: theme.textSecondary }]}>{description.length}/150</Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.text }]}>Your Name (optional)</Text>
          <TextInput
            style={[styles.input, {
              backgroundColor: theme.card,
              color: theme.text,
              borderColor: theme.border
            }]}
            value={creatorName}
            onChangeText={setCreatorName}
            placeholder="Enter your name"
            placeholderTextColor={theme.textSecondary}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.text }]}>Select an Image</Text>
          <ImageSelector
            selectedImage={selectedImage}
            onSelectImage={setSelectedImage}
          />
          {errors.image ? <Text style={styles.errorText}>{errors.image}</Text> : null}
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            { backgroundColor: theme.primary },
            isLoading && styles.submitButtonDisabled
          ]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={theme.card} />
          ) : (
            <Text style={[styles.submitButtonText, { color: theme.card }]}>Create Snippet</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xxxl,
  },
  formGroup: {
    marginBottom: SPACING.md,
  },
  label: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: SPACING.xs,
  },
  input: {
    borderRadius: 8,
    padding: SPACING.sm,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    borderWidth: 1,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: COLORS.error[500],
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginTop: SPACING.xs,
  },
  charCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'right',
  },
  submitButton: {
    borderRadius: 8,
    padding: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
});