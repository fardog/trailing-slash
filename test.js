var test = require('tape')
  , trailing = require('./index')

test('does not redirect when slashes match', function(t) {
  t.plan(1)

  var redirect = trailing(true, done)
    , res = {url: '/something/else/'}
    , req = {}

  redirect(res, req)

  function done(request) {
    t.ok(request)

    t.end()
  }
})

test('does not redirect when no slashes match', function(t) {
  t.plan(1)

  var redirect = trailing(false, done)
    , res = {url: '/something/else'}
    , req = {}

  redirect(res, req)

  function done(request) {
    t.ok(request)

    t.end()
  }
})
