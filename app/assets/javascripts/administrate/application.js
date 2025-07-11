import "@hotwired/turbo-rails"
import Rails from "@rails/ujs"
import { Application } from "@hotwired/stimulus"
import { definitionsFromContext } from "@hotwired/stimulus-webpack-helpers"

Rails.start()

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

function handleTableRowClick(event) {
  const elementWithUrl = event.target.closest('[data-url]')
  if (!elementWithUrl) return
  
  if (event.target.tagName === 'A' || 
      event.target.tagName === 'BUTTON' || 
      event.target.closest('a, button, input, select, textarea, [data-confirm]')) {
    return
  }
  
  const dataUrl = elementWithUrl.getAttribute('data-url')
  const selection = window.getSelection().toString()
  
  if (selection.length === 0 && dataUrl) {
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
  
  if (window.adminTableHandler) {
    document.removeEventListener('click', window.adminTableHandler, true)
  }
  
  window.adminTableHandler = handleTableRowClick
  
  document.addEventListener('click', window.adminTableHandler, true)
}

document.addEventListener("DOMContentLoaded", setupInteractions)
document.addEventListener("turbo:load", setupInteractions)
document.addEventListener("turbo:render", setupInteractions)

window.Stimulus = application
