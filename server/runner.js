// # Server run file
'use strict';
let app = require('../server/index');
let config = require('../config/config');

const env = process.env.NODE_ENV === 'development' ? config.development : config.production;

const server = app.listen(env.server.port, env.server.host, () => {
    console.log(`Server run on ${env.server.host} with port ${env.server.port}` );
});