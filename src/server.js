/**
 * Represents a server
 * @constant
 * @author
 */
const app = require('./app');

/**
 * Represents a server port
 * @constant
 * @author
 */
const port = process.env.PORT || 3000;

/**
 * Represents a server running
 * @param port - port
 * @param callback - function running after server is starting
 * @author
 */
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
