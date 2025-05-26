import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/themeStore';
import { lightTheme, darkTheme } from '@/constants/theme';
import { SPACING } from '@/constants/spacing';

export default function LoginScreen() {
    const router = useRouter();
    const { signIn, loading, error, clearError } = useAuthStore();
    const isDark = useThemeStore((state) => state.isDark);
    const theme = isDark ? darkTheme : lightTheme;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!email || !password) return;
        await signIn(email, password);
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
                <Text style={[styles.title, { color: theme.card }]}>Welcome Back!</Text>
                <Text style={[styles.subtitle, { color: theme.card }]}>
                    Sign in to continue sharing your gaming moments
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
                        placeholder="Enter your password"
                        placeholderTextColor={theme.textSecondary}
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity
                    style={[
                        styles.loginButton,
                        { backgroundColor: theme.primary },
                        (!email || !password) && styles.loginButtonDisabled
                    ]}
                    onPress={handleLogin}
                    disabled={loading || !email || !password}
                >
                    {loading ? (
                        <ActivityIndicator color={theme.card} />
                    ) : (
                        <Text style={[styles.loginButtonText, { color: theme.card }]}>
                            Sign In
                        </Text>
                    )}
                </TouchableOpacity>

                <View style={styles.links}>
                    <Link href="/auth/reset-password" style={[styles.link, { color: theme.primary }]}>
                        Forgot Password?
                    </Link>
                    <Link href="/auth/signup" style={[styles.link, { color: theme.primary }]}>
                        Create Account
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
    loginButton: {
        height: 48,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SPACING.md,
    },
    loginButtonDisabled: {
        opacity: 0.5,
    },
    loginButtonText: {
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
        justifyContent: 'space-between',
        marginTop: SPACING.lg,
    },
    link: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 14,
    },
});