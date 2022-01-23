const Observations = require('../models/index').obs;

const listeners = [];

Observations.watch()
    .on('change', (data) => {
        listeners.forEach((listener) => {
            listener.write(`data: ${JSON.stringify(data.fullDocument)}\n\n`);
        });
    });

exports.stream = async (req, res) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders(); // flush the headers to establish SSE with client

    listeners.push(res);

    // If client closes connection, stop sending events
    res.on('close', () => {
        console.log('client dropped me');

        listeners.forEach((listener, index) => {
            if (listener === res) {
                listeners.splice(index, 1);
            }
        });

        console.log(listeners);
        res.end();
    });
};