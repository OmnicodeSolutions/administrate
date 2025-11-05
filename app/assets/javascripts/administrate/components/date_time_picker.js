// DateTime Picker component for Administrate
// Replaces jQuery/datetimepicker with native HTML5 inputs

(function() {
  function initializeDateTimePickers() {
    const timeInputs = document.querySelectorAll('[data-type="time"]');
    const datetimeInputs = document.querySelectorAll('[data-type="datetime"]');
    const dateInputs = document.querySelectorAll('[data-type="date"]');

    timeInputs.forEach(input => {
      setupTimePicker(input);
    });

    datetimeInputs.forEach(input => {
      setupDateTimePicker(input);
    });

    dateInputs.forEach(input => {
      setupDatePicker(input);
    });
  }

  function setupTimePicker(input) {
    if (input.type !== 'time') {
      input.type = 'time';
    }

    addBaseStyles(input);
    addTimeValidation(input);
  }

  function setupDateTimePicker(input) {
    if (input.type !== 'datetime-local') {
      input.type = 'datetime-local';
    }

    addBaseStyles(input);
    addDateTimeValidation(input);
  }

  function setupDatePicker(input) {
    if (input.type !== 'date') {
      input.type = 'date';
    }

    addBaseStyles(input);
    addDateValidation(input);
  }

  function addBaseStyles(input) {
    input.classList.add(
      'block', 'w-full', 'rounded-md', 'border-gray-300',
      'shadow-sm', 'focus:border-blue-500', 'focus:ring-blue-500',
      'text-sm'
    );
  }

  function addTimeValidation(input) {
    input.addEventListener('blur', function() {
      validateTimeInput(input);
    });

    input.addEventListener('change', function() {
      validateTimeInput(input);
    });
  }

  function addDateTimeValidation(input) {
    input.addEventListener('blur', function() {
      validateDateTimeInput(input);
    });

    input.addEventListener('change', function() {
      validateDateTimeInput(input);
    });
  }

  function addDateValidation(input) {
    input.addEventListener('blur', function() {
      validateDateInput(input);
    });

    input.addEventListener('change', function() {
      validateDateInput(input);
    });
  }

  function validateTimeInput(input) {
    const value = input.value;
    const isValid = value === '' || /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/.test(value);

    if (isValid) {
      clearError(input);
    } else {
      showError(input, 'Please enter a valid time (HH:mm:ss)');
    }
  }

  function validateDateTimeInput(input) {
    const value = input.value;
    const isValid = value === '' || !isNaN(Date.parse(value));

    if (isValid) {
      clearError(input);
    } else {
      showError(input, 'Please enter a valid date and time');
    }
  }

  function validateDateInput(input) {
    const value = input.value;
    const isValid = value === '' || !isNaN(Date.parse(value));

    if (isValid) {
      clearError(input);
    } else {
      showError(input, 'Please enter a valid date');
    }
  }

  function showError(input, message) {
    input.classList.remove('border-gray-300', 'focus:border-blue-500', 'focus:ring-blue-500');
    input.classList.add('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');

    let errorElement = input.parentNode.querySelector('.datetime-error');
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'datetime-error text-red-600 text-sm mt-1';
      input.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
  }

  function clearError(input) {
    input.classList.remove('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');
    input.classList.add('border-gray-300', 'focus:border-blue-500', 'focus:ring-blue-500');

    const errorElement = input.parentNode.querySelector('.datetime-error');
    if (errorElement) {
      errorElement.remove();
    }
  }

  // Initialize on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDateTimePickers);
  } else {
    initializeDateTimePickers();
  }

  // Re-initialize on Turbo navigation
  document.addEventListener('turbo:load', initializeDateTimePickers);
})();