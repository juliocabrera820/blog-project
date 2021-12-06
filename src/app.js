const express = require('express');
const cors = require('cors');
const routes = require('./routes');

require('./database');

/**
 * @constant
 */
const app = express();

/**
 * Represents a server
 * @author Isaac Canché
 */
app.use(cors());
app.use(express.json());
app.use('/api/v1', routes);

module.exports = app;
