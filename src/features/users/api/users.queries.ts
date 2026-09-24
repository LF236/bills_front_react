import { gql } from '@apollo/client';

export const GET_USERS_QUERY = gql`
  query Users($offset: Int, $limit: Int, $search: String) {
    users(offset: $offset, limit: $limit, search: $search) {
      total
      users {
        id
        email
        is_active
        name
        roles {
          id
          name
        }
      }
    }
  }
`;

export const GET_USER_QUERY = gql`
  query User($id: String!) {
    user(id: $id) {
      id
      name
      email
      is_active
      avatarUrl
      created_at
      roles {
        id
        name
      }
    }
  }
`;