/*
    створюємо дуже просту систему іконок у вигляді vue плагіна
*/

// загальны стилі плагіна
import './styles.scss';
import svgIcons from './svg-icons.js';

let svgCode = `
    <style>
    /*
        тут можна визначити детальні стилі для svg іконок
    */
    </style>
`;
for(let iconKey in svgIcons) {
    svgCode += svgIcons[iconKey];
}


const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svgEl.style.display = 'none';
svgEl.innerHTML = svgCode;

document.body.appendChild(svgEl);

export default {
    // інтерфейс плагіна. install виконується, коли викликається app.use(iconsPlugin) в index.js
    install : (app, opts = {}) => {
        /*
            створюємо vue директиву v-icon
            тепер будь-який* html елемент можна зробити іконкою:
                <div v-icon="'назва_іконки'" ></div>

                * крім самозакривающихся <input />
        */
        app.directive('icon', (el, binding, vnode) => {
            const scopeId = vnode.scopeId || '';
            const iconId = binding.value;
            el.classList.add('v-icon');
            el.innerHTML = `<svg ${scopeId}>
                <use class="v-icon-${iconId}" ${scopeId} xlink:href="#icon-${iconId}" /></svg>`;
        });
    }
}
