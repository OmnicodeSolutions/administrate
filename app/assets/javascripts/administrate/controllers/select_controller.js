import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["select", "search", "dropdown", "option"]
  static values = { 
    multiple: Boolean, 
    searchable: Boolean,
    placeholder: String
  }

  connect() {
    this.setupSelect()
    this.isOpen = false
  }

  setupSelect() {
    // For now, we'll enhance the native select with better styling
    // In the future, this can be expanded to a custom dropdown implementation
    const select = this.selectTarget
    
    if (this.searchableValue) {
      select.classList.add("searchable-select")
    }
    
    if (this.multipleValue) {
      select.classList.add("multiple-select")
    }

    // Add Tailwind classes for consistent styling
    select.classList.add(
      "administrate-input",
      "focus:ring-2", 
      "focus:ring-blue-500", 
      "focus:border-blue-500"
    )
  }

  toggle() {
    this.isOpen = !this.isOpen
    this.dropdownTarget.classList.toggle("hidden", !this.isOpen)
  }

  close() {
    this.isOpen = false
    this.dropdownTarget.classList.add("hidden")
  }

  selectOption(event) {
    const option = event.currentTarget
    const value = option.dataset.value
    
    // Update the hidden select
    const selectOption = this.selectTarget.querySelector(`option[value="${value}"]`)
    if (selectOption) {
      selectOption.selected = true
      
      // Trigger change event
      this.selectTarget.dispatchEvent(new Event('change', { bubbles: true }))
    }
    
    if (!this.multipleValue) {
      this.close()
    }
  }

  search(event) {
    const query = event.target.value.toLowerCase()
    
    this.optionTargets.forEach(option => {
      const text = option.textContent.toLowerCase()
      option.classList.toggle("hidden", !text.includes(query))
    })
  }
} 