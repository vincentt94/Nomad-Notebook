import { gql } from '@apollo/client';

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