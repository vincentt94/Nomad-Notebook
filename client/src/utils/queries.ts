import { gql } from "@apollo/client";

export const GET_STORIES = gql`
  query GetStories {
    getStories {
      _id  
      title
      story
      imageUrl  
      username  
    }
  }
`;