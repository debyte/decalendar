module.exports = Column;

var Item = require('./Item.js');

function Column(view, values, $element) {
  this.view = view;
  this.$element = $element;
  this.begin = values.begin;
  this.end = values.end;
  this.step = values.step;
  this.minutePx = this.getMinutePxFromDOM();
  this.items = [];

  var column = this;
  
  $element.find(view.config.select.cell).on('click', function (event) {
    column.onClickCell($(this));
  });
}

Column.prototype.addItem = function (item) {
  this.items.push(item);
  this.locate(item);
};

Column.prototype.update = function () {
  this.items.forEach(function (item) {
    this.locate(item);
  }, this);
};

Column.prototype.onClickCell = function ($cell) {
  console.log('clickCell');
  /*item.setTarget(
    $cell.parent().attr(config.attr.id),
    $cell.attr(config.attr.time)
  );*/
};

// DOM positioning:

Column.prototype.locate = function (item) {
  var columnPosition = this.$element.position();
  item.$element.css({
    left: columnPosition.left,
    top: columnPosition.top + this.scaledDifference(this.begin, item.begin),
    height: this.scaledDifference(item.begin, item.end),
    width: this.$element.width() - 4,
  });
};

Column.prototype.scaledDifference = function (begin, end) {
  return Math.round(end.diff(begin) / 60000 * this.minutePx);
};

Column.prototype.getMinutePxFromDOM = function () {
  return this.$element.find(this.view.config.select.cell).eq(1)
    .position().top / this.step.asMinutes();
};
