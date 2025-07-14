// Form Controller for Administrate
(function() {
  if (typeof Stimulus === 'undefined') {
    console.warn('Stimulus not available for form controller')
    return
  }

  class FormController extends Stimulus.Controller {
    static targets = ["submit", "cancel", "field"]
    static values = { 
      submitting: Boolean,
      turboFrame: String
    }

    connect() {
      this.setupForm()
    }

    setupForm() {
      if (this.turboFrameValue) {
        this.element.setAttribute("data-turbo-frame", this.turboFrameValue)
      }

      if (this.hasSubmitTarget) {
        this.submitTarget.classList.add(
          "inline-flex", "justify-center", "py-2", "px-4", "border", 
          "border-transparent", "shadow-sm", "text-sm", "font-medium", 
          "rounded-md", "text-white", "bg-blue-600", "hover:bg-blue-700", 
          "focus:outline-none", "focus:ring-2", "focus:ring-offset-2", 
          "focus:ring-blue-500", "disabled:opacity-50", "disabled:cursor-not-allowed"
        )
      }

      if (this.hasCancelTarget) {
        this.cancelTarget.classList.add(
          "inline-flex", "justify-center", "py-2", "px-4", "border", 
          "border-gray-300", "shadow-sm", "text-sm", "font-medium", 
          "rounded-md", "text-gray-700", "bg-white", "hover:bg-gray-50", 
          "focus:outline-none", "focus:ring-2", "focus:ring-offset-2", 
          "focus:ring-blue-500"
        )
      }

      this.setupValidation()
    }

    setupValidation() {
      this.fieldTargets.forEach(field => {
        this.styleField(field)
        
        field.addEventListener("blur", () => {
          this.validateField(field)
        })

        field.addEventListener("input", () => {
          this.clearFieldError(field)
        })
      })
    }

    styleField(field) {
      if (field.type === "checkbox" || field.type === "radio") {
        field.classList.add(
          "h-4", "w-4", "text-blue-600", "focus:ring-blue-500", 
          "border-gray-300", "rounded"
        )
      } else if (field.tagName === "SELECT") {
        field.classList.add(
          "block", "w-full", "rounded-md", "border-gray-300", 
          "shadow-sm", "focus:border-blue-500", "focus:ring-blue-500"
        )
      } else if (field.tagName === "TEXTAREA") {
        field.classList.add(
          "block", "w-full", "rounded-md", "border-gray-300", 
          "shadow-sm", "focus:border-blue-500", "focus:ring-blue-500", 
          "resize-vertical"
        )
      } else {
        field.classList.add(
          "block", "w-full", "rounded-md", "border-gray-300", 
          "shadow-sm", "focus:border-blue-500", "focus:ring-blue-500"
        )
      }
    }

    validateField(field) {
      const isValid = field.checkValidity()
      
      if (!isValid) {
        this.showFieldError(field, field.validationMessage)
      } else {
        this.clearFieldError(field)
      }
    }

    showFieldError(field, message) {
      field.classList.remove("border-gray-300", "focus:border-blue-500", "focus:ring-blue-500")
      field.classList.add("border-red-500", "focus:border-red-500", "focus:ring-red-500")
      
      let errorElement = field.parentNode.querySelector(".field-error")
      if (!errorElement) {
        errorElement = document.createElement("div")
        errorElement.className = "field-error text-red-600 text-sm mt-1"
        field.parentNode.appendChild(errorElement)
      }
      errorElement.textContent = message
    }

    clearFieldError(field) {
      field.classList.remove("border-red-500", "focus:border-red-500", "focus:ring-red-500")
      field.classList.add("border-gray-300", "focus:border-blue-500", "focus:ring-blue-500")
      
      const errorElement = field.parentNode.querySelector(".field-error")
      if (errorElement) {
        errorElement.remove()
      }
    }

    submit(event) {
      if (!this.element.checkValidity()) {
        event.preventDefault()
        this.highlightErrors()
        return
      }

      this.setSubmittingState(true)
    }

    setSubmittingState(submitting) {
      this.submittingValue = submitting
      
      if (this.hasSubmitTarget) {
        this.submitTarget.disabled = submitting
        this.submitTarget.textContent = submitting ? "Saving..." : "Save"
      }
    }

    highlightErrors() {
      this.fieldTargets.forEach(field => {
        if (!field.checkValidity()) {
          this.showFieldError(field, field.validationMessage)
        }
      })
    }

    turboSubmitStart() {
      this.setSubmittingState(true)
    }

    turboSubmitEnd() {
      this.setSubmittingState(false)
    }

    turboFrameLoad() {
      this.setupForm()
    }
  }

  // Register the controller when Stimulus is ready
  if (window.Stimulus) {
    window.Stimulus.register("form", FormController)
  } else {
    document.addEventListener("DOMContentLoaded", function() {
      if (window.Stimulus) {
        window.Stimulus.register("form", FormController)
      }
    })
  }
})(); 