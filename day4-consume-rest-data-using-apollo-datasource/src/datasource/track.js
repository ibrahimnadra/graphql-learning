import { RESTDataSource } from "@apollo/datasource-rest";
 
class TrackAPI extends RESTDataSource {
  baseURL = "https://odyssey-lift-off-rest-api.herokuapp.com/";
   
  getTracksForHome() {
    return this.get("tracks");
  }
   
  getAuthor(authorId) {
    return this.get(`author/${authorId}`);
  }
}
 
export default TrackAPI;