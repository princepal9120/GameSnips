import { COLORS } from './colors';

export const lightTheme = {
    background: COLORS.gray[50],
    card: COLORS.white,
    text: COLORS.gray[900],
    textSecondary: COLORS.gray[600],
    border: COLORS.gray[200],
    primary: COLORS.primary[500],
    primaryLight: COLORS.primary[100],
    error: COLORS.error[500],
    success: COLORS.success[500],
    tabBar: COLORS.white,
    tabBarInactive: COLORS.gray[400],
};

export const darkTheme = {
    background: COLORS.gray[900],
    card: COLORS.gray[800],
    text: COLORS.gray[50],
    textSecondary: COLORS.gray[400],
    border: COLORS.gray[700],
    primary: COLORS.primary[400],
    primaryLight: COLORS.primary[900],
    error: COLORS.error[400],
    success: COLORS.success[400],
    tabBar: COLORS.gray[800],
    tabBarInactive: COLORS.gray[500],
};

export type Theme = typeof lightTheme;