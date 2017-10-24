import './data/connectors';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import schema from './data/schema';

const port = process.env.GQL_SERVER_PORT || 4000;
const server = express();

server.use(cors());

const graphqlOptions = req => {
  let token = null;
  if (req.headers && req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1];
  }
  return {
    schema,
    context: {
      token
    }
  };
};

server.use('/graphql', bodyParser.json(), graphqlExpress(graphqlOptions));
server.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

server.listen(port, () => {
  console.log(
    `GraphQL Server is now running on http://localhost:${port}/graphql`
  );
  console.log(`View GraphiQL at http://localhost:${port}/graphiql`);
});

export default server;
