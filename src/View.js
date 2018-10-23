module.exports = View;

var defaults = require('./config.js');
var Hover = require('./Hover.js');
var Resize = require('./Resize.js');
var Column = require('./Column.js');
var Item = require('./Item.js');

function View($element, options) {
  this.config = $.extend(true, {}, defaults, options);
  this.$element = $element;
  this.columns = {};

  this.locale = this.config.locale || window.navigator.userLanguage || window.navigator.language;
  moment.locale(this.locale);

  this.hoverLogic = new Hover($element, this.config);

  var view = this;
  this.resizeLogic = new Resize($(window), this.config, function () {
    view.update();
  });
}

// Views:

View.prototype.day = function (begin, end, step, tracks) {
  this.$element.empty();
  this.columns = {};
  var columns = tracks.map(function (entry) {
    return {
      id: String(entry.id),
      name: entry.name,
      begin: begin,
      end: end,
      step: step,
    };
  });
  if (this.config.displayHead) {
    this.createHead(columns);
  }
  this.createBody({
    begin: begin,
    end: end,
    step: step,
  }, columns);
  return this;
};

View.prototype.update = function () {
  Object.keys(this.columns).forEach(function (id) {
    this.columns[id].update();
  }, this);
};

// Accessors:

View.prototype.getColumn = function (id) {
  return this.columns[id];
};

View.prototype.getText = function (key) {
  return (this.config.text[this.locale] || {})[key] || this.config.text.en[key];
};

View.prototype.addItems = function (items) {
  items.forEach(function (item) {
    var column = this.getColumn(item.column);
    if (column !== undefined) {
      var $item = this.createItemNode(item);
      this.$body.append($item);
      column.addItem(new Item(column, item, $item));
    }
  }, this);
  Object.keys(this.columns).forEach(function (id) {
    this.columns[id].solveOverlaps();
    this.columns[id].update();
  }, this);
};

// DOM creation:

View.prototype.createHead = function (columns) {
  var $head = this.createNode('head');
  this.$element.append($head);

  var $column = this.createLabelColumnNode();
  $column.append(this.createNode('cell')
    .html('&nbsp;')
  );
  $head.append($column);

  columns.forEach(function (column) {
    $column = this.createColumnNode(column);
    $column.append(this.createNode('cell')
      .text(column.name)
    );
    $head.append($column);
  }, this);

  this.$head = $head;
};

View.prototype.createBody = function (labels, columns) {
  var $body = this.createNode('body');
  this.$element.append($body);

  var $column = null;
  if (labels !== undefined) {
    $column = this.createLabelColumnNode();
    var rowTime = labels.begin.clone();
    while (rowTime.isBefore(labels.end)) {
      var $cell = this.createCellNode(undefined, rowTime);
      if (this.config.isMajorRow(rowTime)) {
        $cell.addClass(this.config.class.majorRow)
          .text(rowTime.format(this.config.rowTimeFormat));
      }
      $column.append($cell);
      rowTime.add(labels.step);
    }
    $body.append($column);
  }

  columns.forEach(function (column) {
    $column = this.createColumnNode(column);
    var rowTime = column.begin.clone();
    while (rowTime.isBefore(column.end)) {
      var $cell = this.createCellNode(column, rowTime)
        .addClass(this.config.class.openCell);
      if (this.config.isMajorRow(rowTime)) {
        $cell.addClass(this.config.class.majorRow);
      }
      $column.append($cell);
      rowTime.add(column.step);
    }
    $body.append($column);
    this.columns[column.id] = new Column(this, column, $column);
  }, this);

  this.$body = $body;
};

View.prototype.createLabelColumnNode = function () {
  return this.createNode('labelColumn');
};

View.prototype.createColumnNode = function (column) {
  return this.createNode('column')
    .attr(this.config.attr.id, column.id);
};

View.prototype.createCellNode = function (column, rowTime) {
  var node = this.createNode('cell')
    .attr(this.config.attr.time, rowTime.toISOString());
  if (column !== undefined) {
    node.attr(this.config.attr.id, column.id);
  }
  return node;
};

View.prototype.createItemNode = function (item) {
  return this.createNode('item')
    .attr(this.config.attr.if, item.id);
};

View.prototype.createNode = function (key) {
  return this.config.$node[key].clone();
};
