// Associative fields component for Administrate
// Replaces jQuery/selectize with native JavaScript

(function() {
  function initializeAssociativeFields() {
    const selects = document.querySelectorAll('.field-unit--belongs-to select, .field-unit--has-many select, .field-unit--polymorphic select');

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

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search...';
    searchInput.className = 'block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-2 text-sm';

    // Style the select to fit with search
    select.style.display = 'none';
    select.id = select.id || 'select_' + Math.random().toString(36).substr(2, 9);

    // Create wrapper for the visible input and dropdown
    const visibleWrapper = document.createElement('div');
    visibleWrapper.className = 'relative';
    visibleWrapper.setAttribute('data-select-id', select.id);

    const displayInput = document.createElement('input');
    displayInput.type = 'text';
    displayInput.readOnly = true;
    displayInput.className = 'block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm cursor-pointer';
    displayInput.placeholder = 'Select an option...';

    if (select.value && select.selectedOptions[0]) {
      displayInput.value = select.selectedOptions[0].text;
    }

    const dropdown = document.createElement('div');
    dropdown.className = 'absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none hidden';
    dropdown.id = 'dropdown_' + select.id;

    const optionsContainer = document.createElement('div');

    select.options.forEach(option => {
      const optionElement = document.createElement('div');
      optionElement.className = 'cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 hover:text-gray-900';
      optionElement.textContent = option.text;
      optionElement.dataset.value = option.value;

      optionElement.addEventListener('click', function() {
        select.value = option.value;
        displayInput.value = option.text;
        dropdown.classList.add('hidden');
        displayInput.blur();

        // Trigger change event on original select
        const changeEvent = new Event('change', { bubbles: true });
        select.dispatchEvent(changeEvent);
      });

      optionsContainer.appendChild(optionElement);
    });

    dropdown.appendChild(optionsContainer);
    visibleWrapper.appendChild(displayInput);
    visibleWrapper.appendChild(dropdown);

    displayInput.addEventListener('click', function(e) {
      e.stopPropagation();
      const isHidden = dropdown.classList.contains('hidden');
      document.querySelectorAll('[data-select-id]').forEach(d => {
        d.querySelector('[id^="dropdown_"]').classList.add('hidden');
      });
      dropdown.classList.toggle('hidden', !isHidden);
      if (!isHidden) {
        searchInput.value = '';
        filterOptions(optionsContainer, '');
      }
    });

    searchInput.addEventListener('input', function(e) {
      filterOptions(optionsContainer, e.target.value);
    });

    document.addEventListener('click', function(e) {
      if (!visibleWrapper.contains(e.target)) {
        dropdown.classList.add('hidden');
      }
    });

    // Move search input and visible wrapper into position
    if (select.hasAttribute('data-search')) {
      wrapper.appendChild(searchInput);
    }
    wrapper.appendChild(visibleWrapper);

    // Keep select hidden but functional for form submission
    wrapper.appendChild(select);
  }

  function filterOptions(container, searchTerm) {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const options = container.querySelectorAll('div[data-value]');

    options.forEach(option => {
      const text = option.textContent.toLowerCase();
      option.style.display = text.includes(lowerSearchTerm) ? '' : 'none';
    });
  }

  // Initialize on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAssociativeFields);
  } else {
    initializeAssociativeFields();
  }

  // Re-initialize on Turbo navigation
  document.addEventListener('turbo:load', initializeAssociativeFields);
})();