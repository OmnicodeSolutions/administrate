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
import "./components/table"

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

function setupAllInteractions() {
  setupSearchForms()
}

document.addEventListener("DOMContentLoaded", setupAllInteractions)
document.addEventListener("turbo:load", setupAllInteractions)

window.Stimulus = application
