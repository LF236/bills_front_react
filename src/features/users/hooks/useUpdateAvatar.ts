import { useEffect, useState } from "react"
import { UserRequest } from "../api/user.request";
import { ComonService } from "../../common/api/comon.service";
import { useAuth } from "../../auth/hooks/useAuth";
import { useAlertStore } from "../../common/store/useAlertStore";

export const useUpdateAvatar = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sucefull, setSucessfull] = useState<boolean>(false);
  const [response, setResponse] = useState<any>(null);
  const {setProfileImageUrl} = useAuth();
  const addAlert = useAlertStore(state => state.addAlert);

  const submitAvatar = async (file: File) => {
    const form = new FormData();
    form.append('file', file);

    try {
      setLoading(true);
      setError(null);
      setSucessfull(false);

      const response = await UserRequest.uploadAvatar(form);
      if(response) {
        setResponse(response);
        setSucessfull(true);
      } else {
        setResponse(null);
        throw new Error('Unexpected response from server. Please try again later.');
      }
    } catch (error) {
      setResponse(null);
      if(error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // TODO: Refactor this
    const getImage = async () => {
      if(response && response.url) {
        const url = await ComonService.getImageWithToken(response.url);
        setProfileImageUrl(url);
      }
    }

    if(!loading && sucefull) {
      getImage();
    }
  }, [loading, error, sucefull]);

  useEffect(() => {
    if(error) {
      addAlert({
        title: 'Error Updating Avatar',
        subtitle: error,
        type: 'error',
        showButtonClose: true,
        isWithTimeToClose: true,
        timeToClose: 3000,
        id: crypto.randomUUID(),
      });
    }
  }, [error]);
  
  useEffect(() => {
    if(sucefull) {
      addAlert({
        title: 'Avatar Updated',
        subtitle: 'Your avatar has been updated successfully.',
        type: 'success',
        showButtonClose: false,
        isWithTimeToClose: true,
        timeToClose: 3000,
        id: crypto.randomUUID(),
      });
    }
  }, [sucefull]);

  return {
    loading, 
    error,
    sucefull,
    submitAvatar
  }
}