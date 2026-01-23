import { gql } from '@apollo/client';

export const CREATE_PERMISSION_MUTATION = gql`
  mutation CreatePermission($createPermissionInput: CreatePermissionInput!) {
    createPermission(createPermissionInput: $createPermissionInput) {
      id
      name
    }
  }
`;