require('newrelic');
const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, '../public')));
app.use('/*/reservations*', proxy('http://localhost:3020'));

app.get('/:id', (req, res) => {
  if (!req.params.id) {
    res.status(400);
    res.end();
  } else {
    res.sendFile('index.html', { root: path.resolve(__dirname, '../public') });
  }
});

app.listen(port, () => {
  console.log(`Open Table proxy server listening on port ${port}!`);
});
