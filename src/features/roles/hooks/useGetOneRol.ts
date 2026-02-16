import { useEffect, useState } from 'react';
import { useRolsStore } from './useRolsStore';
import { useLazyQuery } from '@apollo/client/react';
import { GET_ROL_BY_ID_QUERY } from '../api/rols.queries';
import { mapRolsRequestToModel } from '../api/mapRolsRequestToModel';
import type { Rol } from '../domain/rol.model';

export const useGetOneRol = () => {
  const { idRolToUpdateOrDelete } = useRolsStore();
  const [ rolData, setRolData ] = useState<Rol | null>(null);
  const [ getRolById, { data, loading, error, called } ] = useLazyQuery(GET_ROL_BY_ID_QUERY, {
    fetchPolicy: 'network-only'
  });


  useEffect(() => {
    if(called && !loading && !error) {
      const { rol } = data as any;
      if(rol) {
        let parseRol = mapRolsRequestToModel(rol);
        setRolData(parseRol);
      }
    } else if(error) {
      setRolData(null);
    }
  }, [ data, called, loading, error ])

  const fetchRolById = async () => {
    if(!idRolToUpdateOrDelete) return;
    getRolById({
      variables: {
        rolId: idRolToUpdateOrDelete
      }
    });
  }

  return {
    fetchRolById,
    rolData: rolData,
    loading,
    error
  }

}