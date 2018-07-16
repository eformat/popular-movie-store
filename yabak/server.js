const port = 3000
const spdy = require('spdy')
const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
const yakbak = require('yakbak');

var mdb = yakbak('https://api.themoviedb.org', {
    dirname: __dirname + '/movies'
});

app.get('*', (req, res) => {
  console.log('Called ' + req)
  mdb(req, res);
})

const options = {
    key: fs.readFileSync(__dirname + '/server.key'),
    cert:  fs.readFileSync(__dirname + '/server.crt'),
    protocols: [ 'h2', 'http/1.1' ] // 'spdy/3.1', ..., 'http/1.1', 'h2' ],
}
spdy
  .createServer(options, app)
  .listen(port, (error) => {
    if (error) {
      console.error(error)
      return process.exit(1)
    } else {
      console.log('Listening on port: ' + port + '.')
    }
})
