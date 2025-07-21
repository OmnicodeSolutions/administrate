//= require turbo
//= require stimulus

document.addEventListener("DOMContentLoaded", function() {
  if (window.Stimulus) {
    const application = window.Stimulus
    
    application.register("flash", FlashController)
    application.register("table", TableController)
    application.register("select", SelectController)
    application.register("datepicker", DatepickerController)
  }
});

//= require_tree .
