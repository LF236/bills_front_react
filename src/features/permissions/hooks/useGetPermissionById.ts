import { useEffect } from "react";
import { usePermissionStore } from "./usePermissionStore";
import { useLazyQuery } from "@apollo/client/react";
import { GET_PERMISSION_BY_ID_QUERY } from "../api/permissions.queries";
import { mapPermissionRequestToModel } from "../api/mapPermissionRequestToModel";

export function useGetPermissionById() {
  const { idPermissionToUpdateOrDelete, setPermissionToUpdateOrDelete } = usePermissionStore();
  const [ getPermissionById, { data, loading, error, called } ] = useLazyQuery(GET_PERMISSION_BY_ID_QUERY, {
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    if(called && idPermissionToUpdateOrDelete && data && !loading) {
      const { permission } = data as any;
      if(permission) {
        let parsePermission = mapPermissionRequestToModel(permission);
        setPermissionToUpdateOrDelete(parsePermission);
      } else {
        setPermissionToUpdateOrDelete(null);
      }
    }
  }, [called, data, loading]);

  const getPermission = () => {
    getPermissionById({
      variables: {
        permissionId: idPermissionToUpdateOrDelete
      }
    });
  }

  return {
    data,
    loading,
    error,
    getPermission
  }

}
