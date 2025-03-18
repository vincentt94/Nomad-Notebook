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

export const USER_STORIES = gql`
    query GetUserStories {
        getUserStories {
            _id
            story
            title
            imageUrl
        }
    }
`