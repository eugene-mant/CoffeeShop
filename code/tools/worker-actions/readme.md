# worker-actions

Комунікація з воркером проходить через подію message.

Щоб відправити щось в воркер:
```js
worker.postMessage(someDataToWorker);
```

Отримати з воркера:
```js
worker.onmessage = (e) => {
    const someDataFromWorker = e.data;
}
```

Писати так занадто незручно. Чим більший буде ставати код, тим тяжче його 
буде підтримувати. Тому, зазвичай, пишуть абстракцію (або використовують готову), 
що приховує події і дає більш зручний інтерфейс.

**Це така простенька абстракція.**

Приклад використання - в воркері реєструються функції:
```js
const actionStore = createActionsStore({
    actions: {
        msg: {
            sayHello: () => 'hello!'
        },
        getData: async (...args) => {
            const data = await fetch(...args).then(resp => resp.json());
            return doSomethingWithData(data);
        }
    }
});
```
В основному потоці:
```js
const remote = createActionsBackend({ worker });
//...
let msg = await remote.request('msg/sayHello');
console.log(msg); // hello!
//...
let data = await remote.request('getData', '/my-path-of-fetch', { /* request options */ });
```

Так ми можемо "викликати віддалені функції", передавати в них значення і отримувати результат.
Звісно, вони завжди будуть асинхронні.

З таким підходом можна не морочитись з подіями, можна легко масштабувати, просто додавши ще функцій.
На клієнті, взагалі можна приховати _remote.request_ під функцією:
```js
const getData = (...args) => remote.request('getData', ...args);
// ...
let data = await getData('/my-path-of-fetch');
```

Це основне. Скрипт ще має пару додаткових функції - не так важливо.
Викликати функції клієнта з воркера не можна, але нічого не мішає це реалізувати.

В коді є коментарі з більш детальним описом.