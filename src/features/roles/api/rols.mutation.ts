import { gql } from '@apollo/client';

export const UPDATE_ROL_MUTATION = gql`
  mutation UpdateRol($updateRol: UpdateRolInput!) {
    updateRol(updateRolInput: $updateRol) {
      id
      name
      is_active
      created_at
      permissions {
        id
        name
      }
    }
  }
`;

export const CREATE_ROL_MUTATION = gql`
  mutation CreateRol($createRolInput: CreateRolInput!) {
    createRol(createRolInput: $createRolInput) {
      id
      name
    }
  }
`;

export const DELETE_ROL_MUTATION = gql`
  mutation DeleteRol($id: ID!) {
    deleteRol(id: $id)
  }
`;