import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy) {
  repositories(orderDirection: $orderDirection, orderBy: $orderBy) {
        edges {
        node {
            id
            name
            fullName
            description
            language
            forksCount
            stargazersCount
            ratingAverage
            reviewCount
            ownerAvatarUrl
            ownerName
      }
    }
  }
}
`;

export const GET_REPOSITORY = gql`
query($repositoryId: ID!) {
  repository(id: $repositoryId) {
    id
    name
    fullName
    description
    language
    forksCount
    stargazersCount
    ratingAverage
    reviewCount
    ownerAvatarUrl
    url
    ownerName
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
}
`;


export const ME = gql`
query {
  me {
    id
    username
  }
}
`;
