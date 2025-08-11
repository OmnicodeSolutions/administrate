//= require turbo
//= require stimulus

document.addEventListener("DOMContentLoaded", function() {
  console.log('DOM loaded, setting up Turbo destroy confirmations');
  
  window.handleConfirm = function(element) {
    console.log('handleConfirm called on:', element);
    var message = element.getAttribute('data-confirm');
    console.log('Message:', message);
    
    if (!confirm(message)) {
      console.log('User cancelled');
      return false;
    }
    
    console.log('User confirmed');
    return true;
  };
  
  function setupDestroyHandlers() {
    console.log('Setting up destroy handlers...');
    
    var destroyElements = document.querySelectorAll('a[data-confirm], button[data-confirm], input[data-confirm]');
    console.log('Found destroy elements:', destroyElements.length);
    
    destroyElements.forEach(function(element) {
      console.log('Adding handler to element:', element);
      
      element.addEventListener('click', function(e) {
        console.log('Destroy element clicked!');
        var message = this.getAttribute('data-confirm');
        
        console.log('Message:', message);
        
        if (!confirm(message)) {
          console.log('User cancelled');
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
        
        console.log('User confirmed, proceeding with delete');
      });
    });
  }
  
  setupDestroyHandlers();
  
  setTimeout(setupDestroyHandlers, 500);
  
  if (window.Stimulus) {
    const application = window.Stimulus
    
    application.register("flash", FlashController)
    application.register("table", TableController)
    application.register("select", SelectController)
    application.register("datepicker", DatepickerController)
  }
});

//= require_tree .
