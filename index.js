const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { schema, root } = require("./views/graphqlSchema");
const connectDB = require("./config/db");

// Connect to MongoDB
connectDB();

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true, 
  })
);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/graphql`);
});
