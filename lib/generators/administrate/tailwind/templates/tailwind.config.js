module.exports = {
  content: [
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/assets/stylesheets/**/*.css',
    './app/javascript/**/*.js',
    // Include Administrate gem views
    './vendor/bundle/ruby/*/gems/administrate-*/app/views/**/*.html.erb',
    './vendor/bundle/ruby/*/gems/administrate-*/app/assets/stylesheets/**/*.css',
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors for Administrate
        'admin-primary': '#1976d2',
        'admin-secondary': '#6c757d',
        'admin-success': '#28a745',
        'admin-warning': '#ffc107',
        'admin-danger': '#dc3545',
        'admin-info': '#17a2b8',
      },
      fontFamily: {
        // System font stack for better performance
        'sans': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
} 