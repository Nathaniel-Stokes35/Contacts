const express = require('express');
const path = require('path');
const app = express();

const routes = require('./routes');

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});