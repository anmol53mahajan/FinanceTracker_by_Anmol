export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 20px 80px rgba(99, 102, 241, 0.16)',
      },
      colors: {
        surface: 'var(--surface)',
        'surface-strong': 'var(--surface-strong)',
        border: 'var(--border)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        primary: 'var(--primary)',
        'primary-soft': 'var(--primary-soft)',
        success: 'var(--success)',
        danger: 'var(--danger)',
      },
      borderRadius: {
        xl: '0.75rem',
      },
    },
  },
  plugins: [],
}