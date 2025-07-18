import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["row"]

  connect() {
    this.rowTargets.forEach(row => {
      row.addEventListener("click", this.handleRowClick.bind(this))
      row.addEventListener("keydown", this.handleRowKeydown.bind(this))
    })
  }

  handleRowClick(event) {
    this.visitDataUrl(event)
  }

  handleRowKeydown(event) {
    const keycodes = { space: 32, enter: 13 }
    
    if (event.keyCode === keycodes.space || event.keyCode === keycodes.enter) {
      event.preventDefault()
      this.visitDataUrl(event)
    }
  }

  visitDataUrl(event) {
    // Don't navigate if clicking on a link
    if (event.target.href || event.target.closest('a')) {
      return
    }

    const row = event.target.closest("tr")
    const dataUrl = row?.dataset.url
    const selection = window.getSelection().toString()
    
    if (selection.length === 0 && dataUrl) {
      // Use Turbo for navigation if available, otherwise fall back to window.location
      if (window.Turbo) {
        Turbo.visit(dataUrl)
      } else {
        window.location = dataUrl
      }
    }
  }
} 