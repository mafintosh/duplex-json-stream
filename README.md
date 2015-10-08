# duplex-json-stream

Turn a transport stream into an duplex stream that parses from / serializes to json

```
npm install duplex-json-stream
```

[![build status](http://img.shields.io/travis/mafintosh/duplex-json-stream.svg?style=flat)](http://travis-ci.org/mafintosh/duplex-json-stream)

## Usage

``` js
var jsonStream = require('duplex-json-stream')
var net = require('net')

var server = net.createServer(function (socket) {
  socket = jsonStream(socket) // turn the transport stream into an object stream
  socket.on('data', function (data) {
    socket.write({echo: data}) // echo back the messages
  })
})

server.listen(10000)

var client = jsonStream(net.connect(10000))

client.write({hello: 'world'})
client.on('data', function (data) {
  console.log(data) // will print {echo: {hello: 'world'}}
})
```

## License

MIT
