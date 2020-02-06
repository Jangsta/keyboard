const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt} = graphql;

var keysets = [
  {
    id: 1,
    manufacturer: "gmk",
    material: "abs",
    profile: "cherry",
    kits: "",
    tags: { type: GraphQLString },
    vendor_id: { type: GraphQLID },
    image_url: { type: GraphQLString },
    description: {type: GraphQLString },
    price: {type: GraphQLInt },
    quantity: { type: GraphQLInt },
    available: {type: GraphQLBoolean}
  },
  {

  }
];

const KeysetType = new GraphQLObjectType({
  name: 'Keyset',
  fields: () => ({
    id: { type: GraphQLID },
    manufacturer: { type: GraphQLString },
    material: { type: GraphQLString },
    profile: { type: GraphQLString },
    kits: { type: GraphQLString },
    tags: { type: GraphQLString },
    vendor_id: { type: GraphQLID },
    image_url: { type: GraphQLString },
    description: {type: GraphQLString },
    price: {type: GraphQLInt },
    quantity: { type: GraphQLInt },
    available: {type: GraphQLBoolean}
  })
});

id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT,
  manufacturer VARCHAR(100), -- gmk, epbt
  material VARCHAR(30), --expects abs, pbt
  profile VARCHAR(30), -- cherry, kat, dcs