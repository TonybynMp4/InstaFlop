const app = require('./app');
const history = require('connect-history-api-fallback')
app
.use(history())
.set('port', process.env.PORT ?? 3000)
.set('host', process.env.HOST);

// good ol' Node.js way
const port = app.get('port');
app.listen(port, () => {
    console.log(`Server listening on ${app.get('host')} ${port}`);
});