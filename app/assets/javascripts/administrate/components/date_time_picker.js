$(function () {
  $('[data-type="time"]').datetimepicker({
    debug: false,
    format: "HH:mm:ss",
  });
  $('[data-type="datetime"]').datetimepicker({
    debug: false,
    format: "DD/MM/YYYY HH:mm:ss",
  });
  $('[data-type="date"]').datetimepicker({
    debug: false,
    format: "DD/MM/YYYY",
  });
});
