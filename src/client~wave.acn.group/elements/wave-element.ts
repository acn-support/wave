import { LitElement, customElement, TemplateResult, html } from 'lit-element/lit-element';
import { Wave, WaveMetadata } from './wave';

export interface WaveElement extends LitElement {
  new (metadata?: WaveMetadata):WaveElement;
  s$(id: string): Element | null;
  s$$(selector: string): NodeListOf<Element> | null;
}

@customElement( 'wave-element' )
export class WaveElement extends LitElement {

  constructor(metadata?: WaveMetadata) {
    super();
    if (metadata) Wave.applyMetadata(this, metadata);
    // console.log(`WaveElement.constructor(metadata) for \n`, metadata)
  }

  connectedCallback() {
    super.connectedCallback();
    console.info(` + <${this.tagName.toLowerCase()}> connected`);
  }

  disconnectedCallback() {
    console.info(` - <${this.tagName.toLowerCase()}> disconnected`);
    super.disconnectedCallback();
  }

  s$( id:string ): Element | null {
    if (typeof id !== 'string') return null;
    return this.shadowRoot ? this.shadowRoot.getElementById(id) : null
  }

  s$$(selector: string): NodeListOf<Element> | null {
    if (typeof selector !== 'string') return null;
    return this.shadowRoot ? this.shadowRoot.querySelectorAll(selector) : null
  }
  
  async create(metadata: WaveMetadata): Promise<HTMLElement> {
    return Wave.create(metadata)
  }

  make(metadata: WaveMetadata): HTMLElement {
    return Wave.make(metadata)
  }

  lit(metadata: WaveMetadata): TemplateResult {
    return html`${this.make(metadata)}`
  } 

}

declare global {
  interface HTMLElementTagNameMap {
    'wave-element': WaveElement;
  }
}
