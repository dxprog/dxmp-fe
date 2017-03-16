import { DxApiResponse } from '../interfaces/dxapi';

interface HttpParameters {
  [key: string]: string
}

const API_HOST = 'http://dxmp.us';

export class DataConnector {

  public async get(url: string, params: HttpParameters = {}) {
    return this.call(this.buildUrl(url, params));
  }

  public async getContent(contentType: string, params: HttpParameters = {}) {
    const payload: DxApiResponse = await this.call(this.buildUrl('', { contentType, method: 'content.getContent' }));
    const { body } = payload;
    return body.content;
  }

  private async call(url: string, method: string = 'GET', payload: Object = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      url = `${API_HOST}/api/${url}`;
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
    const hasQueryString = url.indexOf('?') > -1;
    const kvps = Object.keys(params).map(key => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
    });

    if (kvps.length) {
      url = `${url}${hasQueryString ? '&' : '?'}${kvps.join('&')}`;
    }

    return url;
  }
}