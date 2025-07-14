// Table Controller for Administrate
(function() {
  if (typeof Stimulus === 'undefined') {
    console.warn('Stimulus not available for table controller')
    return
  }

  class TableController extends Stimulus.Controller {
    static targets = ["row", "selectAll", "checkbox"]
    static classes = ["selected", "hover"]

    connect() {
      this.setupTableInteractions()
    }

    setupTableInteractions() {
      this.element.classList.add("min-w-full", "divide-y", "divide-gray-200")
      
      this.rowTargets.forEach(row => {
        row.classList.add(
          "hover:bg-gray-50", "transition-colors", "duration-150"
        )
      })
    }

    toggleSelectAll() {
      const isChecked = this.selectAllTarget.checked
      
      this.checkboxTargets.forEach(checkbox => {
        checkbox.checked = isChecked
        this.toggleRowSelection(checkbox.closest("tr"), isChecked)
      })
    }

    toggleRow(event) {
      const checkbox = event.target
      const row = checkbox.closest("tr")
      this.toggleRowSelection(row, checkbox.checked)
      this.updateSelectAllState()
    }

    toggleRowSelection(row, isSelected) {
      if (isSelected) {
        row.classList.add("bg-blue-50", "border-blue-200")
      } else {
        row.classList.remove("bg-blue-50", "border-blue-200")
      }
    }

    updateSelectAllState() {
      const checkedBoxes = this.checkboxTargets.filter(cb => cb.checked)
      const allBoxes = this.checkboxTargets.length
      
      if (this.hasSelectAllTarget) {
        this.selectAllTarget.checked = checkedBoxes.length === allBoxes
        this.selectAllTarget.indeterminate = checkedBoxes.length > 0 && checkedBoxes.length < allBoxes
      }
    }

    rowUpdated(event) {
      const row = event.target.closest("tr")
      if (row) {
        row.classList.add("bg-green-100")
        setTimeout(() => {
          row.classList.remove("bg-green-100")
        }, 2000)
      }
    }
  }

  // Register the controller when Stimulus is ready
  if (window.Stimulus) {
    window.Stimulus.register("table", TableController)
  } else {
    document.addEventListener("DOMContentLoaded", function() {
      if (window.Stimulus) {
        window.Stimulus.register("table", TableController)
      }
    })
  }
})(); 