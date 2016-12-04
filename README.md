# trailing-slash

Add or remove trailing slashes, and redirect.

[![Build Status](http://img.shields.io/travis/fardog/trailing-slash/master.svg?style=flat)](https://travis-ci.org/fardog/trailing-slash)
[![npm install](http://img.shields.io/npm/dm/trailing-slash.svg?style=flat)](https://www.npmjs.org/package/trailing-slash)


`trailing-slash` allows you to wrap a [http.Server][server] handler function, and
redirect when trailing slashes don't meet your expectations.

## Example

```javascript
var trailingSlash = require('trailing-slash')
var http = require('http')

var trailing = trailingSlash({slash: true}, handler)
var server = http.createServer(trailing)

server.listen(8080)

function handler (req, res) {
  // any calls reaching here will have a trailing slash
  console.log(req.url) // '/post/some-title/'
}
```

## API

- `trailingSlash([options] [, next])` - Create a new handler, which returns a
  function. Accepts the following parameters:
    - `options` object: containing any of the following properties:
        - `slash` boolean (default: `true`): when `true` a URL will be
          redirected to contain a slash; when `false`, it will be redirected to
          omit one.
        - `status` number (default: `302`): the URL to be used for redirect,
          which can be either `301` (permanent redirect) or `302` (temporary
          redirect)
    - `next` function: called if the slashes match expectations, and a redirect
      is not necessary. When not provided, the returned function acts in a
      Connect-like middleware compatibility mode, where it expects the last
      parameter to be a `next` to be called upon pass.
    
Returns a function with the following signature:

- `trailing(request, response [, args ...])`
    - `request` - An [http.IncomingMessage][request], as passed by an
      [http.Server][server] or similar.
    - `response` - An [http.ServerResponse][response], as passed by an
      [http.Server][server] or similar.
    - `args` - Any number of arguments which will be passed to the matched
      function.
      
### Middleware

When `next` is not specified, trailing-slash operates in a
Connect/Express-compatible mode, where it can be used as middleware:

```javascript
var trailingSlash = require('trailing-slash')
var express = require('express')

var app = express()

app.use(trailingSlash({slash: true}))

app.listen(8080)
```

## License

MIT. See [LICENSE](./LICENSE) for details.

[request]: http://nodejs.org/api/http.html#http_http_incomingmessage
[server]: http://nodejs.org/api/http.html#http_class_http_server
[routes]: https://www.npmjs.com/package/routes 
[response]: http://nodejs.org/api/http.html#http_class_http_serverresponse
