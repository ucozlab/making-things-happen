'use strict';

$(document).ready(function () {
  $('.ui-select__title').click(function (e) {
    var select = $(e.target).closest('.ui-select'),
        dropdown = select.find('.ui-select__dropdown');
    select.toggleClass('ui-select--active');
    select.hasClass('ui-select--active') ? dropdown.slideDown(300) : dropdown.slideUp(300);
  });
  $('.ui-select__dropdown-item').click(function (e) {
    var item = $(e.target),
        select = $(e.target).closest('.ui-select'),
        dropdown = select.find('.ui-select__dropdown'),
        title = select.find('.ui-select__title');
    select.toggleClass('ui-select--active');
    select.hasClass('ui-select--active') ? dropdown.slideDown(300) : dropdown.slideUp(300);
    title.text(item.text());
  });
});