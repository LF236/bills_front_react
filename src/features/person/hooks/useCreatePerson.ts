import { useMutation } from "@apollo/client/react"
import { CREATE_PERSON_MUTATION } from "../api/person.mutation"
import { useAlertStore } from "../../common/store/useAlertStore";
import type { CreatePersonInterface } from "../types/person-gql-types";
import { useEffect } from "react";

export const useCreatePerson = () => {
  const [ mutation, { data, loading, error } ] = useMutation(CREATE_PERSON_MUTATION);
  const addAlert = useAlertStore(state => state.addAlert);

  const handleCreatePerson = (data: CreatePersonInterface, id_user: string) => {
    mutation({
      variables: {
        createPersonInput: {
          ...data,
          id_user: id_user
        }
      }
    });
  }

  useEffect(() => {
    if(error) {
      addAlert({
        title: 'Error Creating Person',
        subtitle: error.message,
        type: 'error',
        showButtonClose: true,
        isWithTimeToClose: true,
        timeToClose: 3000,
        id: crypto.randomUUID(),
      });
    }
  }, [error]);

  useEffect(() => {
    if(data) {
      addAlert({
        title: 'Person Created',
        subtitle: 'The person has been created successfully.',
        type: 'success',
        showButtonClose: false,
        isWithTimeToClose: true,
        timeToClose: 3000,
        id: crypto.randomUUID(),
      });
    }
  }, [data]);


  return {
    handleCreatePerson,
    loading,
    error,
    data
  }
}