const resolvers = {
    Query: {
        tracksForHome:(_, __, {dataSources}) => {
            // We have not called the author endpoint in this resolver and created another resolver, for the following reasons:
            // 1. To keep resolver lightweight and responsible for specific pieces of data.
            // 2. To prevent unnecessary REST API calls when query does not ask for author's data.
            // 3. To keep resolvers more resilient to future changes.
            return dataSources.trackAPI.getTracksForHome();
        },
        track:(_, {id}, {dataSources}) => {
            return dataSources.trackAPI.getTrackById(id);
        },
        module:(_, {id}, {dataSources}) => {
            return dataSources.trackAPI.getModuleById(id);
        },
    },
    Mutation:{
        incrementViews: async (_, {trackId}, {dataSources}) => {
            try {
                const track = await dataSources.trackAPI.incrementViews(trackId);
                return {
                code: 200,
                success: true,
                message: `Successfully incremented number of views for track ${trackId}`,
                track
                };
            } catch (err) {
                return {
                code: err.extensions.response.status,
                success: false,
                message: err.extensions.response.body,
                track: null
                };
            }
        },

    },
    Track: {  
        // The authorId is the field from the rest api endpoint track, 
        // so the parent resolver: tracksForHome has all data including this, but graphql api is not using this authorId.
        // as the author has the parent resolver tracksFoHome, the whole parent data is accessible from the first param.
        author:({authorId}, _, {dataSources}) => {
            return dataSources.trackAPI.getAuthor(authorId);
        },

        modules:({id}, _, {dataSources}) => {
            return dataSources.trackAPI.getTrackModules(id);
        }
    }
};

export default resolvers;