import { gql } from '@apollo/client';

export const CREATE_PERSON_MUTATION = gql`
  mutation CreatePerson($createPersonInput: CreatePersonInput!) {
    createPerson(createPersonInput: $createPersonInput) {
      id
    }
  }
`;