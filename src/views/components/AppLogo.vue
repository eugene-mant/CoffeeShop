<style lang="scss">
.app-logo {
    position: relative;
    display: block;
    width: min-content;
    height: 100%;
    z-index: 2;

    .logo-svg {
        height: 100%;
        path, polygon {
            fill: #444;
        }
    }
    .logo-svg-bg {
        position: absolute;
        top: 0;
        left: 2%;
        left: 0;
        scale: 1;
        height: 100%;
        z-index: -1;
        opacity: 0;
        transition: opacity .3s, scale .3s;
        path {
            fill: #d5d5d5;
        }
    }
    &:hover, &:focus {
        .logo-svg-bg {
            opacity: .6;
            scale: 1.1;
        }
    }

    // при фокусі (наприклад Tab з клавіатури), підсвітимо логотип кольором
    &:focus {
        .logo-svg {
            // можна розфарбувати
        }
        .logo-svg-bg {
            path {
                fill: $color-simple-blue;
            }
        }
    }
}
</style>

<script>
// Трохи побавимось з логотипом.
import { h, resolveComponent } from 'vue';
import { logoSvg, logoSvgBg } from '~/static/images/svg/app-logo.js';

// Використовуємо функціональний компонент
// https://ua.vuejs.org/guide/extras/render-function.html
// https://v3-migration.vuejs.org/breaking-changes/render-function-api.html
export default (props) => {
    let type = 'div';
    const resProps = {
        class: 'app-logo',
        innerHTML: logoSvg
    };

    // логотип з лінком
    if(props.link) {
        type = resolveComponent('router-link');
        resProps.to = props.link;
        resProps.innerHTML += logoSvgBg;
    }

    return h(type, resProps);
}
</script>