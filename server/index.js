const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
// const router = require('./routes/router.js');
// const controller = require('./controllers/index.js');

const graphqlHTTP = require('express-graphql');
const schema = require('./db/schemas/graphqlschema.js');

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));
// app.use('/', router);

app.listen(port, () => {
  console.log('server listening on port: ', port);
})