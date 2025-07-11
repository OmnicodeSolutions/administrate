import "@hotwired/turbo-rails"
import Rails from "@rails/ujs"
import { Application } from "@hotwired/stimulus"
import { definitionsFromContext } from "@hotwired/stimulus-webpack-helpers"

Rails.start()

document.addEventListener('turbo:before-fetch-request', function(event) {
  const element = event.target
  if (element.hasAttribute('data-confirm')) {
    const message = element.getAttribute('data-confirm')
    if (!confirm(message)) {
      event.preventDefault()
      return false
    }
  }
})

try {
  const $ = require('jquery')
  window.$ = window.jQuery = $
} catch (e) {
  console.log('jQuery not available via webpack, using CDN fallback')
}

import "./components/associative"
import "./components/date_time_picker" 
import "./components/select"

const application = Application.start()
const context = require.context("./controllers", true, /\.js$/)
application.load(definitionsFromContext(context))

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

function setupTableInteractions() {
  document.addEventListener('click', function(event) {
    const elementWithUrl = event.target.closest('[data-url]')
    
    if (!elementWithUrl) return
    
    if (event.target.tagName === 'A' || event.target.tagName === 'BUTTON' || 
        event.target.closest('a, button, input, select, textarea')) {
      return
    }
    
    const dataUrl = elementWithUrl.getAttribute('data-url')
    const selection = window.getSelection().toString()
    
    if (selection.length === 0 && dataUrl) {
      event.preventDefault()
      window.location.href = dataUrl
    }
  })
  
  document.addEventListener('keydown', function(event) {
    if (event.keyCode === 32 || event.keyCode === 13) {
      const elementWithUrl = event.target.closest('[data-url]')
      
      if (!elementWithUrl) return
      
      if (event.target.tagName === 'A' || event.target.tagName === 'BUTTON' || 
          event.target.closest('a, button, input, select, textarea')) {
        return
      }
      
      const dataUrl = elementWithUrl.getAttribute('data-url')
      const selection = window.getSelection().toString()
      
      if (selection.length === 0 && dataUrl) {
        event.preventDefault()
        window.location.href = dataUrl
      }
    }
  })
}

function setupAllInteractions() {
  setupSearchForms()
  setupTableInteractions()
}

document.addEventListener("DOMContentLoaded", setupAllInteractions)
document.addEventListener("turbo:load", setupAllInteractions)

window.Stimulus = application
