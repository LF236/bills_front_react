import { useQuery } from "@apollo/client/react";
import type { Me } from "../domain/me.model";
import { GET_ME_QUERY } from "../api/auth.queries";
import { mapMeDtoToModel } from "../api/mapMeDtoToModel";

interface UseGetMeResult {
  me: Me | null;
  loading: boolean;
  error: Error | null;
}

export function useGetMe() : UseGetMeResult {
  const {data, loading, error} = useQuery<any>(GET_ME_QUERY);

  return {
    me: data?.me ? mapMeDtoToModel(data.me) : null,
    loading,
    error: error || null,
  }
}