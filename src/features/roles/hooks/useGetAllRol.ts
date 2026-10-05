import { useLazyQuery } from "@apollo/client/react"
import { GET_ALL_NAME_ID_QUERY } from "../api/rols.queries"
import { useEffect } from "react";
import { useRolsStore } from "./useRolsStore";

export const useGetAllRols = () => {
  const { all, setAllJustIdAndName } = useRolsStore();
  const [getAll, { data, loading, error, called }] = useLazyQuery<{ allRolsWithIdName: {id: string, name: string}[] }>(GET_ALL_NAME_ID_QUERY, {
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    if(called && data && !loading) {
      const { allRolsWithIdName } = data;
      setAllJustIdAndName(allRolsWithIdName);
    }
  }, [called, data, loading]);

  const getAllRols = () => {
    // TODO: Fix when a user update a rol and this is in cache
    if(all.length === 0) {
      getAll({
        variables: {}
      });
    }
  }

  return {
    loading: loading,
    error: error || null,
    getAllRols,
  }
}