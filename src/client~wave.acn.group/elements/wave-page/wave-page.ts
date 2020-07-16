import { WaveElement, customElement, property, html, WaveMetadata } from '../wave-elements';

@customElement('wave-page')
export class WavePage extends WaveElement {
  @property({ attribute: false }) page: WaveMetadata | undefined = undefined; 

  connectedCallback() {
    super.connectedCallback();
  };

  disconnectedCallback() {
    super.disconnectedCallback();
  }


  render() {// eslint-disable-line
    return html`
      <article id="page">Тыдыщь!!!</article>
    `;
  }

}


declare global {
  interface HTMLElementTagNameMap {
    'wave-page': WavePage;
  }
}