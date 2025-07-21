(function() {
  'use strict';
  
  function TableController() {
    this.rowTargets = [];
  }

  TableController.prototype.connect = function() {
    this.rowTargets = this.element.querySelectorAll('[data-table-target="row"]');
    
    var self = this;
    this.rowTargets.forEach(function(row) {
      row.addEventListener("click", function(event) { self.handleRowClick(event); });
      row.addEventListener("keydown", function(event) { self.handleRowKeydown(event); });
    });
  };

  TableController.prototype.handleRowClick = function(event) {
    this.visitDataUrl(event);
  };

  TableController.prototype.handleRowKeydown = function(event) {
    var keycodes = { space: 32, enter: 13 };
    
    if (event.keyCode === keycodes.space || event.keyCode === keycodes.enter) {
      event.preventDefault();
      this.visitDataUrl(event);
    }
  };

  TableController.prototype.visitDataUrl = function(event) {
    if (event.target.href || event.target.closest('a')) {
      return;
    }

    var row = event.target.closest("tr");
    var dataUrl = row && row.dataset.url;
    var selection = window.getSelection().toString();
    
    if (selection.length === 0 && dataUrl) {
      if (window.Turbo) {
        Turbo.visit(dataUrl);
      } else {
        window.location = dataUrl;
      }
    }
  };

  document.addEventListener('DOMContentLoaded', function() {
    if (window.Stimulus) {
      window.Stimulus.register("table", TableController);
    }
  });
})(); 