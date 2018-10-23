(function() {

  // device orientation - default to portrait
  var isLandscape = false;
  var isRotatedClockwise = false;

  // device el
  var device = document.querySelector('.Device');

  // debug els
  var debugAlphaEl = document.querySelector('.Debug-value--alpha');
  var debugBetaEl = document.querySelector('.Debug-value--beta');
  var debugGammaEl = document.querySelector('.Debug-value--gamma');
  var debugAlphaModifiedEl = document.querySelector('.Debug-value--alphaModified');
  var debugBetaModifiedEl = document.querySelector('.Debug-value--betaModified');
  var debugGammaModifiedEl = document.querySelector('.Debug-value--gammaModified');

  // recalculate values based on major device rotation
  // (e.g. landscape to portrait or vice versa)
  // allow time for the screen layout to readjust first
  function handleOrientationChange() {
    setTimeout(function() {
      calculateDeviceOrientation();
    }, 500);
  }

  // calculate whether the device is landscape or portrait
  function calculateDeviceOrientation(e) {
    isLandscape =
      document.documentElement.clientHeight < document.documentElement.clientWidth;
    isRotatedClockwise = window.orientation === -90;
  }

  // update display on device orientation
  function handleDeviceorientationEvent(e) {
    var alpha = normaliseAlpha(e);
    var beta = normaliseBeta(e);
    var gamma = normaliseGamma(e);

    render(alpha, beta, gamma);
    debug(alpha, beta, gamma, e);
  }

  // update device
  function render(alpha, beta, gamma) {
    device.style.transform =
    "rotateX(" + beta + "deg) " +
    "rotateY(" + gamma + "deg) " +
    "rotateZ(" + alpha + "deg)";
  }

  function normaliseAlpha(e) {
    var alpha;
    if (!isLandscape) {
      if (e.beta > 90) {
        alpha = e.alpha - 90;
      } else {
        alpha = -e.alpha + 90;
      }
    } else {
      if (isRotatedClockwise) {
        if (Math.abs(e.beta) > 90) {
          alpha = e.alpha;
        } else {
          alpha = -e.alpha;
        }
      } else {
        if (Math.abs(e.beta) > 90) {
          alpha = e.alpha;
        } else {
          alpha = -e.alpha;
        }
      }
    }
    return alpha;
  }

  function normaliseBeta(e) {
    var beta;
    if (!isLandscape) {
      beta = (-e.beta + 90);
    } else {
      if (isRotatedClockwise) {
        beta = (-e.gamma + 90);
      } else {
        beta = 90 + e.gamma;
      }
    }
    return beta;
  }

  function normaliseGamma(e) {
    var gamma;
    if (!isLandscape) {
      gamma = e.gamma;
    } else {
      if (isRotatedClockwise) {
        if (Math.abs(e.beta) > 90) {
          gamma = e.beta;
        } else {
          gamma = (-e.beta);
        }
      } else {
        if (Math.abs(e.beta) > 90) {
          gamma = (-e.beta);
        } else {
          gamma = e.beta;
        }
      }
    }
    return gamma;
  }

  function debug(alpha, beta, gamma, e) {
    debugAlphaEl.textContent = Math.round(e.alpha);
    debugBetaEl.textContent = Math.round(e.beta);
    debugGammaEl.textContent = Math.round(e.gamma);
    debugAlphaModifiedEl.textContent = Math.round(alpha);
    debugBetaModifiedEl.textContent = Math.round(beta);
    debugGammaModifiedEl.textContent = Math.round(gamma);
  }

  // init
  calculateDeviceOrientation();
  window.addEventListener('orientationchange', handleOrientationChange);
  window.addEventListener("deviceorientation", handleDeviceorientationEvent);

})();
