import { gql } from "@apollo/client";

export const GET_PERMISSIONS_QUERY = gql`
  query Permissions($offset: Int, $limit: Int, $search: String) {
    permissions(offset: $offset, limit: $limit, search: $search) {
      items {
        id
        name
        description
        deleted_at
        created_at
        is_active
        roles {
          id
          name
        }
      }
      total
    }
  }
`;