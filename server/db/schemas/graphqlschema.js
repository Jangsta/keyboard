const graphql = require('graphql');
const model = require('../../models');
const { GraphQLObjectType, GraphQLFloat, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean, GraphQLList, GraphQLSchema} = graphql;

const VendorType = new GraphQLObjectType({
  name: 'Vendor',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    website_url: { type: GraphQLString },
    instagram_url: { type: GraphQLString },
    discord_url: { type: GraphQLString },
    facebook_url: { type: GraphQLString },
    twitter_url: { type: GraphQLString },
    other_url: { type: GraphQLString },
    payment_types: {type: GraphQLString},
    location: { type: GraphQLString },
    keysets: {
      type: new GraphQLList(KeysetType),
      resolve(parent, args) {
        return model.getKeysetsByIdDataloader.load(parent.id);
      }
    }
  })
});
const ColorQuery = new GraphQLObjectType({
  name: 'Color'
});

const KeysetType = new GraphQLObjectType({
  name: 'Keyset',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    manufacturer: { type: GraphQLString },
    material: { type: GraphQLString },
    profile: { type: GraphQLString },
    kits: { type: GraphQLString },
    tags: { type: GraphQLString },
    vendor: {
      type: VendorType,
      resolve(parent, args){
        return model.getVendorsByIdDataloader.load(parent.vendor_id);
      }
    },
    url: { type: GraphQLString },
    image_url: { type: GraphQLString },
    description: {type: GraphQLString },
    price: {type: GraphQLFloat },
    quantity: { type: GraphQLInt },
    available: {type: GraphQLBoolean}
  })
});

const KeyboardType = new GraphQLObjectType({
  name: 'keyboard',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    tags: { type: GraphQLString },
    description: { type: GraphQLString },
    vendor_id: { type: GraphQLInt },
    price: { type: GraphQLInt },
    quantity: { type: GraphQLInt },
    available: { type: GraphQLBoolean },
    creator: { type: GraphQLString },
    mount_style: { type: GraphQLString },
    hotswap: { type: GraphQLBoolean },
    layout: { type: GraphQLString },
    size: { type: GraphQLInt },
    weight: { type: GraphQLFloat },
    rgb: { type: GraphQLString },
    plate_type: { type: GraphQLString },
    plate_material: { type: GraphQLString },
    angle: { type: GraphQLFloat },
    build_options: { type: GraphQLString },
    programmability: { type: GraphQLString },
    switch_compatability: { type: GraphQLString },
    dimensions: { type: GraphQLString },
    first_appearance: { type: GraphQL },
    connector: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    vendor: {
      type: VendorType,
      args: { id: {type: GraphQLID} },
      resolve(parent, args) {
        return model.getVendor({id: args.id}).then(results => results[0]);
      }
    },
    keyset: {
      type: KeysetType,
      args: { id: {type: GraphQLID} },
      resolve(parent, args) {
        return model.getKeyset({ id: args.id }).then(result => result[0]);
      }
    },
    keysets: {
      type: new GraphQLList(KeysetType),
      resolve(parent, args) {
        return model.getKeysets();
      }
    },
    vendors: {
      type: new GraphQLList(VendorType),
      resolve(parent, args) {
        return model.getVendors();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});