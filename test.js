var test = require('tape')
  , trailing = require('./index')

test('does not redirect when slashes requested and match', function(t) {
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

test('does not redirect when no slashes requested and match', function(t) {
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

  var redirect = trailing(true, fail)
    , req = {url: '/something/else'}
    , res = {
          setHeader: function(name, value) {
            t.equal(name, 'Location')
            t.equal(value, '/something/else/')
          }
        , end: function() {
            t.ok(true)
            t.end()
        }
      }

  redirect(req, res)

  function fail(request, response) {
    t.ok(false) // fail if we reach here
  }
})

test('redirects when slash is present', function(t) {
  t.plan(3)

  var redirect = trailing(false, fail)
    , req = {url: '/something/else/'}
    , res = {
          setHeader: function(name, value) {
            t.equal(name, 'Location')
            t.equal(value, '/something/else')
          }
        , end: function() {
            t.ok(true)
            t.end()
        }
      }

  redirect(req, res)

  function fail(request, response) {
    t.ok(false) // fail if we reach here
  }
})

test('retains other URL parts', function(t) {
  t.plan(2)

  var redirect = trailing(false, fail)
    , req = {url: '/something/else/?woohoo=true'}
    , res = {
          setHeader: function(name, value) {
            t.equal(value, '/something/else?woohoo=true')
          }
        , end: function() {
            t.ok(true)
            t.end()
        }
      }

  redirect(req, res)

  function fail(request, response) {
    t.ok(false) // fail if we reach here
  }
})

test('passes through any number of objects', function(t) {
  t.plan(3)

  var redirect = trailing(false, done)
    , req = {url: '/something/else'}
    , res = {}
    , superflous = {}

  redirect(req, res, superflous)

  function done(request, response, unnecessary) {
    t.strictEqual(request, req)
    t.strictEqual(response, res)
    t.strictEqual(superflous, unnecessary)

    t.end()
  }
})

test('defaults to a 301 redirect', function(t) {
  t.plan(2)

  var redirect = trailing(false, fail)
    , req = {url: '/something/else/?woohoo=true'}
    , res = {
          setHeader: function(name, value) {
            t.equal(value, '/something/else?woohoo=true')
          }
        , end: success
      }

  redirect(req, res)

  function success() {
    t.equal(res.statusCode, 301)
    t.end()
  }

  function fail(request, response) {
    t.ok(false) // fail if we reach here
  }
})

test('performs a 302 redirect when requested', function(t) {
  t.plan(2)

  var redirect = trailing(false, fail, 302)
    , req = {url: '/something/else/?woohoo=true'}
    , res = {
          setHeader: function(name, value) {
            t.equal(value, '/something/else?woohoo=true')
          }
        , end: success
      }

  redirect(req, res)

  function success() {
    t.equal(res.statusCode, 302)
    t.end()
  }

  function fail(request, response) {
    t.ok(false) // fail if we reach here
  }
})
