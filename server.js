// Import required modules
const { AwsResources } = require("./lib/aws");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");


// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
    type Resource{
        partition: String!
        service: String!
        region: String!
        accountId: String
        resourceType:String
        resourceId: String!
    }
    type Result{
        items: [Resource]!
        count: Int!
    }
    type Query {
        list(accessKeyId: String!, secretAccessKey: String!, region: String!): Result!
    }
`);

const ar = new AwsResources();

// The root provides a resolver function for each API endpoint
var root = {
    list: async ({ accessKeyId, secretAccessKey, region }) => {
        let l = await ar.listAll(accessKeyId, secretAccessKey, region);
        return {
            items: l,
            count: l.length,
        };
    },
};

var app = express();
app.use(
    "/",
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: {
            defaultQuery: `
      #Please find an example below, also replace the credentials with valid ones, and ensure
      #the account has a AWS TAG's permission

      query{
        list(accessKeyId:"AKIA.......", secretAccessKey:"WJ............", region:"eu-west-1"){
          items{
            partition
            service
            region
            accountId
            resourceType
            resourceId
          }
          count
        }
      }`
        },
    })
);


// app.use("/", (req, res) => {
//   html = converter.makeHtml(example);
//   res.set("Content-Type", "text/html");
//   res.send(Buffer.from(html));
// });
// Server deployment
app.listen(process.env.PORT);
console.log(
`Running a GraphQL API server at http://localhost:${process.env.PORT}/graphql`
);