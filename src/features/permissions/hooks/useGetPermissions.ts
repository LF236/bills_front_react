import { useLazyQuery } from "@apollo/client/react";
import type { Permission } from "../domain/permission.model";
import { GET_PERMISSIONS_QUERY } from "../api/permissions.queries";
import { usePermissionStore } from "./usePermissionStore";
import { useEffect, useState } from "react";
import { mapPermissionRequestToModel } from "../api/mapPermissionRequestToModel";

export function useGetPermissions() {
  const { search, offset, limit } = usePermissionStore();
  const [permissionsList, setPermissionsList] = useState<Permission[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [getPermissionsQuery, { data, loading, error, called }] = useLazyQuery(GET_PERMISSIONS_QUERY);

  useEffect(() => {
    if(called && data && !loading) {
      const { permissions } = data as any;
      const { items = [], total = 0 } = permissions as any;
      let parseItem = items.map((item : any) => mapPermissionRequestToModel(item));
      
      setPermissionsList(parseItem);
      setTotal(total);
    }
  }, [called, data, loading]);

  const getPermissions = () => {
    getPermissionsQuery({
      variables: {
        search,
        offset,
        limit,
      }
    });
  }

  return {
    permissionsList: permissionsList,
    loading: loading,
    error: error || null,
    total: total,
    getPermissions,
  }

}