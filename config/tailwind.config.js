module.exports = {
  content: [
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/assets/stylesheets/**/*.css',
    './app/javascript/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#111827',
          950: '#020617',
        },
        secondary: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
        accent: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        }
      }
    },
  },
  plugins: [],
  safelist: [
    'transform', 'rotate-180', 'rotate-0', 'rotate-90', 'rotate-45', '-rotate-180', '-rotate-90', '-rotate-45',
    'block', 'w-full', 'mt-1', 'rounded-md', 'border', 'border-gray-300', 'shadow-sm', 'text-sm', 'leading-5',
    // Theme color classes
    'bg-primary-50', 'bg-primary-100', 'bg-primary-200', 'bg-primary-300', 'bg-primary-400', 'bg-primary-500', 'bg-primary-600', 'bg-primary-700', 'bg-primary-800', 'bg-primary-900',
    'text-primary-50', 'text-primary-100', 'text-primary-200', 'text-primary-300', 'text-primary-400', 'text-primary-500', 'text-primary-600', 'text-primary-700', 'text-primary-800', 'text-primary-900',
    'border-primary-50', 'border-primary-100', 'border-primary-200', 'border-primary-300', 'border-primary-400', 'border-primary-500', 'border-primary-600', 'border-primary-700', 'border-primary-800', 'border-primary-900',
    'hover:bg-primary-50', 'hover:bg-primary-100', 'hover:bg-primary-200', 'hover:bg-primary-300', 'hover:bg-primary-400', 'hover:bg-primary-500', 'hover:bg-primary-600', 'hover:bg-primary-700', 'hover:bg-primary-800', 'hover:bg-primary-900',
    'focus:ring-primary-50', 'focus:ring-primary-100', 'focus:ring-primary-200', 'focus:ring-primary-300', 'focus:ring-primary-400', 'focus:ring-primary-500', 'focus:ring-primary-600', 'focus:ring-primary-700', 'focus:ring-primary-800', 'focus:ring-primary-900',
    'bg-secondary-50', 'bg-secondary-100', 'bg-secondary-200', 'bg-secondary-300', 'bg-secondary-400', 'bg-secondary-500', 'bg-secondary-600', 'bg-secondary-700', 'bg-secondary-800', 'bg-secondary-900',
    'text-secondary-50', 'text-secondary-100', 'text-secondary-200', 'text-secondary-300', 'text-secondary-400', 'text-secondary-500', 'text-secondary-600', 'text-secondary-700', 'text-secondary-800', 'text-secondary-900',
    'border-secondary-50', 'border-secondary-100', 'border-secondary-200', 'border-secondary-300', 'border-secondary-400', 'border-secondary-500', 'border-secondary-600', 'border-secondary-700', 'border-secondary-800', 'border-secondary-900',
    'hover:bg-secondary-50', 'hover:bg-secondary-100', 'hover:bg-secondary-200', 'hover:bg-secondary-300', 'hover:bg-secondary-400', 'hover:bg-secondary-500', 'hover:bg-secondary-600', 'hover:bg-secondary-700', 'hover:bg-secondary-800', 'hover:bg-secondary-900',
  ]
} 