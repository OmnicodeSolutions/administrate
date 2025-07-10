import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["select"]
  static values = { 
    searchable: Boolean,
    placeholder: String,
    allowClear: Boolean
  }

  connect() {
    this.setupSelect()
  }

  setupSelect() {
    if (this.searchableValue) {
      this.makeSearchable()
    }
    
    this.element.classList.add(
      "block", "w-full", "rounded-md", "border-gray-300", 
      "shadow-sm", "focus:border-blue-500", "focus:ring-blue-500"
    )
  }

  makeSearchable() {
    const select = this.element
    const wrapper = document.createElement("div")
    wrapper.className = "relative"
    
    select.parentNode.insertBefore(wrapper, select)
    wrapper.appendChild(select)

    if (select.options.length > 10) {
      this.addSearchInput(wrapper, select)
    }
  }

  addSearchInput(wrapper, select) {
    const searchInput = document.createElement("input")
    searchInput.type = "text"
    searchInput.placeholder = this.placeholderValue || "Search..."
    searchInput.className = "block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-2"
    
    wrapper.insertBefore(searchInput, select)

    searchInput.addEventListener("input", (e) => {
      this.filterOptions(select, e.target.value)
    })
  }

  filterOptions(select, searchTerm) {
    const options = Array.from(select.options)
    const lowerSearchTerm = searchTerm.toLowerCase()

    options.forEach(option => {
      const text = option.textContent.toLowerCase()
      option.style.display = text.includes(lowerSearchTerm) ? "" : "none"
    })
  }
} 