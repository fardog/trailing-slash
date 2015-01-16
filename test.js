var test = require('tape')
  , trailing = require('./index')

test('does not redirect when slashes match', function(t) {
  t.plan(1)

  var redirect = trailing(true, done)
    , req = {url: '/something/else/'}
    , res = {}

  redirect(req, res)

  function done(request) {
    t.ok(request)

    t.end()
  }
})

test('does not redirect when no slashes match', function(t) {
  t.plan(1)

  var redirect = trailing(false, done)
    , req = {url: '/something/else'}
    , res = {}

  redirect(req, res)

  function done(request) {
    t.ok(request)

    t.end()
  }
})

test('redirects when slash is missing', function(t) {
  t.plan(3)

  var redirect = trailing(true, done)
    , req = {url: '/something/else'}
    , res = {
          setHeader: function(name, value) {
            t.equal(name, 'Location')
            t.equal(value, req.url + '/')
          }
        , end: function() {
            t.ok(true)
            t.end()
        }
      }

  redirect(req, res)

  function done(request, response) {
    t.ok(false) // fail if we reach here
  }
})

test('redirects when slash is present', function(t) {
  t.plan(3)

  var redirect = trailing(false, done)
    , req = {url: '/something/else/'}
    , res = {
          setHeader: function(name, value) {
            t.equal(name, 'Location')
            t.equal(value, req.url.slice(0, -1))
          }
        , end: function() {
            t.ok(true)
            t.end()
        }
      }

  redirect(req, res)

  function done(request, response) {
    t.ok(false) // fail if we reach here
  }
})
