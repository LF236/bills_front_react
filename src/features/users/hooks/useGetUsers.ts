import { useEffect, useState } from 'react';
import { useUserStore } from "./useUsersStore";
import { useLazyQuery } from "@apollo/client/react";
import { GET_USERS_QUERY } from "../api/users.queries";
import { mapUsersRequestToModel } from '../api/mapUsersRequestToModel';

export const useGetUsers = () => {
  const { search, offset, limit } = useUserStore();
  const [ getUsersQuery, { loading, data, error, called }] = useLazyQuery(GET_USERS_QUERY, {
    fetchPolicy: 'network-only'
  })
  const [ userList, setUserList ] = useState([]);
  const [ total, setTotal ] = useState(0);


  useEffect(() => {
    if(called && data && !loading) {
      const { users } = data as any;
      const { users: items = [], total = 0 } = users as any;
      let parseItems = items.map((item: any) => mapUsersRequestToModel(item));
      setUserList(parseItems);
      setTotal(total);
    }
  }, [called, data, loading]);

  const getUsers = () => {
    getUsersQuery({
      variables: {
        search,
        offset,
        limit,
      },
    });
  }

  return {
    userList,
    total,
    getUsers,
    loading,
    error: error || null,
  }
}