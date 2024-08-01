/**
 * @param url : string
 * @param options : Object (Fetch API options)
 * @returns Promise
 * ### Docs:
 * - [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
 * - [Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
 */
export function fetchApi(url: string, options: any = {}): Promise<any> {
  return new Promise((resolve: any, reject: any) => {
    const {
      responseType = 'json', // : 'json' | 'text' | 'blob' | 'arraybuffer' | 'formData' | undefined,
      ...restOptions
    } = {
      headers: {
        "Content-Type": "application/json",
        // "X-Requested-With": "XMLHttpRequest", // DEV_OPTION
        ...options?.headers
      },
      ...options
    };

    return fetch(url, restOptions)
      .then((response: any) => {
        if (response?.ok) {
          return response[responseType]();
        }
        
        reject('Network response was not OK');
      })
      .then(resolve)
      .catch(reject);
  });
}
