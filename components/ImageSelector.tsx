import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Text } from 'react-native';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import { PREDEFINED_IMAGES } from '@/constants/images';

interface ImageSelectorProps {
  selectedImage: string;
  onSelectImage: (imageUrl: string) => void;
}

export function ImageSelector({ selectedImage, onSelectImage }: ImageSelectorProps) {
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {PREDEFINED_IMAGES.map((image) => (
          <TouchableOpacity
            key={image.id}
            style={[
              styles.imageContainer,
              selectedImage === image.url && styles.selectedImageContainer
            ]}
            onPress={() => onSelectImage(image.url)}
          >
            <Image
              source={{ uri: image.url }}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.imageLabelContainer}>
              <Text style={styles.imageLabel} numberOfLines={1}>
                {image.label}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {selectedImage ? (
        <View style={styles.previewContainer}>
          <Text style={styles.previewLabel}>Selected Image:</Text>
          <Image
            source={{ uri: selectedImage }}
            style={styles.previewImage}
            resizeMode="cover"
          />
        </View>
      ) : (
        <View style={styles.noSelectionContainer}>
          <Text style={styles.noSelectionText}>Select an image from above</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.sm,
  },
  scrollContent: {
    paddingVertical: SPACING.sm,
  },
  imageContainer: {
    marginRight: SPACING.sm,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
    width: 120,
    height: 90,
  },
  selectedImageContainer: {
    borderColor: COLORS.primary[500],
  },
  image: {
    width: '100%',
    height: 70,
  },
  imageLabelContainer: {
    backgroundColor: COLORS.gray[800],
    padding: 4,
  },
  imageLabel: {
    color: COLORS.white,
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
  previewContainer: {
    marginTop: SPACING.md,
    alignItems: 'center',
  },
  previewLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: COLORS.gray[700],
    marginBottom: SPACING.xs,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  noSelectionContainer: {
    marginTop: SPACING.md,
    padding: SPACING.md,
    borderRadius: 8,
    backgroundColor: COLORS.gray[100],
    alignItems: 'center',
  },
  noSelectionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.gray[600],
  },
});