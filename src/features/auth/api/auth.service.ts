import axios from "axios"
import { API_URL } from "../../../config"

export const AuthService = {
    login: async (email: string, password: string) => {
        const response = await axios.post(`${API_URL}/auth/signin`, { email, password });
        return response;
    }
}