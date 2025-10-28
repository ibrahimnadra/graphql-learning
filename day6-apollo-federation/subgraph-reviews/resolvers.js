const resolvers = {
  Query: {
    latestReviews: (_, __, {dataSources}) => {
      return dataSources.reviewsAPI.getLatestReviews();
    }
  },
  // the first argument ({ locationId }) is not the GraphQL type definition, 
  // it’s the parent object — i.e. the actual data returned by the previous resolver (or the root data source).
  Review: {
    location: ({locationId}) => {
      return {id: locationId};
    },
  },
  Location:{
    // It's optional as we're using Apollo Server, defining the reference resolver function explicitly in the reviews subgraph is not a requirement. 
    // Apollo Server defines a default reference resolver for any entities we don't define one for.
    __resolveReference: (location) => {
      return location;
    },
    overallRating: ({id}, _, {dataSources}) => {
      return dataSources.reviewsAPI.getOverallRatingForLocation(id);
    },

    reviewsForLocation: ({id}, _, {dataSources}) => {
      return dataSources.reviewsAPI.getReviewsForLocation(id);
    }
  },
  Mutation: {
    submitReview: (_, {locationReview}, {dataSources}) => {
      const newReview = dataSources.reviewsAPI.submitReviewForLocation(locationReview);
      return {code: 200, success: true, message: 'success', locationReview: newReview};
    }
  }
};

module.exports = resolvers;
