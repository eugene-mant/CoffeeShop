/*
    Config файл для тестової системи іконок.
    Тут декларуємо іконки
*/

// бібліотека іконок у js файлі
import svgIcons from '~/static/images/svg/icons/svg-icons.js';
// прямі посилання на svg файли
import basketIcon from '~/static/images/svg/icons/basket-shopping-solid.svg';
import userIcon from '~/static/images/svg/icons/user-solid.svg';
import logoSvg from '~/static/images/svg/logo.svg';


export default {
    // додаємо у вигляді масиву
    list: [
        logoSvg
    ],
    // додаємо з вказанням id
    dictionary: {
        'icon-home': svgIcons.home,
        'icon-login': svgIcons.login,
        'icon-email': svgIcons.email,
        'icon-password': svgIcons.password,
        'icon-eye': svgIcons.eye,
        'icon-user': userIcon,
        'icon-basket': basketIcon
    }
}