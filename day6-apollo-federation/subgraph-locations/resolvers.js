const resolvers = {
  Query: {
    locations: (_, __, { dataSources }) => {
      return dataSources.locationsAPI.getAllLocations();
    },
    location: (_, { id }, { dataSources }) => {
      return dataSources.locationsAPI.getLocation(id);
    },
  },
  // Destructure the first argument, which is the entity representation object, and pull out the id field from it.
  Location: {
    __resolveReference: ({id}, {dataSources}) => {
      return dataSources.locationsAPI.getLocation(id);
    }
  }
};

module.exports = resolvers;
