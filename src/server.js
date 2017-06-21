const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('port', 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const homeController = require('./controllers/home');
const userController = require('./controllers/user');
const playerController = require('./controllers/player');

app.get('/', homeController.index)

app.post('/api/users', userController.create);
app.post('/api/login', userController.login);

app.get('/api/players', playerController.get);
app.post('/api/players', playerController.create);
app.delete('/api/players/:id', playerController.delete);

app.listen(app.get('port'));

module.exports = app;
