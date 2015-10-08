var tape = require('tape')
var net = require('net')
var jsonStream = require('./')

tape('serializes and parses', function (t) {
  var server = net.createServer(function (socket) {
    socket = jsonStream(socket)
    socket.on('data', function (data) {
      t.same(data, {hello: 'world'})
      socket.write({echo: data})
      socket.end()
    })
  })

  server.listen(0, function () {
    var client = jsonStream(net.connect(server.address().port))

    client.write({hello: 'world'})
    client.end()

    client.on('data', function (data) {
      server.close()
      t.same(data, {echo: {hello: 'world'}})
      t.end()
    })
  })
})