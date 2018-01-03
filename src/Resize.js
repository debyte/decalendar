module.exports = Resize;

function Resize($element, config, callback) {
  var resizeTimeout;

  $element.on('resize', delayResize);

  function delayResize() {
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(doResize, config.resizeDelay);
    }
  }

  function doResize() {
    resizeTimeout = null;
    callback();
  }
}
