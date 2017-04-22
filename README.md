# static-app-server

[Usage](#usage) | [API](#api)

Serve static files via nodejs express.
HTML requests will always return a default html file.
Other file types respond 404, if the file is not present.

## Usage

```javascript
var options = { port: 8080, path: 'tests/dist/' };
var server = require("static-app-server")( [ options ] );
```

---

## API

### http.Server createServer( options )

Creates a Nodejs http.Server Object with the given options.

| Option | Description | Type | Default |
|:-|:-|:-:|:-:|
| port | Port the server listen to  | int | 8080 |
| path | Path to the static files to serve | String | dist |
| defaultFile | Default html response. Must be in path. | String | /index.html |
