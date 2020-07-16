import { __decorate } from "tslib";
import { WaveElement, customElement, property } from '../wave-elements';
let WaveApi = class WaveApi extends WaveElement {
    constructor() {
        super(...arguments);
        this.schema = 'http';
        this.host = '127.0.0.1';
        this.port = '8008';
        this.basePath = 'api';
    }
    createRenderRoot() {
        return this;
    }
    async post(data) {
    }
    async get(data) {
    }
    invoke(method, args = {}) {
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
            }).then(res => {
                console.log(res);
                const { status } = res;
                if (status === 200)
                    resolve(res.json());
                else {
                    reject(new Error(`Status Code: ${status}`));
                }
                ;
            });
        });
    }
};
__decorate([
    property({ attribute: false })
], WaveApi.prototype, "schema", void 0);
__decorate([
    property({ attribute: false })
], WaveApi.prototype, "host", void 0);
__decorate([
    property({ attribute: false })
], WaveApi.prototype, "port", void 0);
__decorate([
    property({ attribute: false })
], WaveApi.prototype, "basePath", void 0);
WaveApi = __decorate([
    customElement('wave-api')
], WaveApi);
export { WaveApi };
let WaveApiMethod = class WaveApiMethod extends WaveElement {
    constructor() {
        super(...arguments);
        this.api = undefined;
    }
    createRenderRoot() {
        return this;
    }
    connectedCallback() {
        super.connectedCallback();
        this.api = this.parentElement;
    }
};
__decorate([
    property({ attribute: false })
], WaveApiMethod.prototype, "api", void 0);
WaveApiMethod = __decorate([
    customElement('wave-api-method')
], WaveApiMethod);
export { WaveApiMethod };
//# sourceMappingURL=wave-api.js.map