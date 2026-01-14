export const env = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  TOKEN_KEY: 'auth_token',
  GPL_URL: import.meta.env.VITE_GPL_URL || 'http://localhost:3000/graphql',
}