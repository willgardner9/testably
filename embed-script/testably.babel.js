"use strict";
(function () {
  var _cookies$find2;
  const _cookies = (document.cookie && document.cookie.split("; ")) || false;
  const _api = "http://127.0.0.1:3333/api/v1/";
  const _userId = "bcff9d7b-886a-43fd-92a4-41b2db0ede63";
  const _testId = "b97001dd-89c8-41e4-b575-cdebdd05e318";
  const _testPageURL = "http://127.0.0.1:5500/embed-script/demo/index.html";
  const _conversionURL = "http://127.0.0.1:5500/embed-script/demo/pricing.html";
  const _selector = "h2";
  const _dom = document.querySelector(_selector);
  const _type = "copy";
  const _variations = {
    "f1ff73ae-149f-43a3-8bf8-c5dc73ae5df4": "Privacy-friendly A/B testing",
    "86a92a88-4d61-42e9-a460-89c22daecf54": "No-code A/B testing",
  };
  function _getActiveVariationId() {
    var _cookies$find;
    let activeVariationId =
      (_cookies &&
        ((_cookies$find = _cookies.find((row) =>
          row.startsWith("testably_variation=")
        )) === null || _cookies$find === void 0
          ? void 0
          : _cookies$find.split("=")[1])) ||
      false;
    if (!activeVariationId || !_variations[activeVariationId]) {
      activeVariationId =
        Object.keys(_variations)[
          Math.floor(Math.random() * Object.keys(_variations).length)
        ].toString();
      document.cookie =
        "testably_variation=" + activeVariationId + ";max-age=2592000";
    }
    return activeVariationId;
  }
  const _activeVariationId = _getActiveVariationId();
  const _url = window.location.href;
  const _converted =
    (_cookies &&
      ((_cookies$find2 = _cookies.find((row) =>
        row.startsWith("testably_converted=")
      )) === null || _cookies$find2 === void 0
        ? void 0
        : _cookies$find2.split("=")[1])) ||
    false;
  if (_url !== _testPageURL && _url !== _conversionURL) return;
  if (_url === _testPageURL) {
    switch (_type) {
      case "copy":
        {
          _dom.textContent = _variations[_activeVariationId];
          _dom.value = _variations[_activeVariationId];
        }
        break;
      case "src":
        {
          _dom.src = _variations[_activeVariationId];
        }
        break;
      case "visibility":
        {
          if (_variations[_activeVariationId] === "hidden")
            _dom.style.display = "none";
        }
        break;
      default:
        break;
    }
    fetch(_api + "sessions", {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: _userId,
        testId: _testId,
        variationId: _activeVariationId,
      }),
    });
  }
  function _testablyConversion() {
    if (_converted) return;
    document.cookie = "testably_converted=true;max-age=2592000";
    fetch(_api + "conversions", {
      method: "post",
      mode: "cors",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        userId: _userId,
        testId: _testId,
        variationId: _activeVariationId,
      }),
    });
  }
  if (_url === _conversionURL && _activeVariationId) {
    _testablyConversion();
  }
  window.addEventListener("popstate", function (e) {
    console.log("detected url change to:", window.location.href);
    if (_url === _conversionURL && _activeVariationId) {
      _testablyConversion;
    }
  });
})();
