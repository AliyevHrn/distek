"use strict";

$(document).ready(function () {
  function Initialization() {
    Accordeon.init();
  }

  var Accordeon = {
    init: function init() {
      this.accordeon($('#accordeon'));
    },
    accordeon: function accordeon(container) {
      var list = $(container).find('.accordeon-list');
      var toggler = $(container).find('.accordeon-item__toggler');
      list.on('click', '.accordeon-item__toggler', function (e) {
        e.stopPropagation();
        $(this).closest('.accordeon-item').toggleClass('active');
        $(this).closest('.accordeon-item').find('.accordeon-item__body').slideToggle(200);
      });
    }
  };
  Initialization();
});