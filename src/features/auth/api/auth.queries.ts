import { gql } from '@apollo/client';

export const GET_ME_QUERY = gql`
  query Me {
    me {
      id
      name
      email
      is_active
    }
  }
`;