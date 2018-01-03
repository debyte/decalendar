module.exports = Item;

function Item(column, values, $element) {
  this.column = column;
  this.$element = $element;
  this.begin = values.begin;
  this.end = values.end;

  //TODO listen drags and clicks
}
