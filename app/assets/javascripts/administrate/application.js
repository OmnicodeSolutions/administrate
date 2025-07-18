//= require @hotwired/turbo-rails
//= require @hotwired/stimulus-autoloader

// Import and register Stimulus controllers
import { Application } from "@hotwired/stimulus"
import FlashController from "./controllers/flash_controller"
import TableController from "./controllers/table_controller"
import SelectController from "./controllers/select_controller"
import DatepickerController from "./controllers/datepicker_controller"

const application = Application.start()

application.register("flash", FlashController)
application.register("table", TableController)
application.register("select", SelectController)
application.register("datepicker", DatepickerController)

//= require_tree .
