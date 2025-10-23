import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Layout, ModuleDetail } from "../components";
import QueryResult from "../components/query-result";
import { useParams } from "react-router-dom";
import TrackDetail from "../components/track-detail";
 
/** TRACKS gql query to retrieve all tracks */
const GET_MODULE= gql`
  query Module($trackId: ID!, $moduleId: ID!) {
    track(id: $trackId) {
        id
        title
        modules {
            id
            title
            length
        }
    }
    module(id: $moduleId) {
        id
        title
        content
        videoUrl
    }
  }
`;
 
/**
* Tracks Page is the Catstronauts home page.
* We display a grid of tracks fetched with useQuery with the TRACKS query
*/
const Module = () => {
  const { trackId = "" , moduleId = ""} = useParams();
  const { loading, error, data } = useQuery(GET_MODULE, {
    variables: {trackId, moduleId}
  });
   
  return (
    <Layout fullWidth>
      <QueryResult error={error} loading={loading} data={data}>
          <ModuleDetail track={data?.track} module={data?.module}/>
      </QueryResult>
    </Layout>
  );
};
 
export default Module;