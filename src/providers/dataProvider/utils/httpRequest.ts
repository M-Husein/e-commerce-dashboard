/**
 * @FROM : https://github.com/refinedev/refine/blob/master/packages/simple-rest/src/utils/axios.ts
 */
// import { HttpError } from "@refinedev/core";
import ky from 'ky';

export const httpRequest = ky.create({ 
  prefixUrl: import.meta.env.VITE_API, 
  retry: 0,
  timeout: 3e4, // Default = 10000
});
