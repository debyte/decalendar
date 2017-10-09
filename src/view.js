module.exports = function($element, config) {
  'use strict';

  var hover = require('./hover.js')(config);
  var resize = require('./resize.js')(config);
  var column = require('./column.js')(config);
  var item = require('./item.js')(config);

  resize(update);

  return {
    day: day,
    update: update,
  };

  function day(begin, end, step, tracks) {
    $element.empty();
    config.var.columns = {};

    var columns = [];
    for (var i = 0; i < tracks.length; i++) {
      columns.push({
        id: String(tracks[i].id),
        name: tracks[i].name,
        begin: begin,
        end: end,
        step: step,
      });
    }

    var $head = config.createNode('head');
    $element.append($head);
    column.createHeadLabels($head);
    for (i = 0; i < columns.length; i++) {
      column.createHead($head, columns[i]);
    }

    var $body = config.createNode('body');
    $element.append($body);
    hover($body);
    column.createLabels($body, {
      begin: begin,
      end: end,
      step: step,
    });
    for (i = 0; i < columns.length; i++) {
      column.create($body, columns[i]);
    }
  }

  function update(event) {
    item.clearTarget($element);
  }

};
