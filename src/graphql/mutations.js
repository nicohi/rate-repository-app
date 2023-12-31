import { gql } from '@apollo/client';

export const LOGIN = gql`
mutation ($username: String!, $password: String!) {
  authenticate(credentials: { username: $username, password: $password, }) {
    accessToken
    expiresAt
    user {
      id
    }
  }
}
`;

export const CREATE_REVIEW = gql`
mutation ($review: CreateReviewInput) {
  createReview(review: $review) {
    id
    repositoryId
    text
    createdAt
    rating
    userId
  }
}
`;

export const CREATE_USER = gql`
mutation CreateUser($user: CreateUserInput) {
  createUser(user: $user) {
    id
    username
    createdAt
    reviewCount
  }
}
`;
