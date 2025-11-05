// Select component for Administrate
// Replaces jQuery/selectize with native JavaScript

(function() {
  function initializeSelectFields() {
    const selects = document.querySelectorAll('.field-unit--select select');

    selects.forEach(select => {
      // Add Tailwind classes for styling
      select.classList.add(
        'block', 'w-full', 'rounded-md', 'border-gray-300',
        'shadow-sm', 'focus:border-blue-500', 'focus:ring-blue-500',
        'text-sm'
      );

      // Only add search if there are many options
      if (select.options.length > 10) {
        addSearchToSelect(select);
      }
    });
  }

  function addSearchToSelect(select) {
    const wrapper = document.createElement('div');
    wrapper.className = 'relative';
    select.parentNode.insertBefore(wrapper, select);
    wrapper.appendChild(select);

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search...';
    searchInput.className = 'block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-2 text-sm';

    wrapper.insertBefore(searchInput, select);

    searchInput.addEventListener('input', function(e) {
      filterOptions(select, e.target.value);
    });
  }

  function filterOptions(select, searchTerm) {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const options = Array.from(select.options);

    options.forEach(option => {
      const text = option.textContent.toLowerCase();
      option.style.display = text.includes(lowerSearchTerm) ? '' : 'none';
    });
  }

  // Initialize on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSelectFields);
  } else {
    initializeSelectFields();
  }

  // Re-initialize on Turbo navigation
  document.addEventListener('turbo:load', initializeSelectFields);
})();