import { http } from '../http';

export const authApi = {
  login: (credentials: object) => 
    http('/users/login', { 
      method: 'POST', 
      body: JSON.stringify(credentials) 
    }),
};