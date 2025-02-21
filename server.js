const app = require('./app');
const serverless = require('serverless-http');

module.exports.handler = serverless(app);


/* good ol' Node.js way
const port = app.get('port');
app.listen(port, () => {
    console.log(`Server listening on ${app.get('host')} ${port}`);
});
*/