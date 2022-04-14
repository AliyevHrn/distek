"use strict";

$(document).ready(function () {
  function Initialization() {
    Accordeon.init();
    Header.init();
  }

  var Header = {
    init: function init() {
      this.headerNavMob();
    },
    headerNavMob: function headerNavMob() {
      $('.header__nav-burger').click(function () {
        $('.header__nav-wrapper').animate({
          right: '0'
        });
        $('.header__nav-backdrop').addClass('active');
        $('body').css('overflow', 'hidden');
      });
      $('.header__nav-close').click(function () {
        $('.header__nav-wrapper').animate({
          right: '-100%'
        });
        $('.header__nav-backdrop').removeClass('active');
        $('body').css('overflow', 'initial');
      });
    }
  };
  var Accordeon = {
    init: function init() {
      this.accordeon($('#accordeon'));
    },
    accordeon: function accordeon(container) {
      var list = $(container).find('.accordeon-list');
      list.on('click', '.accordeon-item__toggler', function (e) {
        e.stopPropagation();
        $(this).closest('.accordeon-item').toggleClass('active');
        $(this).closest('.accordeon-item').find('.accordeon-item__body').slideToggle(200);
      });
    }
  };
  Initialization();
});