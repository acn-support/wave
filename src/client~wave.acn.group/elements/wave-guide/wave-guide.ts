import { WaveElement, customElement, property, WaveApi } from '../wave-elements'
import { fixikiPage, notFoundPage } from '../../pages/pages';

export type pathname = string;
export type hash = string;
export type search = string;

@customElement('wave-guide')
export class WaveGuide extends WaveElement {
  @property({ attribute: false }) pathname: pathname = '';
  @property({ attribute: false }) hash: hash| null = null;
  @property({ attribute: false }) search: search | null = null;
  @property({ attribute: false }) searchParams: URLSearchParams | null = null;
  @property({ attribute: false }) editMode: boolean = false;
  @property({ attribute: false }) fixiki: boolean = false;
  @property({ attribute: false }) api: WaveApi | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.api = document.getElementById('api') as WaveApi;
    window.document.addEventListener('click', this.onClick.bind(this), false);
    window.addEventListener('popstate', this.onPopstate.bind(this), false);
        
    this.onPopstate();
  }

  disconnectedCallback() {
    window.document.removeEventListener('click', this.onClick);
    window.removeEventListener('popstate', this.onPopstate);
    super.disconnectedCallback();
  }

  private onClick(event: MouseEvent) {
    // игнорировать, если действие по умолчанию запрещено
    if (event.defaultPrevented) { return; }
    // игнорировать, если не основная кнопка мыши
    if (event.button !== 0) { return; }
    // игнорировать, если нажата клавиша-модификатор
    if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) { return; }

    // определение <a> элемента
    let anchor = event.target as  HTMLAnchorElement;
    const path = event.composedPath ? event.composedPath() : event.path || [];
    for (let i = 0; i < path.length; i++) {
      const target = path[i];
      if (target.nodeName && target.nodeName.toLowerCase() === 'a') {
        anchor = target ;
        break;
      }
    }
    while (anchor && anchor.nodeName.toLowerCase() !== 'a') {
      anchor = anchor.parentNode  as HTMLAnchorElement;
    }

    // игнорировать, если это не <a> элемент
    if (!anchor || anchor.nodeName.toLowerCase() !== 'a') { return; }
    // игнорировать внешние ссылки (не работает в IE11)
    if (anchor.origin !== window.location.origin) { return; }
    // игнорировать, если клик по <a> который имеет цель не по умолчанию
    if (anchor.target && anchor.target.toLowerCase() !== '_self') { return; }
    // игнорировать, если цель указывает на фрагмент текущей страницы
    if (anchor.pathname === window.location.pathname && anchor.hash !== '') { return; }
    // игнорировать <a> с атрибутом 'download'
    if (anchor.hasAttribute('download')) { return; }
    // игнорировать, если <a> с атрибутом 'router-ignore'
    if (anchor.hasAttribute('router-ignore')) { return; }

    // добавляет событие в историю
    const { pathname, search, hash } = anchor;

    if (
      window.location.pathname !== pathname ||
      window.location.search !== search ||
      window.location.hash !== hash
    ) {
      window.history.pushState(null, document.title, pathname + search + hash);
    }

    this.pathname = pathname;
    this.hash = hash;
    this.search = search;

    event.preventDefault();
  }

  private onPopstate() {
    const { pathname = '', hash = '', search = '' } = document.location;
    // console.log( `<${this.tagName}>.onPopstate() search = '${search}' hash = '${this.hash}'` );
    if (pathname.startsWith('/')) {
      this.pathname = decodeURI(pathname);
    } else {
      this.pathname = ''
    }

    if (hash.startsWith('#')) {
      this.hash = decodeURI(hash.slice(1));
    } else {
      this.hash = null;
    }

    if (search.startsWith('?')) {
      this.search = decodeURI(search);
      this.searchParams = new URLSearchParams(this.search);
      this.editMode = typeof this.searchParams.get('edit') === 'string';
    } else {
      this.search = null;
      this.searchParams = null;
      this.editMode = false
    }
  }

  createRenderRoot() {
    return this
  }

  render() {// eslint-disable-line
    const { fixiki } = this;

    if (fixiki) {
      return this.lit(fixikiPage);
    } else {
      return this.lit(notFoundPage);
    }    
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wave-guide': WaveGuide;
  }
}