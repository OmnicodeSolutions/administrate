import "@hotwired/turbo-rails"
import Rails from "@rails/ujs"
import { Application } from "@hotwired/stimulus"
import { definitionsFromContext } from "@hotwired/stimulus-webpack-helpers"

Rails.start()

import "./components/associative"
import "./components/date_time_picker" 
import "./components/select"

const application = Application.start()
const context = require.context("./controllers", true, /\.js$/)
application.load(definitionsFromContext(context))

function setupSearchForms() {
  const searchForm = document.querySelector(".js-search")
  if (searchForm) {
    searchForm.addEventListener("input", function(event) {
      event.target.form.submit()
    })
  }
}

function handleConfirmations(event) {
  const confirmLink = event.target.closest('a[data-confirm]')
  if (confirmLink) {
    event.preventDefault()
    event.stopImmediatePropagation()
    
    const message = confirmLink.getAttribute('data-confirm')
    const confirmed = confirm(message)
    
    if (confirmed) {
      const method = confirmLink.getAttribute('data-method') || confirmLink.getAttribute('method')
      
      if (method && method.toLowerCase() === 'delete') {
        const form = document.createElement('form')
        form.method = 'POST'
        form.action = confirmLink.href
        form.style.display = 'none'
        
        const methodInput = document.createElement('input')
        methodInput.type = 'hidden'
        methodInput.name = '_method'
        methodInput.value = 'DELETE'
        form.appendChild(methodInput)
        
        const csrfToken = document.querySelector('meta[name="csrf-token"]')
        if (csrfToken) {
          const csrfInput = document.createElement('input')
          csrfInput.type = 'hidden'
          csrfInput.name = 'authenticity_token'
          csrfInput.value = csrfToken.getAttribute('content')
          form.appendChild(csrfInput)
        }
        
        document.body.appendChild(form)
        form.submit()
      } else {
        window.location.href = confirmLink.href
      }
    }
    
    return false
  }
}

function handleTableRowClick(event) {
  if (event.target.closest('a[data-confirm]')) return
  
  if (event.target.tagName === 'A' || 
      event.target.tagName === 'BUTTON' || 
      event.target.closest('a, button, input, select, textarea')) {
    return
  }
  
  const elementWithUrl = event.target.closest('[data-url]')
  if (!elementWithUrl) return
  
  if (window.location.hostname === '127.0.0.1') {
    document.title = 'DEBUG: Table click detected'
  }
  
  const selection = window.getSelection().toString()
  if (selection.length > 0) return
  
  const dataUrl = elementWithUrl.getAttribute('data-url')
  if (dataUrl) {
    event.preventDefault()
    
    if (window.Turbo && window.Turbo.visit) {
      window.Turbo.visit(dataUrl)
    } else {
      window.location.href = dataUrl
    }
  }
}

function setupInteractions() {
  setupSearchForms()
  
  if (window.location.hostname === '127.0.0.1') {
    const dataUrlElements = document.querySelectorAll('[data-url]')
    document.title = `DEBUG: Setup complete, ${dataUrlElements.length} data-url elements`
  }
  
  if (window.adminConfirmHandler) {
    document.removeEventListener('click', window.adminConfirmHandler, true)
  }
  if (window.adminTableHandler) {
    document.removeEventListener('click', window.adminTableHandler, false)
  }
  
  window.adminConfirmHandler = handleConfirmations
  window.adminTableHandler = handleTableRowClick
  
  document.addEventListener('click', window.adminConfirmHandler, true)
  
  document.addEventListener('click', window.adminTableHandler, false)
}

document.addEventListener("DOMContentLoaded", setupInteractions)
document.addEventListener("turbo:load", setupInteractions)

window.Stimulus = application
