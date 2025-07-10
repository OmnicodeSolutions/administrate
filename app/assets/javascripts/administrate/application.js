import "@hotwired/turbo-rails"
import { Application } from "@hotwired/stimulus"
import { definitionsFromContext } from "@hotwired/stimulus-webpack-helpers"

try {
  const $ = require('jquery')
  window.$ = window.jQuery = $
} catch (e) {
  console.log('jQuery not available via webpack, using CDN fallback')
}

import "./components/associative"
import "./components/date_time_picker" 
import "./components/select"
import "./components/table"

const application = Application.start()
const context = require.context("./controllers", true, /\.js$/)
application.load(definitionsFromContext(context))

function setupPageInteractions() {
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a[data-confirm]')
    if (link) {
      const confirmText = link.getAttribute('data-confirm')
      if (confirmText) {
        e.preventDefault()
        e.stopPropagation()
        
        if (!window.confirm(confirmText)) {
          return false
        }
        
        const method = link.getAttribute('data-method')
        if (method === 'delete') {
          const form = document.createElement('form')
          form.method = 'POST'
          form.action = link.href
          form.style.display = 'none'
          
          const csrfToken = document.querySelector('meta[name="csrf-token"]')
          if (csrfToken) {
            const csrfInput = document.createElement('input')
            csrfInput.type = 'hidden'
            csrfInput.name = 'authenticity_token'
            csrfInput.value = csrfToken.content
            form.appendChild(csrfInput)
          }
          
          const methodInput = document.createElement('input')
          methodInput.type = 'hidden'
          methodInput.name = '_method'
          methodInput.value = 'DELETE'
          form.appendChild(methodInput)
          
          document.body.appendChild(form)
          form.submit()
        } else {
          window.location.href = link.href
        }
      }
    }
  })
}



function setupSearchForms() {
  const searchForms = document.querySelectorAll('.search')
  searchForms.forEach(form => {
    if (!form.submit) {
      form.submit = function() { 
        this.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
      }
    }
    
    if (window.$ && window.$.fn) {
      $(form).data('legacy-submit', function() {
        form.submit()
      })
    }
  })
  
  window.submitSearchForm = function() {
    const searchForm = document.querySelector('.search')
    if (searchForm) {
      searchForm.submit()
    }
  }
}

function setupAllInteractions() {
  setupPageInteractions()
  setupSearchForms()
}

document.addEventListener("turbo:load", setupAllInteractions)
document.addEventListener("DOMContentLoaded", setupAllInteractions)

window.Stimulus = application
