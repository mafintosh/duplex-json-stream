var pumpify = require('pumpify')
var ndjson = require('ndjson')

module.exports = function (stream) {
  return pumpify.obj(ndjson.serialize(), stream, ndjson.parse())
}
