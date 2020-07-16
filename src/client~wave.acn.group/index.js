import { Wave } from '/elements/wave.js';
// <wave-guide id="wave"></wave-guide>
const wave = Wave.make({
    tagName: 'wave-guide',
    properties: {
        id: {
            type: 'string',
            value: 'wave'
        },
        fixiki: {
            type: 'boolean',
            value: true
        }
    },
    dependencies: [
        { tagName: 'wave-guide', moduleSrc: '/elements/wave-guide/wave-guide.js' },
    ],
});
// <wave-api id="api"></wave-api>
const api = Wave.make({
    tagName: 'wave-api',
    properties: {
        id: {
            type: 'string',
            value: 'api'
        }
    },
    dependencies: [
        { tagName: 'wave-api', moduleSrc: '/elements/wave-api/wave-api.js' },
    ],
});
const body = document.body;
body.innerHTML = '';
body.appendChild(api);
body.appendChild(wave);
//# sourceMappingURL=index.js.map