import http from 'http';

const PORT = process.env.PORT || 3001;

var server = http.createServer(function (req, res) {
    if (req.url === '/status') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({
            "status": "pass",
            "automatic-updates": "true",
            "env": "dev"
        }));
    }
    else {
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end(JSON.stringify({
            "books": [{
                title: 'The Awakening',
                author: 'Kate Chopin',
            }, {
                title: 'City of Glass',
                author: 'Paul Auster',
            }]
        }));
    }
});

server.listen(PORT);
console.log(`Server is running on port ${PORT}`);