document.addEventListener('DOMContentLoaded', function() {
  setupTableInteractions();
});

document.addEventListener('turbo:load', function() {
  setupTableInteractions();
});

function setupTableInteractions() {
  var keycodes = { space: 32, enter: 13 };

  var visitDataUrl = function(event) {
    if (event.type == "click" ||
        event.keyCode == keycodes.space ||
        event.keyCode == keycodes.enter) {

      if (event.target.href) {
        return;
      }

      var tableRow = event.target.closest("tr");
      var dataUrl = tableRow ? tableRow.getAttribute("data-url") : null;
      var selection = window.getSelection().toString();
      
      if (selection.length === 0 && dataUrl) {
        window.location = window.location.protocol + '//' + window.location.host + dataUrl;
      }
    }
  };

  var tables = document.querySelectorAll("table");
  tables.forEach(function(table) {
    var rows = table.querySelectorAll(".js-table-row");
    rows.forEach(function(row) {
      row.removeEventListener("click", visitDataUrl);
      row.removeEventListener("keydown", visitDataUrl);
      
      row.addEventListener("click", visitDataUrl);
      row.addEventListener("keydown", visitDataUrl);
    });
  });
}
