import { useLazyQuery, useQuery } from "@apollo/client/react";
import type { Me } from "../domain/me.model";
import { GET_ME_QUERY } from "../api/auth.queries";
import { mapMeDtoToModel } from "../api/mapMeDtoToModel";

interface UseGetMeResult {
  // me: Me | null;
  loading: boolean;
  error: Error | undefined;
  called: boolean;
  getMe: (token: string) => void;
  data: any;
}

export function useGetMe() : UseGetMeResult {
  const [ getMe, { loading, data, error, called } ] = useLazyQuery(GET_ME_QUERY, {
    fetchPolicy: 'network-only'
  });

  const getMeRequest = (token: string) => {
    getMe({
      context: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    })
  }

  return {
    getMe: getMeRequest,
    loading,
    error,
    called,
    data
  }
}