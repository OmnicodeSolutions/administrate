(function() {
  'use strict';
  
  function DatepickerController() {
    this.typeValue = '';
    this.formatValue = '';
  }

  DatepickerController.prototype.connect = function() {
    this.typeValue = this.element.dataset.type || '';
    this.formatValue = this.element.dataset.format || '';
    
    this.setupDatePicker();
  };

  DatepickerController.prototype.setupDatePicker = function() {
    var input = this.element;
    
    input.classList.add("administrate-input");
    
    switch (this.typeValue) {
      case "date":
        input.type = "date";
        break;
      case "time":
        input.type = "time";
        input.step = "1";
        break;
      case "datetime":
        input.type = "datetime-local";
        input.step = "1";
        break;
      default:
        input.type = "text";
    }
    
    if (this.typeValue === "datetime" && input.value) {
      this.formatDateTimeValue(input);
    }
  };

  DatepickerController.prototype.formatDateTimeValue = function(input) {
    var value = input.value;
    if (value && value.includes("/")) {
      try {
        var parts = value.split(" ");
        var datePart = parts[0];
        var timePart = parts[1];
        var dateComponents = datePart.split("/");
        var day = dateComponents[0];
        var month = dateComponents[1];
        var year = dateComponents[2];
        var formattedValue = year + "-" + month.padStart(2, '0') + "-" + day.padStart(2, '0') + "T" + timePart;
        input.value = formattedValue;
      } catch (error) {
        console.warn("Could not format datetime value:", value);
      }
    }
  };

  DatepickerController.prototype.changed = function(event) {
    var input = event.target;
    
    if (this.typeValue === "datetime" && input.value) {
      var hiddenField = input.form && input.form.querySelector('input[name="' + input.name + '"][type="hidden"]');
      if (hiddenField) {
        var isoValue = input.value;
        try {
          var date = new Date(isoValue);
          var day = date.getDate().toString().padStart(2, '0');
          var month = (date.getMonth() + 1).toString().padStart(2, '0');
          var year = date.getFullYear();
          var hours = date.getHours().toString().padStart(2, '0');
          var minutes = date.getMinutes().toString().padStart(2, '0');
          var seconds = date.getSeconds().toString().padStart(2, '0');
          var formatted = day + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds;
          hiddenField.value = formatted;
        } catch (error) {
          hiddenField.value = isoValue;
        }
      }
    }
  };

  document.addEventListener('DOMContentLoaded', function() {
    if (window.Stimulus) {
      window.Stimulus.register("datepicker", DatepickerController);
    }
  });
})(); 