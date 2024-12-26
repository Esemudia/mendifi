const { buildSchema } = require("graphql");
const AuthController = require("../controllers/authController");

// Define GraphQL schema
const schema = buildSchema(`
  type Query {
    hello: String
  }

  type SignupResponse {
    message: String
    otp: String
  }

  type Mutation {
    signup(phoneNumber: String!): SignupResponse
    verifyOTP(phoneNumber: String!, otp: String!): String
  }
`);

// Define resolvers
const root = {
  hello: () => "Welcome to the GraphQL API",
  signup: async (args) => await AuthController.signup(args),
  verifyOTP: async (args) => await AuthController.verifyOTP(args),
};

module.exports = { schema, root };
