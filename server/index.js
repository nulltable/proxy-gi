require('newrelic');
const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');

const app = express();
const port = process.env.PORT || 80;

app.use(express.static(path.resolve(__dirname, '../public')));
app.use('/*/reservations*', proxy('ec2-54-153-75-57.us-west-1.compute.amazonaws.com'));

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
