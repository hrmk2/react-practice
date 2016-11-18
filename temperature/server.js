import fs from 'fs';
import express from 'express';
import http from 'http';
import initWebpack from './lib/initWebpack';

const app = express();
const server = http.Server(app);

initWebpack(app);

app.use(express.static(__dirname + '/views'));
app.use('/static', express.static(__dirname + '/static'));
app.get('/', (req, res) => {
    fs.readFile(__dirname + './views/index.html', function(err, data) {
        res.send(data);
    });
});

server.listen(8080, () => {
    console.log('listening port ', 8080);
});

export default server;
