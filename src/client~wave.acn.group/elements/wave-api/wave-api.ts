import { WaveElement, customElement, property } from '../wave-elements';

@customElement('wave-api')
export class WaveApi extends WaveElement {
  @property({ attribute: false }) schema: string  = 'http';
  @property({ attribute: false }) host: string  = '127.0.0.1';
  @property({ attribute: false }) port: string  = '8008';
  @property({ attribute: false }) basePath: string  = 'api';

  createRenderRoot() {
    return this
  }

  async post(data) {

  }

  async get(data) {
    
  }

  invoke(method:string, args = {}) {
    return new Promise((resolve, reject) => {
      // http://127.0.0.1:8008/api/pages
      const url = `${this.schema}://${this.host}:${this.port}/${this.basePath}/${method}`;
      console.log(url, args);
      fetch(url, {
        method: 'GET',

        mode: 'no-cors',
        headers: { 
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: 'Token 27af75ea118917ab196fa82b6a1d0d234f3f7bd1',
          Accept: 'application/json' 
        },
        // body: JSON.stringify(args),
      }).then(res => {
        console.log(res)
        const { status } = res;
        if (status === 200) resolve(res.json());
        else {
          reject(new Error(`Status Code: ${status}`))
        };
      });
    });
  

  } 

}


declare global {
  interface HTMLElementTagNameMap {
    'wave-api': WaveApi;
  }
}



@customElement('wave-api-method')
export class WaveApiMethod extends WaveElement {
  @property({ attribute: false }) api?: WaveApi   = undefined;

  createRenderRoot() {
    return this
  }

  connectedCallback() {
    super.connectedCallback()
    this.api = this.parentElement as WaveApi
  }

}


declare global {
  interface HTMLElementTagNameMap {
    'wave-api-method': WaveApiMethod;
  }
}
