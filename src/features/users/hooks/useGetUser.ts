import { useLazyQuery } from '@apollo/client/react';
import { GET_USER_QUERY } from '../api/users.queries';
import { useEffect, useState } from 'react';
import type { UserDetailInterface } from '../domain/user-detail.interface';

export const useGetUser = () => {
  const [getUserQuery, { loading, data, error, called }] = useLazyQuery(GET_USER_QUERY, {
    fetchPolicy: 'network-only'
  });
  const [userData, setUserData] = useState<UserDetailInterface | null>(null);

  useEffect(() => {
    if (called && data && !loading) {
      const { user } = data as { user: UserDetailInterface };
      setUserData({
        id: user.id,
        email: user.email,
        avatarUrl: user.avatarUrl,
        is_active: user.is_active,
        name: user.name,
        roles: user.roles,
        created_at: user.created_at
      });
    }
  }, [called, data, loading])


  const getUser = (id: string) => {
    getUserQuery({
      variables: {
        id
      }
    });
  }

  return {
    getUser,
    userData,
    loading,
    error,
    called
  }
}