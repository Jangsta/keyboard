const graphql = require('graphql');
const _ = require('lodash');
const model = require('../../models');
const { GraphQLObjectType, GraphQLFloat, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean, GraphQLList, GraphQLSchema} = graphql;

var vendors = [
  {
    id: 1,
    name: 'drop',
    description: 'formerly named massdrop',
    website_url: 'https://drop.com',
    instagram_url: 'https://www.instagram.com/drop',
    discord_url: null,
    facebook_url: 'https://www.facebook.com/drop',
    twitter_url: 'https://twitter.com/drop',
    payment_types: 'paypal',
    location: 'US',
    keysets: [1, 2]
  }
];

var keysets = [
  {
    id: 1,
    name: 'gmk laser',
    manufacturer: "gmk",
    material: "abs",
    profile: "cherry",
    kits: "cyberdeck,gaijin,kobe,blocknet,mitowaves,ergo,euro,spacebars,colverak",
    tags: null,
    vendor_id: 1,
    url: "https://drop.com/buy/drop-mito-sa-laser-custom-keycap-set",
    image_url: "https://massdrop-s3.imgix.net/product-images/massdrop-x-mito-gmk-laser-custom-keycap-set/pc_20171031145722.jpg?auto=format&fm=jpg&fit=fill&w=820&h=547&bg=f0f0f0&dpr=2&q=35",
    description: "Step into a world full of bright lights and dark shadows, and artificial intelligence and genuine ‘80s nostalgia with MiTo’s latest set: GMK Laser. Designed by the creator of XDA Godspeed, XDA Canvas, and DSA Legacy, GMK Laser is dripping with futuristic colors and cultural references from the cyberpunk past. Look for allusions to William Gibson’s Neuromancer, Ridley Scott’s Blade Runner, and even Stranger Things. The alphas, done in violet, pair gracefully with the midnight purple modifiers. Brought to life by hot pink and teal legends, the set looks like it was shot straight from the barrel of a laser gun.",
    price: 109.99,
    quantity: 2103,
    available: false
  },
  {
    id: 2,
    name: 'gmk red samurai',
    manufacturer: "gmk",
    material: "abs",
    profile: "cherry",
    kits: "base,nishi,hiragana,novelties,ergoplanck,norde,dc,spacebars",
    tags: null,
    vendor_id: 1,
    image_url: "https://massdrop-s3.imgix.net/product-images/massdrop-x-redsuns-gmk-red-samurai-keycap-set/7YKNKVQT6m1ewgcHsAZw_2.jpg?auto=format&fm=jpg&fit=crop&w=1080&bg=f0f0f0&dpr=2&q=35",
    url: "https://drop.com/buy/massdrop-x-redsuns-gmk-red-samurai-keycap-set",
    description: "Strap on some armor, unsheath your katana, and prepare to defend your desktop: GMK Red Samurai, the first keycap set from designer RedSuns, features a striking three-toned colorway evocative of a Japanese warrior’s armor. The fierce combination of red and dark gray with golden accents and legends will complement any keyboard, especially dark ones. The inspiration behind the set came from the designer’s interest in Japanese general Ii Naomasa, who played a crucial role in creating the Samurai code during the feudal era. He was also known for charging into battle with vivid red armor to intimidate his enemies. Sculpted in Cherry profile, GMK Red Samurai is compatible with Cherry MX switches and clones.",
    price: 109.99,
    quantity: 2103,
    available: false
  }
];

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
        return _.filter(keysets, {vendor_id: parent.id})
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
        return _.find(vendors, {id: parent.vendor_id})
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
        return _.find(vendors, { id: parseInt(args.id) });
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
        return vendors;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});