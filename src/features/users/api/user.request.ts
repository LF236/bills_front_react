import * as axios from 'axios';
import { env } from '../../../config';

export class UserRequest {
  static async uploadAvatar(form: FormData) {
    try {
      const token = localStorage.getItem('x-access-token');
      if(!token) {
        throw new Error('User is not authenticated. Please log in and try again.');
      }

      const response = await axios.default.post(`${env.API_URL}/files/upload/avatar`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      return response.data;
    } catch (error) {
      let errorMessage = '';
      if(axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message || 'An error occurred while uploading the avatar. Please try again later.';
      }

      throw new Error(errorMessage || 'An error occurred while uploading the avatar. Please try again later.');
    }
  }
}