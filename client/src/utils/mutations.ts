import { gql } from '@apollo/client';


export const ADD_USER = gql`
  mutation Mutation($input: UserInput!) {
  addUser(input: $input) {
    user {
      username
      _id
    }
    token
  }
}
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Story mutation
export const ADD_STORY = gql`
  mutation AddStory($title: String!, $story: String!, $imageUrl: String, $userId: ID!) {
    addStory(title: $title, story: $story, imageUrl: $imageUrl, userId: $userId) {
      id
      title
      story
      imageUrl
      userId
    }
  }
`;