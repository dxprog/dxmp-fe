interface HttpParameters {
  [key: string]: string
}

export class DataConnector {

  public async get(url: string, params: HttpParameters = {}) {
    return this.call(this.buildUrl(url, params));
  }

  private async call(url: string, method: string = 'GET', payload: Object = {}): Promise<Object> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      url = `/api/content${url}`;
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            try {
              const data = JSON.parse(xhr.responseText);
              resolve(data);
            } catch (exc) {
              reject(exc);
            }
          } else {
            reject();
          }
        }
      };
      xhr.open(method, url, true);
      xhr.send(payload);
    });
  }

  private buildUrl(url: string, params: HttpParameters = {}) {
    const hasQueryString = url.indexOf('?');
    const kvps = Object.keys(params).map(key => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
    });

    if (kvps.length) {
      url = `${url}${hasQueryString ? '&' : '?'}${kvps.join('&')}`;
    }

    return url;
  }
}