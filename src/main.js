/* Blatantly write over global deCalendar. */
window.deCalendar = function(element, options) {
  'use strict';

  var $element = $(element);
  var config = require('./config.js')(options);
  var view = require('./view.js')($element, config);
  var utility = require('./utility.js');

  return {
    viewDay: view.day,
    utility: utility,
  };

};
