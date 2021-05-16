import 'coffeescript/register';

import app from '../app';
import _debug from 'debug';
import http from 'http';
import https from 'https';
import config from '../config.json';
import fs from 'fs';

var debug = _debug('pdfy:server');
var httpServer: http.Server;

var normalizePort = (val: string) => {
  var port;
  port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

var onError = (error: { syscall: string; code: any; }) => {
  var bind;
  if (error.syscall !== "listen") {
    throw error;
  }
  bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      return process.exit(1);
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      return process.exit(1);
    default:
      throw error;
  }
};

var onListening = () => {
  var addr, bind;
  addr = httpServer.address();
  bind = typeof port === "string" ? `pipe ${port}` : `port ${port}`;
  return debug(`Listening on ${bind}`);
};

var port = normalizePort(process.env.PORT || '3000');

app.set('port', port);

httpServer = http.createServer(app);

httpServer.listen(port);

httpServer.on('error', onError);

httpServer.on('listening', onListening);

if (config.ssl?.key) {
  var credentials: https.ServerOptions = {
    key: fs.readFileSync(config.ssl.key)
  };
  if (config.ssl.cert != null) {
    credentials.cert = fs.readFileSync(config.ssl.cert);
  }
  if (config.ssl.ca != null) {
    credentials.ca = fs.readFileSync(config.ssl.ca);
  }
  if (config.ssl.ciphers != null) {
    credentials.ciphers = config.ssl.ciphers;
  } else {
    credentials.ciphers = "ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:AES:CAMELLIA:DES-CBC3-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!aECDH:!EDH-DSS-DES-CBC3-SHA:!EDH-RSA-DES-CBC3-SHA:!KRB5-DES-CBC3-SHA";
  }
  // TODO: Is this really necessary?
  var httpsServer = https.createServer(credentials, app);
  httpsServer.listen(443);
  httpsServer.on('error', onError);
  httpsServer.on('listening', onListening);
}