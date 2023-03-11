const include = require('nodejs-require-enhancer').include;
const MockServer = include('/src/main/node/server/MockServer.js');
var mockServer = new MockServer();
mockServer.config(process.env.PORT);
mockServer.start();