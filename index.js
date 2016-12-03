var u = require('url')
var parse = u.parse
var format = u.format

module.exports = createTrailing

function createTrailing (shouldExist, next, _status) {
  if (typeof shouldExist === 'undefined') {
    throw new Error(
        'shouldExist must be passed when instantiating. See the ' +
        'docs for further information.'
    )
  }

  if (typeof next !== 'function') {
    throw new Error(
        'You must provide a function to be called on a successful match. ' +
        'See the docs for further information.'
    )
  }

  var status = _status || 301

  return function trailingSlash () {
    var args = [].slice.call(arguments)
    var req = args[0]
    var res = args[1]
    var url = parse(req.url)
    var length = url.pathname.length
    var hasSlash = url.pathname.charAt(length - 1) === '/'

    if (hasSlash === shouldExist) {
      next.apply(null, args)

      return
    }

    if (shouldExist) {
      url.pathname = url.pathname + '/'
    } else {
      url.pathname = url.pathname.slice(0, -1)
    }

    res.statusCode = status
    res.setHeader('Location', format(url))
    res.end()
  }
}
