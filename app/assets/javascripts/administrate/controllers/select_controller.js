(function() {
  'use strict';
  
  function SelectController() {
    this.selectTargets = [];
    this.searchTargets = [];
    this.dropdownTargets = [];
    this.optionTargets = [];
    this.multipleValue = false;
    this.searchableValue = false;
    this.placeholderValue = '';
    this.isOpen = false;
  }

  SelectController.prototype.connect = function() {
    this.multipleValue = this.element.dataset.multiple === 'true';
    this.searchableValue = this.element.dataset.searchable === 'true';
    this.placeholderValue = this.element.dataset.placeholder || '';
    
    this.setupSelect();
  };

  SelectController.prototype.setupSelect = function() {
    var select = this.element.querySelector('select') || this.element;
    
    if (this.searchableValue) {
      select.classList.add("searchable-select");
    }
    
    if (this.multipleValue) {
      select.classList.add("multiple-select");
    }

    select.classList.add(
      "administrate-input",
      "focus:ring-2", 
      "focus:ring-blue-500", 
      "focus:border-blue-500"
    );
  };

  SelectController.prototype.toggle = function() {
    this.isOpen = !this.isOpen;
    var dropdown = this.element.querySelector('[data-select-target="dropdown"]');
    if (dropdown) {
      dropdown.classList.toggle("hidden", !this.isOpen);
    }
  };

  SelectController.prototype.close = function() {
    this.isOpen = false;
    var dropdown = this.element.querySelector('[data-select-target="dropdown"]');
    if (dropdown) {
      dropdown.classList.add("hidden");
    }
  };

  SelectController.prototype.selectOption = function(event) {
    var option = event.currentTarget;
    var value = option.dataset.value;
    var select = this.element.querySelector('select');
    
    var selectOption = select && select.querySelector('option[value="' + value + '"]');
    if (selectOption) {
      selectOption.selected = true;
      var changeEvent = document.createEvent('Event');
      changeEvent.initEvent('change', true, true);
      select.dispatchEvent(changeEvent);
    }
    
    if (!this.multipleValue) {
      this.close();
    }
  };

  SelectController.prototype.search = function(event) {
    var query = event.target.value.toLowerCase();
    var options = this.element.querySelectorAll('[data-select-target="option"]');
    
    for (var i = 0; i < options.length; i++) {
      var option = options[i];
      var text = option.textContent.toLowerCase();
      option.classList.toggle("hidden", !text.includes(query));
    }
  };

  document.addEventListener('DOMContentLoaded', function() {
    if (window.Stimulus) {
      window.Stimulus.register("select", SelectController);
    }
  });
})(); 