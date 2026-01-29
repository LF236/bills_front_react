import { gql } from '@apollo/client';

export const CREATE_PERMISSION_MUTATION = gql`
  mutation CreatePermission($createPermissionInput: CreatePermissionInput!) {
    createPermission(createPermissionInput: $createPermissionInput) {
      id
      name
    }
  }
`;

export const UPDATE_PERMISSION_MUTATION = gql`
  mutation UpdatePermission($updatePermissionInput: UpdatePermissionInput!) {
    updatePermission(updatePermissionInput: $updatePermissionInput) {
      id
      name
      is_active
      created_at
    }
  }
`;