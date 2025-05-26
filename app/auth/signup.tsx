import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/themeStore';
import { lightTheme, darkTheme } from '@/constants/theme';
import { SPACING } from '@/constants/spacing';
import { COLORS } from '@/constants/colors';

export default function SignUpScreen() {
  const router = useRouter();
  const { signUp, loading, error, clearError } = useAuthStore();
  const isDark = useThemeStore((state) => state.isDark);
  const theme = isDark ? darkTheme : lightTheme;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    if (!email || !password) return;
    await signUp(email, password);
    if (!error) {
      router.replace('/(tabs)');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <LinearGradient
        colors={[theme.primary, theme.primaryLight]}
        style={styles.header}
      >
        <Text style={[styles.title, { color: theme.card }]}>Create Account</Text>
        <Text style={[styles.subtitle, { color: theme.card }]}>
          Join our gaming community
        </Text>
      </LinearGradient>

      <View style={[styles.form, { backgroundColor: theme.card }]}>
        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.text }]}>Email</Text>
          <TextInput
            style={[styles.input, { 
              backgroundColor: theme.background,
              color: theme.text,
              borderColor: theme.border
            }]}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              clearError();
            }}
            placeholder="Enter your email"
            placeholderTextColor={theme.textSecondary}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.text }]}>Password</Text>
          <TextInput
            style={[styles.input, { 
              backgroundColor: theme.background,
              color: theme.text,
              borderColor: theme.border
            }]}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              clearError();
            }}
            placeholder="Choose a password"
            placeholderTextColor={theme.textSecondary}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={[
            styles.signUpButton,
            { backgroundColor: theme.primary },
            (!email || !password) && styles.signUpButtonDisabled
          ]}
          onPress={handleSignUp}
          disabled={loading || !email || !password}
        >
          {loading ? (
            <ActivityIndicator color={theme.card} />
          ) : (
            <Text style={[styles.signUpButtonText, { color: theme.card }]}>
              Sign Up
            </Text>
          )}
        </TouchableOpacity>

        <View style={styles.links}>
          <Text style={[styles.linkText, { color: theme.textSecondary }]}>
            Already have an account?{' '}
          </Text>
          <Link href="/auth/login" style={[styles.link, { color: theme.primary }]}>
            Sign In
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: SPACING.xl,
    paddingTop: SPACING.xxxl,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    opacity: 0.8,
  },
  form: {
    flex: 1,
    marginTop: -SPACING.xl,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: SPACING.xl,
  },
  inputGroup: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: SPACING.xs,
  },
  input: {
    height: 48,
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    borderWidth: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  signUpButton: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  signUpButtonDisabled: {
    opacity: 0.5,
  },
  signUpButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.error[500],
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  linkText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  link: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
});