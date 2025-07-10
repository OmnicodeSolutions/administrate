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
  const deleteLinks = document.querySelectorAll('[data-turbo-method="delete"][data-turbo-confirm], [data-method="delete"][data-confirm]')
  deleteLinks.forEach(link => {
    if (link.hasAttribute('data-method') && !link.hasAttribute('data-turbo-method')) {
      link.setAttribute('data-turbo-method', link.getAttribute('data-method'))
      link.removeAttribute('data-method')
    }
    
    if (link.hasAttribute('data-confirm') && !link.hasAttribute('data-turbo-confirm')) {
      link.setAttribute('data-turbo-confirm', link.getAttribute('data-confirm'))
      link.removeAttribute('data-confirm')
    }
    
    link.removeEventListener('click', handleDeleteClick)
    link.addEventListener('click', handleDeleteClick)
  })
}

function handleDeleteClick(e) {
  const link = e.target.closest('a')
  if (!link) return
  
  const confirmText = link.getAttribute('data-turbo-confirm')
  
  if (confirmText) {
    link.removeAttribute('data-turbo-confirm')
    link.removeAttribute('data-turbo-method')
    
    e.preventDefault()
    e.stopPropagation()
    
    if (confirm(confirmText)) {
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
    }
    
    link.setAttribute('data-turbo-confirm', confirmText)
    link.setAttribute('data-turbo-method', 'delete')
  }
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
