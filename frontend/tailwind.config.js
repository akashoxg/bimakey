/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: '#1B6B5A',
          'teal-light': '#E8F5F0',
          'teal-hover': '#145248',
          navy: '#0C1220',
          'navy-light': '#1A2332',
          white: '#FAFAF8',
          amber: '#E07A2F',
          green: '#10B981',
          red: '#EF4444',
          border: '#E2E8F0',
          'text-primary': '#0C1220',
          'text-secondary': '#5E6E82',
          // Light theme specific
          'bg-primary': '#FAFAF8',
          'bg-elevated': '#FFFFFF',
          'bg-subtle': '#F0F4F2',
          'bg-warm': '#F9F7F4',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        data: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      fontSize: {
        'hero': ['3.75rem', { lineHeight: '1.08', fontWeight: '800', letterSpacing: '-0.02em' }],
        'hero-sm': ['2.5rem', { lineHeight: '1.12', fontWeight: '800', letterSpacing: '-0.02em' }],
        'section': ['2.5rem', { lineHeight: '1.15', fontWeight: '700', letterSpacing: '-0.015em' }],
        'section-sm': ['1.75rem', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.01em' }],
        'card-title': ['1.375rem', { lineHeight: '1.3', fontWeight: '600' }],
        'label': ['0.75rem', { lineHeight: '1', fontWeight: '600', letterSpacing: '0.06em' }],
      },
      borderRadius: {
        '2xl': '16px',
        'xl': '12px',
        '3xl': '24px',
      },
      boxShadow: {
        'soft': '0 2px 16px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 12px 40px rgba(27, 107, 90, 0.12)',
        'elevated': '0 8px 32px rgba(0, 0, 0, 0.08)',
        'dramatic': '0 20px 60px rgba(12, 18, 32, 0.15)',
        'glow': '0 0 32px rgba(27, 107, 90, 0.2)',
        'glow-amber': '0 0 32px rgba(224, 122, 47, 0.2)',
        'inner-glow': 'inset 0 1px 0 rgba(255,255,255,0.1)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slideDown': 'slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        'slideUp': 'slideUpAccordion 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        'marquee': 'marquee 40s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'reveal-up': 'revealUp 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        slideUpAccordion: {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        revealUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(27, 107, 90, 0.15)' },
          '50%': { boxShadow: '0 0 40px rgba(27, 107, 90, 0.3)' },
        },
      },
      maxWidth: {
        'container': '1280px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh-dark': 'radial-gradient(at 20% 20%, rgba(27, 107, 90, 0.15) 0px, transparent 50%), radial-gradient(at 80% 60%, rgba(224, 122, 47, 0.08) 0px, transparent 50%)',
        'mesh-light': 'radial-gradient(at 30% 0%, rgba(27, 107, 90, 0.06) 0px, transparent 50%), radial-gradient(at 80% 100%, rgba(224, 122, 47, 0.04) 0px, transparent 50%)',
        'mesh-light-hero': 'radial-gradient(at 20% 30%, rgba(27, 107, 90, 0.08) 0px, transparent 50%), radial-gradient(at 80% 70%, rgba(224, 122, 47, 0.05) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(27, 107, 90, 0.06) 0px, transparent 50%)',
      },
    },
  },
  plugins: [],
}
