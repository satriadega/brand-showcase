import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query Posts {
    posts {
      id
      title
      imgUrl
      content
      createdAt
      UserMongoId
      Category {
        id
        name
        createdAt
      }
      Tags {
        id
        postId
        name
        createdAt
      }
    }
  }
`;

export const GET_POST = gql`
  query Query($postId: ID!) {
    post(id: $postId) {
      id
      title
      slug
      imgUrl
      content
      authorId
      categoryId
      createdAt
      updatedAt
      UserMongoId

      Author {
        _id
        username
        email
        role
        phoneNumber
        address
      }
      Category {
        id
        name
        createdAt
        updatedAt
      }
      Tags {
        id
        postId
        name
        createdAt
        updatedAt
      }
    }
  }
`;
