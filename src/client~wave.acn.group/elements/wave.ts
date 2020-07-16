export interface WaveMetadata {
  name?: string;
  description?: string;
  tagName: string;
  moduleSrc?: string;
  dependencies?: WaveDependency[] | [];
  className?: string;
  properties?: { [propertyName: string]: WaveProperty };
  attributes?: { [attributeName: string]: WaveAttribute };
  children?: WaveMetadata[] | [];
  style?: WaveStyle

  // slots: WaveSlotType[] | undefined;
  // events: WaveEventType[] | undefined;
  // cssProperties: WaveCSSPropertyType[] | undefined;
}
type styleType = 'css' | 'head' | 'CSSStyleDeclaration';

export interface WaveStyle {
  type: styleType;
  value: string | CSSStyleDeclaration;
  title?: string
}

export interface WaveDependency {
  tagName: string;
  moduleSrc: string;
}

export interface WaveAttribute {
  // name: string;
  type: string;
  description?: string;
  value?: string | boolean;
}

export interface WaveProperty {
  // name: string;
  type: string;
  description?: string;
  value?: any;
}

export interface IWave {
  create(metadata: WaveMetadata): Promise<HTMLElement>;
  make(metadata: WaveMetadata): HTMLElement;
  applyMetadata(element: HTMLElement, metadata: WaveMetadata): HTMLElement;
}

const customElementsRE = new RegExp('\w*-\w*');

export class Wave {

  static make(metadata: WaveMetadata): HTMLElement {
    const { tagName = 'div' } = metadata || {};
    let element;
    
    if (customElementsRE.test(tagName)) {
      let elementClass = customElements.get(tagName);

      if (elementClass === undefined) {
        Wave.create(metadata).then( element => element).catch( () => {
          element = document.createElement('div');
          return Wave.applyMetadata(element, metadata)
        })
      } 
    }

    element = document.createElement(tagName);
    return Wave.applyMetadata(element, metadata);
  }

  static async create(metadata: WaveMetadata): Promise<HTMLElement> {
    const { tagName = 'div', moduleSrc = '', dependencies = [] } = metadata || {};

    if (customElementsRE.test(tagName)) {
      let elementClass = customElements.get(tagName);
      if (elementClass === undefined) {
        const components = [{ tagName, moduleSrc }, ...dependencies];
        try {
          // ожидание импорта элементов
          await Promise.all(components.map(c => {
            if (c.moduleSrc) import(c.moduleSrc)
          }));
          // ожидание регистрации элементов
          await Promise.all(
            components.map(c => customElements.whenDefined(c.tagName))
          );
          elementClass = customElements.get(tagName);
          if (elementClass === undefined)
            console.error(`<Wave.load> Not found constructor for <${tagName}>`);
        } catch (error) {
          console.error(
            `Ошибка импорта элемента <${tagName}> из ${moduleSrc}\n`,
            error
          );
        }
      }
    }
    const element = document.createElement(tagName);
    return Wave.applyMetadata(element, metadata);
  }

  static applyMetadata(element: HTMLElement, metadata: WaveMetadata ): HTMLElement {
    if (element instanceof HTMLElement) {
      const { attributes = {}, properties = {}, className = '', children = [], style } = metadata;

      Object.keys(attributes).forEach(( name:string ) => {
        if (typeof name !== 'string') { return };
        const { type, value } = attributes[name];
        (type !== 'boolean')
          ? element.setAttribute(name, String(value) )
          : value ? element.setAttribute(name, '') : element.removeAttribute(name)
      });

      Object.keys(properties).forEach(( name:string ) => {
        if (typeof name !== 'string') { return };
        const { value } = properties[name];

        if (name === 'dataset') {
          Object.keys(value).forEach( dataAttr => {
            element.dataset[dataAttr] = value[dataAttr]
          })
          
        } else {
          element[name] = value;
        }
      });

      if (typeof className === 'string' && className.trim()  !== '' ) element.className = className.trim();

      if (style) {
        const { type, value, title } = style;
        if (value && typeof type === 'string') {
          switch (type) {
            case 'head':
              if (typeof value === 'string' && value.trim() !== '' && typeof title === 'string' && title.trim() !== '') {
                let styleElement = document.head.querySelector(`#${title}`)
                document.getElementById(title) as HTMLStyleElement;
                if (!styleElement) {
                  document.head.appendChild( Wave.make({
                    tagName: 'style',
                    properties: {
                      id: {
                        type: 'string',
                        value: title
                      },
                    }
                  }));

                  styleElement = document.getElementById(title) as HTMLStyleElement;
                }

                styleElement.textContent = value.toString();
              }
              break;
            case 'css':
              if (typeof value === 'string' && value.trim() !== '' ) {
                element.style.cssText = value
              };
              break;
            case 'CSSStyleDeclaration':
              if (typeof value === 'object') {
                for (let [rule, css] of Object.entries(value)) {
                  if (typeof css === 'string' && css.trim() !== '') element.style[rule] = css;
                }
              }
              break;
          }
        }
      }

      if (children.length > 0) {
        children.forEach( childMetadata => {
          const child = Wave.make(childMetadata);
          element.appendChild(child)
        })
      }

      return element
    } else {
      return element
    }
  }
}
