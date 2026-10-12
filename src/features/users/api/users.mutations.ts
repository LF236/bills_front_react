import { gql } from '@apollo/client';

export const TOGGLE_USER_STATUS_MUTATION = gql`
    mutation ToggleUserStatus($input: ToggleUserStatusInput!){
        toggleUserStatus(toggleUserStatusInput: $input) {
            id
            name
            email
            is_active
        }
    }
`;

export const UPDATE_USER_ROLES_MUTATION = gql`
    mutation UpdateUserRoles($updateUserRolesInput: UpdateUserRolesInput!) {
        updateUserRoles(updateUserRolesInput: $updateUserRolesInput) {
            id
            name
            roles {
                id
                name
            }
        }
    }
`;

export const ADMIN_RESEND_VALIDATION_EMAIL_MUTATION = gql`
  mutation AdminResendValitationEmail($userId: String!) {
    adminResendValidationEmail(userId: $userId) {
      message
    }
  }
`;