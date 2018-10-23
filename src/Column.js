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
  this.overlapLanes = 1;

  var column = this;

  $element.find(view.config.select.cell).on('click', function (event) {
    column.onClickCell($(this));
  });
}

Column.prototype.addItem = function (item) {
  this.items.push(item);
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
  var laneWidth = (this.$element.width() - 2) / this.overlapLanes;
  item.$element.css({
    left: columnPosition.left + item.overlapLane * laneWidth,
    top: columnPosition.top + this.scaledDifference(this.begin, item.begin),
    height: this.scaledDifference(item.begin, item.end),
    width: laneWidth - 2,
  });
};

Column.prototype.scaledDifference = function (begin, end) {
  return Math.round(end.diff(begin) / 60000 * this.minutePx);
};

Column.prototype.getMinutePxFromDOM = function () {
  return this.$element.find(this.view.config.select.cell).eq(1)
    .position().top / this.step.asMinutes();
};

Column.prototype.solveOverlaps = function () {
  this.overlapLanes = 1;
  this.items.forEach(function (item) {
    item.overlapLane = -1;
  });
  this.items.forEach(function (item) {
    var reserved = {};
    var group = [item];
    if (item.overlapLane >= 0) {
      reserved[item.overlapLane] = true;
    }
    this.items.forEach(function (another) {
      if (item != another && item.overlaps(another)) {
        if (another.overlapLane >= 0) {
          reserved[another.overlapLane] = true;
        }
        group.push(another);
      }
    });
    group.forEach(function (member) {
      if (member.overlapLane < 0) {
        for (var i = 0; i < group.length; i++) {
          if (!reserved[i]) {
            member.overlapLane = i;
            reserved[i] = true;
            break;
          }
        }
      }
    });
    this.overlapLanes = Math.max(this.overlapLanes, group.length);
  }, this);
};
