import { tokens } from './tokens';

export const theme = {
  tokens,

  // Semantic color mappings
  semantic: {
    // Text colors
    text: {
      primary: tokens.colors.neutral[900],
      secondary: tokens.colors.neutral[600],
      muted: tokens.colors.neutral[400],
      inverse: '#FFFFFF',
    },

    // Border colors
    border: {
      default: tokens.colors.neutral[200],
      muted: tokens.colors.neutral[100],
      focus: tokens.colors.primary[500],
    },

    // Interactive states
    interactive: {
      hover: tokens.colors.neutral[50],
      active: tokens.colors.neutral[100],
      disabled: tokens.colors.neutral[200],
    },
  },

  // Component-specific tokens
  components: {
    card: {
      background: tokens.colors.background.card,
      border: tokens.colors.neutral[200],
      radius: tokens.radii['2xl'],
      shadow: tokens.shadows.card,
      padding: tokens.spacing[6],
    },

    button: {
      radius: tokens.radii.lg,
      paddingX: tokens.spacing[4],
      paddingY: tokens.spacing[2],
    },

    input: {
      radius: tokens.radii.lg,
      border: tokens.colors.neutral[300],
      focusBorder: tokens.colors.primary[500],
    },

    badge: {
      radius: tokens.radii.full,
      paddingX: tokens.spacing[3],
      paddingY: tokens.spacing[1],
    },
  },
} as const;

export type Theme = typeof theme;
