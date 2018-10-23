module.exports = Item;

function Item(column, values, $element) {
  this.config = column.view.config;
  this.column = column;
  this.$element = $element;
  this.id = values.id;
  this.begin = values.begin;
  this.end = values.end;

  var item = this;

  this.$element.on('mousedown', function (event) {
    item.select();
  });

  this.$element.on('mouseup', function (event) {
    item.finish();
  });
}

Item.prototype.notOverlaps = function (another) {
  return this.end.isSameOrBefore(another.begin) ||
    this.begin.isSameOrAfter(another.end);
};

Item.prototype.overlaps = function (another) {
  return !this.notOverlaps(another);
};

Item.prototype.select = function () {
  this.move = false;
  var item = this;
  this.moveTimeout = setTimeout(function () {
    item.move = true;
    item.$element.addClass(item.config.class.moveItem);
  }, this.config.moveDelay);
};

Item.prototype.finish = function () {
  clearTimeout(this.moveTimeout);
  if (this.move) {
    this.$element.removeClass(this.config.class.moveItem);
    //TODO
    console.log('locate', this.id);
  } else {
    //TODO
    console.log('Open', this.id);
  }
};
