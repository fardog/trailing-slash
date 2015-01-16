# trailing-slash

Add or remove trailing slashes, and redirect.

[![Build Status](http://img.shields.io/travis/fardog/trailing-slash/master.svg?style=flat)](https://travis-ci.org/fardog/trailing-slash)
[![npm install](http://img.shields.io/npm/dm/trailing-slash.svg?style=flat)](https://www.npmjs.org/package/trailing-slash)


`trailing-slash` allows you to wrap a [http.Server][server] handler function, and
redirect when trailing slashes don't meet your expectations.

## Example

```javascript
var trailingSlash = require('trailing-slash')

var trailing = trailingSlash(true, done)

//later, a GET request is made with the url '/post/some-title'
trailing(req, res) // redirects to '/post/some-title/'

function done(req, res) {
  // would be called after successful redirect
  console.log(req.url) // '/post/some-title/'
}
```

## API

- `trailingSlash(shouldHaveSlash, next [, statusCode])` - Create a new handler,
  which returns a function. Accepts the following parameters:
    - `shouldHaveSlash` - A boolean, representing whether or not the route
      should have a slash at the end; `true` for yes, `false` for no.
    - `next` - The function to be called if the slashes match expectations, and
      a redirect is not necessary.
    - `statusCode` - An integer for the status code that should be sent--either
      301 (permanent redirect) or 302 (temporary redirect)--if a redirect is
      necessary. Defaults to 301 if this parameter is not provided.

Returns a function with the following signature:

- `trailing(request, response [, args ...])`
    - `request` - An [http.IncomingMessage][request], as passed by an
      [http.Server][server] or similar.
    - `response` - An [http.ServerResponse][response], as passed by an
      [http.Server][server] or similar.
    - `args` - Any number of arguments which will be passed to the matched
      function.

## License

MIT. See [LICENSE](./LICENSE) for details.

[request]: http://nodejs.org/api/http.html#http_http_incomingmessage
[server]: http://nodejs.org/api/http.html#http_class_http_server
[routes]: https://www.npmjs.com/package/routes 
