module.exports = function (options) {
  'use strict';

  var utility = require('./utility.js');

  var defaults = {

    defaultDuration: moment.duration(1, 'h'),
    rowTimeFormat: 'LT',
    isMajorRow: utility.isFullHour,

    resizeDelay: 66,
    hoverDelay: 500,

    text: {
      en: {
        reserve: 'Reserve',
      },
      fi: {
        reserve: 'Varaa',
      },
    },

    $node: {
      head: $('<div class="calendar-head row m-0"></div>'),
      body: $('<div class="calendar row m-0"></div>'),
      labelColumn: $('<div class="calendar-col-label p-0"></div>'),
      column: $('<div class="calendar-col col p-0"></div>'),
      cell: $('<div class="calendar-cell p-0"></div>'),
      item: $('<div class="calendar-item">'
          + '<span class="title"></span>'
          + '<div class="calendar-handle"><span></span></div>'
        + '</div>'),
    },
    select: {
      itemTitle: '.title',
    },
    class: {
      hover: 'calendar-hovering',
      majorRow: 'calendar-row-major',
      openCell: 'calendar-cell-open',
      targetItem: 'calendar-target',
    },
    attr: {
      id: 'data-decalendar-id',
      time: 'data-decalendar-time',
    },

    createNode: createNode,
    getText: getText,
    var: {},
  };

  var config = $.extend(true, {}, defaults, options);

  var locale = config.locale || window.navigator.userLanguage || window.navigator.language;
  moment.locale(locale);

  return config;

  function createNode(key) {
    return config.$node[key].clone();
  }

  function getText(key) {
    return (config.text[locale] || {})[key] || config.text.en[key];
  }
};
