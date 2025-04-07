export const theme = {
  colors: {
    background: '#FFFAF0',     // Cream background
    surface: '#FFFFFF',        // White surface
    text: {
      primary: '#3A3A3A',      // Dark slate for primary text
      secondary: '#666666',    // Medium gray for secondary text
      muted: '#999999'         // Light gray for muted text
    },
    brand: {
      primary: '#7B8C94',      // Muted slate blue
      secondary: '#D0C8B0',    // Warm taupe
      accent: '#6D597A'        // Muted purple
    },
    feedback: {
      info: 'rgba(109, 89, 122, 0.1)'  // Light purple for information
    }
  },
  fonts: {
    body: "'Spectral', Georgia, serif",
    mono: "'IBM Plex Mono', monospace"
  },
  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    md: '1rem',       // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    xxl: '1.5rem',    // 24px
    xxxl: '2rem'      // 32px
  },
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    xxl: '3rem'       // 48px
  },
  borderRadius: {
    sm: '2px',
    md: '4px',
    lg: '8px'
  },
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)'
  },
  transitions: {
    fast: '0.1s ease',
    normal: '0.2s ease',
    slow: '0.3s ease'
  }
};

export type Theme = typeof theme;