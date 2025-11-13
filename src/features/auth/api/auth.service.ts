import axios from "axios"
import { API_URL } from "../../../config"
import type { SignInInterface } from "../types/auth.types";

export const AuthService = {
	login: async (email: string, password: string) => {
		const response = await axios.post(`${API_URL}/auth/signin`, { email, password });
		return response;
	},

	signUp: async (data: SignInInterface) => {
		return {
			msg: 'ok',
			data: data
		}
	}
}