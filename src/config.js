var utility = require('./utility.js');

module.exports = {

  defaultDuration: moment.duration(1, 'h'),
  rowTimeFormat: 'LT',
  isMajorRow: utility.isFullHour,
  displayHead: true,

  resizeDelay: 66,
  hoverDelay: 500,
  moveDelay: 500,

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
    item: $('<div class="calendar-item">' +
            '<span class="title"></span>' +
            '<div class="calendar-handle"><span></span></div>' +
            '</div>'),
  },

  select: {
    cell: '.calendar-cell',
    itemTitle: '.title',
  },

  class: {
    hover: 'calendar-hovering',
    majorRow: 'calendar-row-major',
    moveItem: 'calendar-item-move',
    openCell: 'calendar-cell-open',
    targetItem: 'calendar-target',
  },

  attr: {
    id: 'data-decalendar-id',
    time: 'data-decalendar-time',
  },

};
