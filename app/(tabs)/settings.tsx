import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeStore } from '@/store/themeStore';
import { useAuthStore } from '@/store/authStore';
import { Header } from '@/components/Header';
import { lightTheme, darkTheme } from '@/constants/theme';
import { SPACING } from '@/constants/spacing';
import { Moon, Sun, LogOut } from 'lucide-react-native';

export default function SettingsScreen() {
    const insets = useSafeAreaInsets();
    const { theme, setTheme, isDark } = useThemeStore();
    const { logout } = useAuthStore();

    const currentTheme = isDark ? darkTheme : lightTheme;

    const handleThemeChange = () => {
        setTheme(theme === 'system'
            ? isDark ? 'light' : 'dark'
            : theme === 'dark' ? 'light' : 'dark'
        );
    };

    const handleSystemThemeToggle = () => {
        setTheme(theme === 'system' ? (isDark ? 'dark' : 'light') : 'system');
    };

    return (
        <View style={[
            styles.container,
            { paddingTop: insets.top, backgroundColor: currentTheme.background }
        ]}>
            <Header title="Settings" />

            <View style={[styles.section, { backgroundColor: currentTheme.card }]}>
                <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>
                    Appearance
                </Text>

                <View style={styles.settingRow}>
                    <View style={styles.settingInfo}>
                        {isDark ? (
                            <Moon size={24} color={currentTheme.text} />
                        ) : (
                            <Sun size={24} color={currentTheme.text} />
                        )}
                        <Text style={[styles.settingLabel, { color: currentTheme.text }]}>
                            Dark Mode
                        </Text>
                    </View>
                    <Switch
                        value={isDark}
                        onValueChange={handleThemeChange}
                        trackColor={{ false: currentTheme.border, true: currentTheme.primary }}
                    />
                </View>

                <View style={styles.settingRow}>
                    <View style={styles.settingInfo}>
                        <Text style={[styles.settingLabel, { color: currentTheme.text }]}>
                            Use System Theme
                        </Text>
                    </View>
                    <Switch
                        value={theme === 'system'}
                        onValueChange={handleSystemThemeToggle}
                        trackColor={{ false: currentTheme.border, true: currentTheme.primary }}
                    />
                </View>
            </View>

            <View style={[styles.section, { backgroundColor: currentTheme.card }]}>
                <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>
                    Account
                </Text>

                <TouchableOpacity
                    style={styles.settingRow}
                    onPress={logout}
                >
                    <View style={styles.settingInfo}>
                        <LogOut size={24} color={currentTheme.error} />
                        <Text style={[styles.settingLabel, { color: currentTheme.error }]}>
                            Sign Out
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    section: {
        marginTop: SPACING.md,
        paddingVertical: SPACING.md,
    },
    sectionTitle: {
        fontFamily: 'Inter-Bold',
        fontSize: 18,
        marginBottom: SPACING.sm,
        paddingHorizontal: SPACING.md,
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: SPACING.sm,
        paddingHorizontal: SPACING.md,
    },
    settingInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingLabel: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 16,
        marginLeft: SPACING.sm,
    },
});