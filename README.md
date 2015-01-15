# trailing-slash

Add or remove trailing slashes, and redirect.

**Work in progress!** Please check back in a few days.

## Example

```javascript
var trailingSlash = require('trailing-slash')

var trailing = trailingSlash(true, done)

//later, a GET request is made with the url '/post/some-title'
router(req, res) // redirects to '/post/some-title/'

function done(req, res) {
  // called after successful redirect
}
```

## API

Coming soon...

## License

MIT. See [LICENSE](./LICENSE) for details.
