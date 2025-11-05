// DateTime Picker Controller for Administrate
(function() {
  if (typeof Stimulus === 'undefined') {
    console.warn('Stimulus not available for datetime picker controller')
    return
  }

  class DateTimePickerController extends Stimulus.Controller {
    static values = { 
      format: String,
      minDate: String,
      maxDate: String
    }

    connect() {
      this.setupDateTimePicker()
    }

    setupDateTimePicker() {
      this.element.classList.add(
        "block", "w-full", "rounded-md", "border-gray-300", 
        "shadow-sm", "focus:border-blue-500", "focus:ring-blue-500"
      )

      if (this.minDateValue) {
        this.element.min = this.minDateValue
      }
      
      if (this.maxDateValue) {
        this.element.max = this.maxDateValue
      }

      this.setupInputType()
      this.addValidation()
    }

    setupInputType() {
      const inputType = this.element.type
      
      switch (inputType) {
        case "datetime-local":
          this.setupDateTimeLocal()
          break
        case "date":
          this.setupDate()
          break
        case "time":
          this.setupTime()
          break
        default:
          this.setupTextFallback()
      }
    }

    setupDateTimeLocal() {
      if (!this.element.value && this.data.get("default") === "now") {
        const now = new Date()
        const offset = now.getTimezoneOffset() * 60000
        const localISOTime = (new Date(now - offset)).toISOString().slice(0, 16)
        this.element.value = localISOTime
      }
    }

    setupDate() {
      if (!this.element.value && this.data.get("default") === "today") {
        const today = new Date().toISOString().split('T')[0]
        this.element.value = today
      }
    }

    setupTime() {
      if (!this.element.value && this.data.get("default") === "now") {
        const now = new Date()
        const timeString = now.toTimeString().slice(0, 5)
        this.element.value = timeString
      }
    }

    setupTextFallback() {
      this.element.placeholder = this.formatValue || "Enter date/time"
      
      if (this.formatValue) {
        this.element.pattern = this.getPatternFromFormat(this.formatValue)
      }
    }

    addValidation() {
      this.element.addEventListener("blur", () => {
        this.validateInput()
      })

      this.element.addEventListener("change", () => {
        this.validateInput()
      })
    }

    validateInput() {
      const value = this.element.value
      const isValid = this.element.checkValidity()
      
      if (isValid) {
        this.element.classList.remove("border-red-500", "focus:border-red-500", "focus:ring-red-500")
        this.element.classList.add("border-gray-300", "focus:border-blue-500", "focus:ring-blue-500")
        this.clearErrorMessage()
      } else {
        this.element.classList.remove("border-gray-300", "focus:border-blue-500", "focus:ring-blue-500")
        this.element.classList.add("border-red-500", "focus:border-red-500", "focus:ring-red-500")
        this.showErrorMessage()
      }
    }

    showErrorMessage() {
      let errorElement = this.element.parentNode.querySelector(".error-message")
      if (!errorElement) {
        errorElement = document.createElement("div")
        errorElement.className = "error-message text-red-600 text-sm mt-1"
        this.element.parentNode.appendChild(errorElement)
      }
      errorElement.textContent = this.element.validationMessage
    }

    clearErrorMessage() {
      const errorElement = this.element.parentNode.querySelector(".error-message")
      if (errorElement) {
        errorElement.remove()
      }
    }

    getPatternFromFormat(format) {
      return format
        .replace(/Y/g, "\\d{4}")
        .replace(/m/g, "\\d{2}")
        .replace(/d/g, "\\d{2}")
        .replace(/H/g, "\\d{2}")
        .replace(/i/g, "\\d{2}")
        .replace(/s/g, "\\d{2}")
    }
  }

  // Register the controller when Stimulus is ready
  if (window.Stimulus) {
    window.Stimulus.register("datetime-picker", DateTimePickerController)
  } else {
    document.addEventListener("DOMContentLoaded", function() {
      if (window.Stimulus) {
        window.Stimulus.register("datetime-picker", DateTimePickerController)
      }
    })
  }
})(); 