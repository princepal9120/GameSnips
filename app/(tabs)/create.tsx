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
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import { generateId } from '@/utils/helpers';

export default function CreateScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { addSnippet } = useSnippetStore();
  
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
      style={[styles.container, { paddingTop: insets.top }]} 
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
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter snippet title"
            maxLength={50}
          />
          {errors.title ? <Text style={styles.errorText}>{errors.title}</Text> : null}
          <Text style={styles.charCount}>{title.length}/50</Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Describe your game snippet"
            multiline
            maxLength={150}
          />
          {errors.description ? <Text style={styles.errorText}>{errors.description}</Text> : null}
          <Text style={styles.charCount}>{description.length}/150</Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Your Name (optional)</Text>
          <TextInput
            style={styles.input}
            value={creatorName}
            onChangeText={setCreatorName}
            placeholder="Enter your name"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Select an Image</Text>
          <ImageSelector 
            selectedImage={selectedImage}
            onSelectImage={setSelectedImage}
          />
          {errors.image ? <Text style={styles.errorText}>{errors.image}</Text> : null}
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            isLoading && styles.submitButtonDisabled
          ]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.submitButtonText}>Create Snippet</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
    color: COLORS.gray[800],
  },
  input: {
    backgroundColor: COLORS.gray[100],
    borderRadius: 8,
    padding: SPACING.sm,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: COLORS.gray[900],
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
    color: COLORS.gray[500],
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'right',
  },
  submitButton: {
    backgroundColor: COLORS.primary[500],
    borderRadius: 8,
    padding: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  submitButtonDisabled: {
    backgroundColor: COLORS.primary[300],
  },
  submitButtonText: {
    color: COLORS.white,
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
});