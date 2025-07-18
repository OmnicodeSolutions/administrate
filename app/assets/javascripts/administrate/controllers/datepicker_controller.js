import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { 
    type: String,
    format: String 
  }

  connect() {
    this.setupDatePicker()
  }

  setupDatePicker() {
    const input = this.element
    
    // Add Tailwind classes for consistent styling
    input.classList.add("administrate-input")
    
    // Set appropriate input type based on data-type
    switch (this.typeValue) {
      case "date":
        input.type = "date"
        break
      case "time":
        input.type = "time"
        input.step = "1" // for seconds
        break
      case "datetime":
        input.type = "datetime-local"
        input.step = "1" // for seconds
        break
      default:
        input.type = "text"
    }
    
    // For datetime fields, we might need to format the value
    if (this.typeValue === "datetime" && input.value) {
      this.formatDateTimeValue(input)
    }
  }

  formatDateTimeValue(input) {
    // Convert from DD/MM/YYYY HH:mm:ss to YYYY-MM-DDTHH:mm:ss format
    const value = input.value
    if (value && value.includes("/")) {
      try {
        const [datePart, timePart] = value.split(" ")
        const [day, month, year] = datePart.split("/")
        const formattedValue = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${timePart}`
        input.value = formattedValue
      } catch (error) {
        console.warn("Could not format datetime value:", value)
      }
    }
  }

  // Handle value changes to maintain format consistency
  changed(event) {
    const input = event.target
    
    if (this.typeValue === "datetime" && input.value) {
      // Ensure the hidden field gets the properly formatted value
      const hiddenField = input.form?.querySelector(`input[name="${input.name}"][type="hidden"]`)
      if (hiddenField) {
        // Convert from YYYY-MM-DDTHH:mm:ss to DD/MM/YYYY HH:mm:ss format if needed
        const isoValue = input.value
        try {
          const date = new Date(isoValue)
          const formatted = date.toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit", 
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
          }).replace(/\//g, "/").replace(", ", " ")
          hiddenField.value = formatted
        } catch (error) {
          hiddenField.value = isoValue
        }
      }
    }
  }
} 