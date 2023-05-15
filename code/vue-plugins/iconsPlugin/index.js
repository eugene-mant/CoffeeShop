/*
    створюємо дуже просту систему іконок у вигляді vue плагіна

    update: накидав код, щоб можна було було "додавати" svg по різному.
    Погане рішення. Поки, для розробки піде, але треба переписати
*/

// загальні стилі плагіна
import './styles.scss';

const isURL = (str) => {
    return (str.indexOf('/') === 0 || str.indexOf('http') === 0);
}
const fetchSVG = async (str) => {
    if(typeof str !== 'string') {
        return null;
    }
    if(!isURL(str)) {
        return str;
    }

    let res = await fetch(str);
    if(!res.ok) {
        return null;
    }
    return await res.text();
}
const createSVGElement = (str) => {
    try {
        let tmp = document.createElement('span');
        tmp.innerHTML = str;
        return tmp.children[0];
    } catch {
        return null;
    }
}


const iconsStore = {
    _svgElemId: 'app-svg-resources',
    _svgEl: null,
    _svgSymbolsEl: null,

    init() {
        // створюємо svg "контейнер"
        this._svgEl = this.getSvgContainer();
    },
    getSvgContainer() {
        let svgEl = document.getElementById(this._svgElemId);
        if(!svgEl) {
            svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svgEl.id = this._svgElemId;
            svgEl.style.display = 'none';

            this._svgSymbolsEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svgEl.appendChild(this._svgSymbolsEl);

            document.body.appendChild(svgEl);
        }
        return svgEl;
    },

    add(opts = {}) {
        if(opts.list) {
            for(let item of opts.list) {
                this.addSingle(item);
            }
        }
        if(opts.dictionary) {
            for(let key in opts.dictionary) {
                this.addSingle(opts.dictionary[key], key);
            }
        }
    },
    async addSingle(item, id) {
        let res = await fetchSVG(item);
        if(!res) {
            return false;
        }
        let el = createSVGElement(res);
        if(!el) {
            return false;
        }
    
        if(id) {
            el.id = 'svg-'+ id;
        }

        if(el.tagName === 'SYMBOL') {
            this._svgSymbolsEl.insertAdjacentHTML('beforeend', el.outerHTML);
        }
        else {
            this._svgEl.insertAdjacentElement('beforeend', el);
        }
        return true;
    }
};

export default {
    // інтерфейс плагіна. install виконується, коли викликається app.use(iconsPlugin) в index.js
    install : (app, opts = {}) => {
        iconsStore.init();
        iconsStore.add(opts.icons);

        /*
            створюємо vue директиву v-icon
            тепер будь-який* html елемент можна зробити іконкою:
                <div v-icon="'назва_іконки'" ></div>

                * крім самозакривающихся. Наприклад, <input />
        */
        app.directive('icon', (el, binding, vnode) => {
            const scopeId = vnode.scopeId || '';
            const iconId = binding.value;

            /*
            let iconAttr = '';
            if(iconstBase[iconId]) {
                iconAttr = `xlink:href="${iconstBase[iconId]}"`;
                el.innerHTML = `<svg ${scopeId}>
                    <image ${scopeId} xlink:href="${iconstBase[iconId]}" />
                </svg>`;
            }
            else {
            */
            let iconAttr = `xlink:href="#svg-icon-${iconId}"`;
            el.innerHTML = `<svg ${scopeId}>
                <use class="v-icon-${iconId}" ${scopeId} ${iconAttr} />
            </svg>`;
            //}

            el.classList.add('v-icon');
            
        });
    }
}
