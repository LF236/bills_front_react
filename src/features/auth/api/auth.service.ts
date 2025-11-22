import axios from "axios"
import { API_URL } from "../../../config"
import type { SignInInterface } from "../types/auth.types";

export const AuthService = {
	login: async (email: string, password: string) => {
		const response = await axios.post(`${API_URL}/auth/signin`, { email, password });
		return response;
	},

	signUp: async (data: SignInInterface) => {
		const response = await axios.post(`${API_URL}/auth/signup`, data);
		return response;
	},

	validateToken: async (token: string) => {
		try {
			const respose = await axios.post(`${API_URL}/magic-link/validate`, { token });
			return respose;
		} catch (error) {
			return AuthService.handleError(error);
		}
	},

	requestNewToken: async (email: string) => {
		try {
			const response = await axios.post(`${API_URL}/magic-link/request_new_token`, { email });
			return response;
		} catch (error) {
			return AuthService.handleError(error);
		}
	},

	handleError: (error: any) => {
		if (error.response && error.response.data && error.response.data.message) {
			throw new Error(error.response.data.message);
		}

		if (error.message) {
			throw new Error(error.message);
		}

		throw new Error('An unknown error occurred');
	}
}