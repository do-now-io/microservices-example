import { ApolloServer, gql } from 'apollo-server';
import fetch from 'node-fetch';

const BOOKS_API_URL = process.env.BOOKS_API_URL || 'http://localhost:3001';

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;

async function getBooks() {
  return await fetch(`${BOOKS_API_URL}/books`)
    .then(res => res.json())
    .then(json => json.books);
}

const resolvers = {
  Query: {
    books: () => getBooks()
  },
}
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  healthCheckPath: "/status"
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});