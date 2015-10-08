# json-object-stream

Turn a transport stream into an object stream that parses from / serializes to json

```
npm install json-object-stream
```

[![build status](http://img.shields.io/travis/mafintosh/json-object-stream.svg?style=flat)](http://travis-ci.org/mafintosh/json-object-stream)

## Usage

``` js
var objectStream = require('json-object-stream')
var net = require('net')

var server = net.createServer(function (socket) {
  socket = objectStream(socket) // turn the transport stream into an object stream
  socket.on('data', function (data) {
    socket.write({echo: data}) // echo back the messages
  })
})

server.listen(10000)

var client = objectStream(net.connect(10000))

client.write({hello: 'world'})
client.on('data', function (data) {
  console.log(data) // will print {echo: {hello: 'world'}}
})
```

## License

MIT
