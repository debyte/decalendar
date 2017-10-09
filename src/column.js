module.exports = function(config) {
  'use strict';

  var item = require('./item.js')(config);

  return {
    createHeadLabels: createHeadLabels,
    createHead: createHead,
    createLabels: createLabels,
    create: create,
  }

  function createHeadLabels($element) {
    var $column = createLabelColumn($element);
    $column.append(config.createNode('cell')
      .html('&nbsp;')
    );
  }

  function createHead($element, column) {
    var $column = createColumn($element, column);
    $column.append(config.createNode('cell')
      .text(column.name)
    );
  }

  function createLabels($element, column) {
    var $column = createLabelColumn($element);
    var rowTime = column.begin.clone();
    while (rowTime.isBefore(column.end)) {
      var $cell = config.createNode('cell')
        .attr(config.attr.time, rowTime.toISOString());
      if (config.isMajorRow(rowTime)) {
        $cell.addClass(config.class.majorRow)
          .text(rowTime.format(config.rowTimeFormat));
      }
      $column.append($cell);
      rowTime.add(column.step);
    }
    column.$element = $column;
  }

  function create($element, column) {
    var $column = createColumn($element, column);
    var rowTime = column.begin.clone();
    while (rowTime.isBefore(column.end)) {
      var $cell = config.createNode('cell')
        .attr(config.attr.time, rowTime.toISOString())
        .addClass(config.class.openCell)
        .on('click', clickCell);
      if (config.isMajorRow(rowTime)) {
        $cell.addClass(config.class.majorRow);
      }
      $column.append($cell);
      rowTime.add(column.step);
    }
    column.minutePx = $column.find('div').eq(1).position().top
      / column.step.asMinutes();
    column.$element = $column;
    config.var.columns[column.id] = column;
  }

  function clickCell(event) {
    var $cell = $(this);
    item.setTarget(
      $cell.parent().attr(config.attr.id),
      $cell.attr(config.attr.time)
    );
  }

  function createLabelColumn($element) {
    var $column = config.createNode('labelColumn');
    $element.append($column);
    return $column;
  }

  function createColumn($element, column) {
    var $column = config.createNode('column')
      .attr(config.attr.id, column.id);
    $element.append($column);
    return $column;
  }
};
