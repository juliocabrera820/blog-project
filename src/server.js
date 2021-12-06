/**
 * Represents a server
 * @constant
 * @author Isaac Canché
 */
const app = require('./app');

/**
 * Represents a server port
 * @constant
 * @author Isaac Canché
 */
const port = process.env.PORT || 3000;

/**
 * Represents a server running
 * @param port - port
 * @param callback - function running after server is starting
 * @author Isaac Canché
 */
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
