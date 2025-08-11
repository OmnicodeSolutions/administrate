(function() {
  'use strict';
  
  function FlashController() {
    this.autoDismissValue = false;
    this.delayValue = 5000;
  }

  FlashController.prototype.connect = function() {
    this.autoDismissValue = this.element.dataset.autoDismiss === 'true';
    this.delayValue = parseInt(this.element.dataset.delay) || 5000;
    
    if (this.autoDismissValue) {
      var self = this;
      this.timeout = setTimeout(function() {
        self.dismiss();
      }, this.delayValue);
    }
  };

  FlashController.prototype.disconnect = function() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  };

  FlashController.prototype.dismiss = function() {
    console.log('Flash dismiss called!');
    var self = this;
    this.element.style.transition = "all 0.3s ease-out";
    this.element.style.opacity = "0";
    this.element.style.transform = "translateY(-10px)";
    this.element.style.marginBottom = "0";
    
    setTimeout(function() {
      self.element.remove();
    }, 300);
  };

  window.FlashController = FlashController;
})(); 