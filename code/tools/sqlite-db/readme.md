# sqlite-db

sqlite-db - це абстракція над бек частиною absurd-sql

**Нащо?** Здебільшого, це синтаксичний цукор. Такий собі шаблон і пара інструментів що:

- приховує завантаження бібліотеки;
- зроблений, щоб можна було зручніше ділити реалізацію на логічні частини і розносити по окремих файлах;
- реалізує StatementStore, що дозволяє декларувати statement-и ще до завантаження бібліотеки і коли база ще не створена;
- дає можливість використовувати функції тегування:
    ```js
    let res = exec`
        SELECT * FROM mytable WHERE id=${id};
    `


## Приклад

Конкретний приклад, з файлом _'./setMyTable.js'_ штучний. Тільки щоб показати принцип.

```js
import { init, readySql, ready, db, stmtStore } from 'sqlite-db/index';
import addField from './setMyTable.js';

// db немає

const createMyTable = () => {
    db.run('CREATE TABLE mytable (id INTEGER, name TEXT)');
}

readySql(() => {
    // бібліотека завантажена
    // db немає
});
ready(() => {
    // виконується після init
    // db є
});

// декларуємо statement. 
// тут нічого насправді не створюється. store буде "чекати" поки створиться db.
// після того, як виклик init створить db, в store буде додано statement з назвою "selectById"
stmtStore.$.selectById`
    SELECT * FROM mytable WHERE id=?
`

init( /* config, */ () => {
    // якщо config-а немає, db створиться з параметрами "по-замовчуванню".
    
    // тут вже є db

    createMyTable();
    addField(1, 'name');

    // звертаємось до "selectById" напряму без "$"
    // "$" - тільки для створення
    let res = tmtStore.selectById.get([1]);
});

createMyTable(); // помилка - db ще не існує
const stmt = tmtStore.selectById; // нічого немає. statement ще не створено

```

Файл _'./setMyTable.js'_:

```js
import { ready, db, run } from 'sqlite-db/index';

// init треба викликати лише один раз
// тут він не потрібен

// db немає

ready(() => {
    // всі ready завжди виконується після init
    // db вже є
    addField(2, 'name'); // все норм
});

const addField = (id, name) => {
    // run просто обгортка поверх db.run,
    // тому, при виклику addField, db вже повинен існувати
    run`
        INSERT 
        INTO mytable (id, name) 
		VALUES (${id}, ${name})
    `;
    // або так:
    db.run(`
        INSERT 
        INTO mytable (id, name) 
		VALUES (${id}, ${name})
    `);
}

addField(); // помилка - db ще не існує

export default addField;
```

## init

_init_ треба викликати тільки один раз, але його можна "розділити" і рознести по різних файлах. Ще є декілька фіч ( наскільки вони, потрібні, не знаю, але я погрався):

```js

// декларуємо sql-запити. Вони будуть виконані зразу після створення db
init.sql`
    PRAGMA...
`
init.sql`
    CREATE...
`
// вони будуть виконуватись в порядку додавання. 
// але порядок можна вказати:
init.sql`SOME SQL...`
init.sql.last`SOME SQL...`
init.sql.first`SOME SQL...`
init.sql.priority(99)`SOME SQL...`
init.sql.priority(4)`SOME SQL...`


// декларуємо створення таблиць:
init.tables.tablename`...`;

// буде створено таблицю "mytable" якщо її не існує
init.tables.mytable`
    CREATE TABLE mytable (id INTEGER, name TEXT);
`
// порядок теж можна вказати:
init.tables.tablename.first`...`


// створення конфіга окремо:
init.config({
    pathDb: 'sql/app-db',
    pageSize: 4096
});


// init можна викликати без параметрів
init();


// можна використовувати StatementStore і через init:
init.stmt.$.insertMytable`
    INSERT 
    INTO mytable (id, name) 
    VALUES (?, ?)
`
```
Звісно, все це можна не використовувати. Я писав це "в пошуках приємнішого для використання апі". Здається, щось вишло, щось не дуже.


## Лінки

* **absurd-sql** https://github.com/jlongster/absurd-sql
* **sql.js доки**. absurd-sql - це модифікований sql.js так, щоб у нього була бекенд частина. В іншому, він не змінює апі sql.js. Тому, це актуальні доки https://sql.js.org/documentation/index.html


