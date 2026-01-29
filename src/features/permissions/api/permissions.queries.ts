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

export const GET_PERMISSION_BY_ID_QUERY = gql`
  query Permission($permissionId: ID!) {
    permission(id: $permissionId) {
      id
      name
      description
      is_active
      created_at
      deleted_at
      roles {
        name
        id
      }
    }
  }
`;