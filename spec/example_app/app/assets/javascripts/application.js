//= require turbo
//= require stimulus
//= require_tree .

// Configure Turbo for morphing and scroll preservation
document.addEventListener("turbo:load", function() {
  // Enable morphing for smoother updates
  Turbo.setConfirmMethod(() => true);
});
