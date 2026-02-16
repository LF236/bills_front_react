import { useLazyQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";
import { GET_ALL_PERMISSIONS_QUERY } from "../api/permissions.queries";

export function useGetAllPermissions() {
  const [ permissionsList, setPermissionsList ] = useState([]);
  const [ getAllPermissions, { data, loading, error, called }] = useLazyQuery(GET_ALL_PERMISSIONS_QUERY, {
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    if( called && data && !loading ) {
      const { permissions } = data as any;
      const { items = [] } = permissions as any;
      setPermissionsList(items);
    } 
  }, [ called, data, loading ])

  const fetchAllPermissions = ( search = '', offset = 0, limit = 1000, paginate = false ) => {
    getAllPermissions({
      variables: {
        search,
        offset,
        limit,
        paginate
      }
    });
  }

  return {
    permissionsList: permissionsList,
    loading: loading,
    error: error || null,
    fetchAllPermissions
  };
}