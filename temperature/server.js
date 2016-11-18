import fs from 'fs';
import express from 'express';
import http from 'http';
import initWebpack from './lib/initWebpack';

const app = express();
const server = http.Server(app);

initWebpack(app);

app.use(express.static(__dirname + '/public'));
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (req, res) => {
    fs.readFile(__dirname + './public/index.html', function(err, data) {
        res.send(data);
    });
});

server.listen(8080, () => {
    console.log('listening port ', 8080);
});

export default server;
