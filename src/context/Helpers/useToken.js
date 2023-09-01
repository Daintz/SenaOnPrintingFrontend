import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('session_token');
    const userToken = tokenString;
    return userToken
  };

  const [token] = useState(getToken());

  return {
    token
  }
}