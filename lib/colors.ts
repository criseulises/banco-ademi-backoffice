/**
 * Official Banco ADEMI Color Palette
 * Colores oficiales para el Backoffice
 */

export const colors = {
  // PRIMARY COLORS - Banco ADEMI
  primary: '#0095A9',
  primaryLight: '#00B8D4',
  primaryDark: '#007A8A',
  primaryVariant: '#008296',

  // SECONDARY COLORS - Banco ADEMI
  secondary: '#FA6C26',
  secondaryLight: '#FC8548',
  secondaryDark: '#E85A15',

  // NEUTRAL COLORS
  white: '#FFFFFF',
  black: '#000000',
  
  grey50: '#FAFAFA',
  grey100: '#F5F6FB', // Background ADEMI
  grey200: '#EEEFF5',
  grey300: '#E0E0E0',
  grey400: '#BDBDBD',
  grey500: '#9E9E9E',
  grey600: '#757575',
  grey700: '#616161',
  grey800: '#424242',
  grey900: '#0C0A18', // Text ADEMI

  // BACKGROUND COLORS
  background: '#F5F6FB',
  surface: '#FFFFFF',
  cardBackground: '#FFFFFF',

  // TEXT COLORS
  textPrimary: '#0C0A18',
  textSecondary: '#757575',
  textHint: '#BDBDBD',
  textDisabled: '#E0E0E0',
  textWhite: '#FFFFFF',

  // STATE COLORS
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FF9800',
  info: '#2196F3',

  // BORDER COLORS
  border: '#E0E0E0',
  borderFocused: '#0066CC',
  borderError: '#F44336',
} as const

export type Colors = typeof colors
