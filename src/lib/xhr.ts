export enum HTTP_METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

function onReadyStateChange(xhr: XMLHttpRequest): any {
  let retVal;
  if (xhr.readyState === XMLHttpRequest.DONE) {
    try {
      retVal = JSON.parse(xhr.responseText);
    } catch(exc) {
      throw new Error(exc);
    }
  }
  return retVal;
}

/**
 * Performs an XHR request to a JSON endpoint
 *
 * @param url The URL to fetch
 * @param method HTTP method to execute
 * @param data Data to send with the body of the HTTP request
 */
export async function request(url: string, method: HTTP_METHODS = HTTP_METHODS.GET, data: any = null) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.onreadystatechange = () => {
      try {
        const retVal = onReadyStateChange(xhr);
        if (retVal) {
          resolve(retVal);
        }
      } catch(exc) {
        reject(exc);
      }
    }
    xhr.send(data);
  });
}