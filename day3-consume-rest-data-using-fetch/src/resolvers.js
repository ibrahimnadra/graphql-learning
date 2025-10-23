const resolvers = {
    Query: {
        tracksForHome: async () => {
            const baseUrl = "https://odyssey-lift-off-rest-api.herokuapp.com";
            const res = await fetch(`${baseUrl}/tracks`);
            return res.json();
        },
    },
    Track: {  
        author: async ({authorId}) => {
            const baseUrl = "https://odyssey-lift-off-rest-api.herokuapp.com";
            const res = await fetch(`${baseUrl}/author/${authorId}`);
            return res.json();
        }
    }
};

export default resolvers;