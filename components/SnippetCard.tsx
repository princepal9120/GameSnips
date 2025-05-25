import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Heart } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import { Snippet } from '@/types/snippet';
import { useSnippetStore } from '@/store/snippetStore';
import { formatDate } from '@/utils/helpers';

interface SnippetCardProps {
  snippet: Snippet;
  onPress?: () => void;
}

export function SnippetCard({ snippet, onPress }: SnippetCardProps) {
  const { toggleLike } = useSnippetStore();
  
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  
  const heartAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });
  
  const handleLike = () => {
    scale.value = withSpring(0.95, { damping: 5 }, () => {
      scale.value = withSpring(1);
    });
    
    opacity.value = withTiming(0.7, { duration: 100, easing: Easing.ease }, () => {
      opacity.value = withTiming(1, { duration: 200 });
    });
    
    toggleLike(snippet.id);
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableOpacity 
        activeOpacity={0.9} 
        onPress={onPress}
        style={styles.touchable}
      >
        <Image
          source={{ uri: snippet.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title} numberOfLines={1}>
              {snippet.title}
            </Text>
            <TouchableOpacity onPress={handleLike} style={styles.likeButton}>
              <Animated.View style={heartAnimatedStyle}>
                <Heart
                  size={20}
                  color={COLORS.primary[500]}
                  fill={snippet.likes > 0 ? COLORS.primary[500] : 'transparent'}
                />
              </Animated.View>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.creator} numberOfLines={1}>
            By {snippet.creatorName}
          </Text>
          
          <Text style={styles.description} numberOfLines={2}>
            {snippet.description}
          </Text>
          
          <View style={styles.footer}>
            <Text style={styles.date}>{formatDate(snippet.timestamp)}</Text>
            {snippet.likes > 0 && (
              <Text style={styles.likes}>{snippet.likes} likes</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  touchable: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: COLORS.gray[200],
  },
  content: {
    padding: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: COLORS.gray[900],
    flex: 1,
    marginRight: SPACING.sm,
  },
  likeButton: {
    padding: 4,
  },
  creator: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: COLORS.gray[700],
    marginBottom: 8,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.gray[800],
    lineHeight: 20,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: COLORS.gray[500],
  },
  likes: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: COLORS.primary[500],
  },
});