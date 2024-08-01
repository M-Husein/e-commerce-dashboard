import Cookies from 'js-cookie';

export const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;
export const TOKEN_KEY_UID = import.meta.env.VITE_APP_Q;

/**
 * Get auth token
 * @returns string token | undefined
 */
export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY);

  if(token && token.includes(TOKEN_KEY_UID)){
    return token.replace(TOKEN_KEY_UID, '');
  }
}

/**
 * Clear auth token etc
 * @returns void
 */
export function clearToken(){
  Cookies.remove(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
}
