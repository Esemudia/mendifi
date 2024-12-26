const { graphqlHTTP } = require('express-graphql');
const express = require('express');
const { schema, root } = require('../views/graphqlSchema');
const connectDB = require('../config/db');

const app = express();

// MongoDB connection
connectDB();

app.use(
  '/api/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: false, // Disable GraphiQL UI in production
  })
);

// Export as a serverless function for Vercel
module.exports = app;
