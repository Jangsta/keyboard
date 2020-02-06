const express = require('express');
const app = express();
const port = 3000;
const router = require('./routes/router.js');
const controller = require('./controllers/index.js');
const graphqlHTTP = require('express-graphql');

app.use('/graphql', graphqlHTTP({
  
}));
app.use('/', router);

app.listen(port, () => {
  console.log('server listening on port: ', port);
})