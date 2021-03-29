const deflate = (json, prefix) => {
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function (key) {
      var _prefix;

      if (typeof json[key] === 'object') {
        var _currPrefix = key.concat(Array.isArray(json[key]) ? '_' : '.');
        _prefix = prefix ? prefix.concat(_currPrefix) : _currPrefix;
        result = result.concat(deflate(json[key], _prefix));
      } else {
        _prefix = prefix ? prefix.concat(key) : key;
        if (isNumeric(key)) {
          _prefix = _prefix.concat("_");
        }
        result.push(_prefix.concat('=').concat(json[key]));
      }
    });

    return result;
  }

  export default deflate