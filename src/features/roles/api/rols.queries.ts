import { gql } from '@apollo/client';

export const GET_ROLS_QUERY = gql`
  query Rols($offset: Int, $limit: Int, $search: String) {
    rols(offset: $offset, limit: $limit, search: $search) {
      items {
        id
        name
        description
        is_active
        created_at
        permissions {
          id
          name
          is_active
        }
      }
      total
    }
  }
`;

export const GET_ROL_BY_ID_QUERY = gql`
  query Rol($rolId: ID!) {
    rol(id: $rolId) {
      id
      name
      description
      is_active
      permissions {
        id
        name
      }
    }
  }
`;