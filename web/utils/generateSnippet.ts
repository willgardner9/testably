// export default function generateSnippet(
//   api: string,
//   userId: string,
//   testId: string,
//   testPageURL: string,
//   conversionURL: string,
//   selector: string,
//   type: string,
//   variations: any
// ) {
//   const lines: string[] = [
//     `<script defer>`,
//     `"use strict";`,
//     `(function () {`,
//     "var _cookies$find2;",
//     'const _cookies = document.cookie && document.cookie.split("; ") || false;',
//     `const _api = "${api}";`,
//     `const _userId = "${userId}";`,
//     `const _testId = "${testId}";`,
//     `const _testPageURL = "${testPageURL}";`,
//     `const _conversionURL = "${conversionURL}";`,
//     `const _selector = "${selector}";`,
//     `const _dom = document.querySelector(_selector);`,
//     `const _type = "${type}";`,
//     `const _variations = ${JSON.stringify(variations)};`,
//     `function _getActiveVariationId() {`,
//     `var _cookies$find;`,
//     `let activeVariationId =`,
//     `(_cookies &&`,
//     `((_cookies$find = _cookies.find((row) =>`,
//     `row.startsWith("testably_variation=")`,
//     `)) === null || _cookies$find === void 0`,
//     `? void 0`,
//     `: _cookies$find.split("=")[1])) ||`,
//     `false;`,
//     `if (!activeVariationId || !_variations[activeVariationId]) {`,
//     `activeVariationId =`,
//     `Object.keys(_variations)[`,
//     `Math.floor(Math.random() * Object.keys(_variations).length)`,
//     `].toString();`,
//     `document.cookie =`,
//     `"testably_variation=" + activeVariationId + ";max-age=2592000";`,
//     `}`,
//     `return activeVariationId;`,
//     `}`,
//     `const _activeVariationId = _getActiveVariationId();`,
//     `const _url = window.location.href;`,
//     `const _converted =`,
//     `(_cookies &&`,
//     `((_cookies$find2 = _cookies.find((row) =>`,
//     `row.startsWith("testably_converted=")`,
//     `)) === null || _cookies$find2 === void 0`,
//     `? void 0`,
//     `: _cookies$find2.split("=")[1])) ||`,
//     `false;`,
//     `if (_url !== _testPageURL && _url !== _conversionURL) return;`,
//     `if (_url === _testPageURL) {`,
//     `switch (_type) {`,
//     `case "copy":`,
//     `{`,
//     `_dom.textContent = _variations[_activeVariationId];`,
//     `_dom.value = _variations[_activeVariationId];`,
//     `}`,
//     `break;`,
//     `case "src":`,
//     `{`,
//     `_dom.src = _variations[_activeVariationId];`,
//     `}`,
//     `break;`,
//     `case "visibility":`,
//     `{`,
//     `if (_variations[_activeVariationId] === "hidden")`,
//     `_dom.style.display = "none";`,
//     `}`,
//     `break;`,
//     `default:`,
//     `break;`,
//     `}`,
//     `fetch(_api + "sessions", {`,
//     `method: "post",`,
//     `mode: "cors",`,
//     `headers: {`,
//     `"Content-Type": "application/json",`,
//     `},`,
//     `body: JSON.stringify({`,
//     `userId: _userId,`,
//     `testId: _testId,`,
//     `variationId: _activeVariationId,`,
//     `}),`,
//     `});`,
//     `}`,
//     `function _testablyConversion() {`,
//     `if (_converted) return;`,
//     `document.cookie = "testably_converted=true;max-age=2592000";`,
//     `fetch(_api + "conversions", {`,
//     `method: "post",`,
//     `mode: "cors",`,
//     `headers: {"Content-Type": "application/json"},`,
//     `body: JSON.stringify({`,
//     `userId: _userId,`,
//     `testId: _testId,`,
//     `variationId: _activeVariationId,`,
//     `}),`,
//     `});`,
//     `}`,
//     `if (_url === _conversionURL && _activeVariationId) {`,
//     `_testablyConversion();`,
//     `}`,
//     `window.addEventListener("popstate", function (e) {`,
//     `console.log("detected url change to:", window.location.href);`,
//     `if (_url === _conversionURL && _activeVariationId) {`,
//     `_testablyConversion;`,
//     `}`,
//     `});`,
//     `})();`,
//     `</script>`,
//   ];
//   return lines.join("");
// }

export default function generateSnippet(
  variables: {varName: string; varValue: string}[]
): string {
  let snippetString = `<script defer>
  (function () {
    const _cookies = (document.cookie && document.cookie.split("; ")) || false;
    const _api = {{api}};
    const _userId = {{userId}};
    const _testId = {{testId}};
    const _testPageURL = {{testPageURL}};
    const _conversionURL = {{conversionURL}};
    const _selector = {{selector}};
    const _dom = document.querySelector(_selector);
    const _type = {{type}};
    const _variations = {{variations}}
    function _getActiveVariationId() {
      let activeVariationId =
        (_cookies &&
          _cookies
            .find((row) => row.startsWith("testably_variation="))
            ?.split("=")[1]) ||
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
      fetch(_api + "conversions", {
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
  
  </script>`;

  variables.forEach((variable) => {
    snippetString = snippetString.replace(
      variable.varName,
      JSON.stringify(variable.varValue)
    );
  });

  return snippetString;
}
