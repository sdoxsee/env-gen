const deflate = (json, prefix) => {
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function (key) {
      var _prefix;

      if (typeof json[key] === 'object') {
        var _currPrefix = key.concat(Array.isArray(json[key]) ? '[' : '.');
        _prefix = prefix ? prefix.concat(_currPrefix) : _currPrefix;
        result = result.concat(deflate(json[key], _prefix));
      } else {
        _prefix = prefix ? prefix.concat(key) : key;
        if (isNumeric(key)) {
          _prefix = _prefix.concat("]");
        }
        result.push(_prefix.concat('=').concat(json[key]));
      }
    });

    return result;
  }

  const isNumeric = function (str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }

  export default deflate