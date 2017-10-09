module.exports = function(config) {
  'use strict';

  var utility = require('./utility.js');

  return {
    clearTarget: clearTarget,
    setTarget: setTarget,
  };

  function clearTarget($element) {
    utility.findByClass($element, config.class.targetItem).remove();
  }

  function setTarget(columnId, timeStr) {
    var column = config.var.columns[columnId];
    var $column = column.$element;

    var $cell = utility.findByAttr($column, config.attr.time, timeStr);
    if (!$cell.hasClass(config.class.openCell)) {
      return;
    }

    var $body = $column.parent();
    var time = moment(timeStr);
    clearTarget($body);
    drawItem($body, column, {
      title: config.getText('reserve'),
      begin: time,
      end: time.clone().add(config.defaultDuration),
    }).addClass(config.class.targetItem);
  }

  function drawItem($body, column, item) {
    var cp = column.$element.position();
    var $target = config.createNode('item').css({
      left: cp.left,
      top: cp.top + scaleY(column, column.begin, item.begin),
      height: scaleY(column, item.begin, item.end),
      width: column.$element.width() - 4,
    });
    $target.find(config.select.itemTitle).text(item.title || '');
    $body.append($target);
    return $target;
  }

  function scaleY(column, begin, end) {
    return Math.round(end.diff(begin) / 60000 * column.minutePx);
  }
};
