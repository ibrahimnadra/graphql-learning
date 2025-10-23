import { RESTDataSource } from "@apollo/datasource-rest";
 
class TrackAPI extends RESTDataSource {
  baseURL = "https://odyssey-lift-off-rest-api.herokuapp.com/";
   
  getTracksForHome() {
    return this.get("tracks");
  }

  getTrackById(id) {
    return this.get(`track/${id}`);
  }
   
  getAuthor(authorId) {
    return this.get(`author/${authorId}`);
  }

  getTrackModules(trackId) {
    return this .get(`track/${trackId}/modules`);
  }

  getModuleById(moduleId){
    return this.get(`module/${moduleId}`);
  }

  incrementViews(trackId){
    return this.patch(`track/${trackId}/numberOfViews`);
  }
}
 
export default TrackAPI;