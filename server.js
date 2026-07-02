const express = require('express');
const app = express();
const routes = require('./routes');

app.use(express.json());
app.use(routes);
app.use(express.static('frontend'));
app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

app.listen(8080, () => {
    console.log('Server running on http://localhost:8080');
});