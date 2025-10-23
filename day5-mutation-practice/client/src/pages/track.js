import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Layout } from "../components";
import QueryResult from "../components/query-result";
import { useParams } from "react-router-dom";
import TrackDetail from "../components/track-detail";
 
/** TRACKS gql query to retrieve all tracks */
const GET_TRACK = gql`
  query Track($trackId: ID!) {
    track(id: $trackId) {
        id
        title
        thumbnail
        length
        modulesCount
        description
        numberOfViews
        author {
            id
            name
            photo
        }
        modules {
            id
            title
            length
        }
    }
}
`;
 
/**
* Tracks Page is the Catstronauts home page.
* We display a grid of tracks fetched with useQuery with the TRACKS query
*/
const Track = () => {
  const { trackId = "" } = useParams();
  const { loading, error, data } = useQuery(GET_TRACK, {
    variables: {trackId}
  });
   
  return (
    <Layout grid>
      <QueryResult error={error} loading={loading} data={data}>
          <TrackDetail track={data?.track} />
      </QueryResult>
    </Layout>
  );
};
 
export default Track;