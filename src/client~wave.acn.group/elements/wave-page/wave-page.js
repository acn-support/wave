import { __decorate } from "tslib";
import { WaveElement, customElement, property, html } from '../wave-elements';
let WavePage = class WavePage extends WaveElement {
    constructor() {
        super(...arguments);
        this.page = undefined;
    }
    connectedCallback() {
        super.connectedCallback();
    }
    ;
    disconnectedCallback() {
        super.disconnectedCallback();
    }
    render() {
        return html `
      <article id="page">Тыдыщь!!!</article>
    `;
    }
};
__decorate([
    property({ attribute: false })
], WavePage.prototype, "page", void 0);
WavePage = __decorate([
    customElement('wave-page')
], WavePage);
export { WavePage };
//# sourceMappingURL=wave-page.js.map