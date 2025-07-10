import "@hotwired/turbo-rails"
import { Application } from "@hotwired/stimulus"
import { definitionsFromContext } from "@hotwired/stimulus-webpack-helpers"
import $ from "jquery"

window.$ = window.jQuery = $

import "./components/associative"
import "./components/date_time_picker" 
import "./components/select"
import "./components/table"

const application = Application.start()
const context = require.context("./controllers", true, /\.js$/)
application.load(definitionsFromContext(context))

function setupPageInteractions() {
  const deleteLinks = document.querySelectorAll('[data-method="delete"][data-confirm]')
  deleteLinks.forEach(link => {
    if (!link.hasAttribute('data-turbo-method')) {
      link.setAttribute('data-turbo-method', 'delete')
    }
    
    const confirmText = link.getAttribute('data-confirm')
    if (confirmText && !link.hasAttribute('data-turbo-confirm')) {
      link.setAttribute('data-turbo-confirm', confirmText)
    }
  })
  
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

document.addEventListener("turbo:load", setupPageInteractions)
document.addEventListener("DOMContentLoaded", setupPageInteractions)

window.Stimulus = application
