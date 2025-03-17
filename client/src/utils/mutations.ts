import { gql } from '@apollo/client';


export const ADD_USER = gql`
  mutation Mutation($input: UserInput!) {
  addUser(input: $input) {
    user {
      username
      _id
      email
    }
    token
  }
}
`;

export const LOGIN_USER = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
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
  mutation AddStory($title: String!, $story: String!, $imageUrl: String) {
    addStory(title: $title, story: $story, imageUrl: $imageUrl) {
      _id
      title
      story
      imageUrl
      userId
    }
  }
`;