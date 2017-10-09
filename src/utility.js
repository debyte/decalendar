module.exports = {

  isFullHour: function (moment) {
    return moment.minutes() === 0;
  },

  findByClass: function ($element, name) {
    return $element.find('.' + name);
  },

  findByAttr: function ($element, name, value) {
    return $element.find('[' + name + '="' + value + '"]');
  },

};
