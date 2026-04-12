import React from 'react';
import axios from 'axios';

export const ComonService = {
  getToken: () : string => {
    const token = localStorage.getItem('x-access-token');
    return token ? token : '';
  },

  getImageWithToken: async (url: string) : Promise<string> => {
    const token = ComonService.getToken();
    const request = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      responseType: 'blob'
    });

    const imageUrl = URL.createObjectURL(request.data);
    return imageUrl;
  }
}