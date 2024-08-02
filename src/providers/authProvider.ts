import { AuthProvider } from "@refinedev/core";
import Cookies from 'js-cookie';
import { httpRequest } from '@/providers/dataProvider';
import { getToken, clearToken, TOKEN_KEY, TOKEN_KEY_UID } from '@/utils/authToken';

export const authProvider: AuthProvider = {
  register: async ({ redirectPath, ...json }) => {
    const errorResponse = {
      success: false,
      error: {
        name: "RegisterError",
        message: "Failed register",
      },
    };

    try {
      /** @OPTION : For cross domain */
      // await api.get('csrf-cookie');

      const req: any = await httpRequest.post('auth/register', { json }).json();

      if(req?.data){
        const token = req.data.token;
        if(token){
          Cookies.set(
            TOKEN_KEY, 
            token + TOKEN_KEY_UID,
            {
              expires: 1,
              sameSite: "strict",
              secure: window.location.protocol !== "http:",
            }
          );

          return {
            success: true,
            redirectTo: "/",
            successNotification: {
              message: "Registration Successful",
              description: "You have successfully registered",
            },
          };
        }

        return {
          success: true,
          redirectTo: redirectPath,
          successNotification: {
            message: "Registration Successful",
            description: "You have successfully registered",
          },
        };
      }

      return errorResponse;
    } catch(e: any){
      return errorResponse;
    }
  },
  
  login: async ({ email, username, password, remember, providerName }) => {
    const errorResponse = {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    };

    if(((username || email) && password) || providerName){
      try {
        /** @OPTION : For cross domain */
        // await api.get('csrf-cookie');

        const expires = remember ? 3 : 1;

        const req: any = await httpRequest.post('user/login', {
          json: { 
            email, 
            username, 
            password, 
            /**
             * 1440 (1 day)
             * 4320 (3 day)
             */
            expiresInMins: expires * 1440
          },
        }).json();

        if(req?.token){
          const cookieOptions: any = {
            sameSite: "lax", // lax | strict
            secure: window.location.protocol !== "http:",
          };

          Cookies.set(
            TOKEN_KEY, 
            req.token + TOKEN_KEY_UID,
            {
              ...cookieOptions,
              expires,
            }
          );

          if(req.refreshToken){
            Cookies.set("refreshToken", req.refreshToken, cookieOptions);
          }

          return {
            success: true,
            redirectTo: "/",
          };
        }

        return {
          ...errorResponse,
          error: {
            ...errorResponse.error,
            message: "We apologize that an error occurred. Please try again."
          }
        };
      }catch(e: any){
        return errorResponse;
      }
    }

    return errorResponse;
  },

  logout: async () => { // params: any
    const errorResponse = {
      success: false,
      error: {
        name: "LogoutError",
        message: "Logout failed",
      },
    };

    const token = getToken();

    if(token){
      clearToken();

      const bc = new BroadcastChannel(import.meta.env.VITE_BC_NAME);
      bc.postMessage({ type: "LOGOUT" });

      return {
        success: true,
        redirectTo: "/login",
      };
    }

    return errorResponse;
  },
  
  check: async () => {
    const errorResponse = {
      authenticated: false,
      logout: true,
      // redirectTo: "/login",
      error: {
        name: "Unauthorized",
        message: "Check failed",
      },
    };

    const token = getToken();

    if(token){
      try {
        const req: any = await httpRequest('auth/me', {
          headers: {
            Authorization: 'Bearer ' + token,
          }
        })
        .json();
  
        if(req?.id){
          sessionStorage.setItem(TOKEN_KEY, JSON.stringify(req));
          return { ...req, authenticated: true }
        }
  
        // Clear data
        clearToken();
  
        return errorResponse;
      } catch(e){
        return errorResponse;
      }
    }

    return errorResponse;
  },

  getPermissions: async () => null,

  getIdentity: async () => {
    const token = getToken();
    const user = sessionStorage.getItem(TOKEN_KEY);

    if (user && token) {
      return JSON.parse(user);
    }

    return null;
  },

  forgotPassword: async ({ username }) => { // email
    const errorResponse = {
      success: false,
      error: {
        name: "ForgotPasswordError",
        message: "Username does not exist",
      },
    };

    try { // send password reset link to the user's email address here
      const req: any = await httpRequest('auth/forgot-password/' + username);
      
      if(req?.success){
        return {
          success: true,
          redirectTo: "/login",
        };
      }
      
      return errorResponse;
    } catch(e){
      return errorResponse;
    }
  },

  onError: async (error) => {
    const statusCode = error?.response?.status;

    if (statusCode === 401 || statusCode === 419) {
      return {
        error,
        authenticated: false,
        logout: true,
        redirectTo: "/login",
      }
    }

    return { error };
  },
};
