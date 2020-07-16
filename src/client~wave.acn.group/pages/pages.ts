import { WaveMetadata } from '../elements/wave-elements';
import { fixikiStyle, notFoundStyle } from '../styles/style';

export const fixikiPage: WaveMetadata = {
  tagName: 'main',
  className: 'fixiki melodyGrid',
  style: {
    type: 'head',
    title: 'fixikiStyle',
    value: fixikiStyle
  },
  children: [
    {
      tagName: 'div',
      className: 'attention bar',
      properties: {
        innerText: {
          type: 'string',
          value: 'внимание'
        }
      }
    },
    {
      tagName: 'img',
      properties: {
        id: {
          type: 'string',
          value: 'nolik'
        },
        src: {
          type: 'string',
          value: '/images/fixiki/nolik.png'
        },
        alt: {
          type: 'string',
          value: 'Нолик'
        },
        title: {
          type: 'string',
          value: 'Привет, я Нолик, и я могу сказать как отключить этот режим...'
        },
        say: {
          type: 'function',
          value: (text: string) => {
            let answer = String(text) + "\n\tТыдыщь !";
            if (text.toLowerCase() === "тыдыщь!") answer ='Для отключения режима обслуживания сделай под капотом `wave.fixiki = false`\n\tТыдыщь !';
            console.log(answer);
          }
        }
      }
    },
    {
      tagName: 'div',
      className: 'message bar',
      properties: {
        innerHTML: {
          type: 'string',
          value: 'на&nbsp;сайте орудуют&nbsp;<span class="secret" title="это те, кто знает, как открыть капот у сайта">фиксики</span>'
        }
      }
    }
  ]
};

export const notFoundPage: WaveMetadata = {
  tagName: 'main',
  className: 'notFound melodyGrid',
  style: {
    type: 'head',
    title: 'notFound',
    value: notFoundStyle
  },
  children: [
    {
      tagName: 'div',
      className: 'notFoundSubtitle',
      properties: {
        innerText: {
          type: 'string',
          value: 'Ой!.. Нет такой страницы...'
        }
      }
    },
    {
      tagName: 'img',
      properties: {
        id: {
          type: 'string',
          value: 'simka'
        },
        src: {
          type: 'string',
          value: '/images/fixiki/simka.png'
        },
        alt: {
          type: 'string',
          value: 'Симка'
        }
      }
    },
    {
      tagName: 'h1',
      className: 'notFoundTitle',
      properties: {
        innerHTML: {
          type: 'string',
          value: '<p>404</p>404'
        },
        onmousemove: {
          type: 'function',
          value: function(event: MouseEvent) {
            let x = event.pageX - window.innerWidth / 2;
            let y = event.pageY - window.innerHeight / 2;
            
            let rad = parseFloat(Math.atan2(y, x).toFixed(2));
            let length = Math.round(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) / 10);
            
            let x_shadow = Math.round(length * Math.cos(rad));
            let y_shadow = Math.round(length * Math.sin(rad));
            
            console.log(x_shadow);
            this.style.setProperty("--x-shadow", x_shadow + "px");
            this.style.setProperty("--y-shadow", y_shadow + "px");
          }
        },
        onload: {
          type: 'function',
          value: (event: UIEvent) => {
            console.dir(event);
            document.onmousemove = function(e: MouseEvent) {
              let x = e.pageX - window.innerWidth / 2;
              let y = e.pageY - window.innerHeight / 2;
              const title = document.querySelector('.notFoundTitle') as HTMLHeadingElement;
              if (title) {
                title.style.setProperty("--x", x + 'px');
                title.style.setProperty("--y", y + 'px');
              }
            }

          }
        }
      }
    },
    {
      tagName: 'a',
      className: 'notFoundButton',
      properties: {
        href: {
          type: 'string',
          value: '/'
        },
        innerText: {
          type: 'string',
          value: 'на главную'
        }
      }
    }  
  ]
}