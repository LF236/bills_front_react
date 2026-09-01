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