// # Configuration

//  Runs in `development` mode by default
'use strict';

var path = require('path'),
    config;

config = {
    // ### Development **(default)**
    development: {
        url: '',
        // #### Server
        // Can be host & port (default), or socket
        server: {
            // Host to be passed to node's `net.Server#listen()`
            // host: '192.168.4.71',
            host: 'localhost',
            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
            port: '3030'
        },
        api: {
            hostImages: 'localhost',
        }
    }

};

module.exports = config;
