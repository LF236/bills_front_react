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