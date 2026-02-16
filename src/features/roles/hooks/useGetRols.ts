import { useEffect, useState } from "react";
import { useRolsStore } from "./useRolsStore"
import type { Rol } from "../domain/rol.model";
import { useLazyQuery } from "@apollo/client/react";
import { GET_ROLS_QUERY } from "../api/rols.queries";
import { mapRolsRequestToModel } from "../api/mapRolsRequestToModel";

export const useGetRols = () => {
  const { search, offset, limit } = useRolsStore();
  const [ rolsList, setRolsList] = useState<Rol[]>([]);
  const [ total, setTotal ] = useState<number>(0);
  const [getRolsQuery, { data, loading, error, called }] = useLazyQuery(GET_ROLS_QUERY, {
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    if(called && data && !loading) {
      const { rols } = data as any;
      const { items = [], total = 0 } = rols as any;
      let parseItems = items.map((item: any) => mapRolsRequestToModel(item));
      setRolsList(parseItems);
      setTotal(total);
    }
  }, [called, data, loading]);

  const getRols = () => {
    getRolsQuery({
      variables: {
        search,
        offset,
        limit,
      },
    });
  }

  return {
    rolsList: rolsList,
    loading: loading,
    error: error || null,
    getRols,
    total: total
  }
}