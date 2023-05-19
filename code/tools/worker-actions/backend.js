const isPromise = p => p?.then && typeof p.then === 'function';

const addFuncsHorizontal = (target, obj, path, delimiter='/') => {
	/*
		копіює лінки на функції з одного об'єкта в інший без вкладень об'єктів
		створює шлях і використовує його як ключ.
		додає лише функції, ігноруючи все інше.
		
		{
			a: {
				b: {
					с: func1,
					c1: func2
				},
				b1: func3
			}
		}
		
		такий об'єкт перетвориться у:
		
		{
			'a/b/с': func1,
			'a/b/с1': func2,
			'a/b1': func3
		}
		
		
		тут немає достатньо перевірок, тому те що передається в цю
		функцію, повністю на совісті користувача
		припускається, що "obj" звичайна ієрархія об'єктів з функціями
	*/
    if(!obj) {
		return; // typeof null === 'object'
	}
    for(const key in obj) {
        const value = obj[key];
        switch(typeof value) {
            case 'function':
                target[[...path, key].join(delimiter)] = value;
                break;
            case 'object':
                addFuncsHorizontal(target, value, [...path, key], delimiter);
                break;
        }
    }
}
const replaceKeys = (target, newd, oldd) => {
    const olddRegexp = new RegExp(`${oldd}`);
    for(let key in target) {
        const newKey = key.replace(olddRegexp, newd);
        if(newKey !== key) {
            actions[newKey] = actions[key];
            delete actions[key];
        }
    }
}

// приймає дані, на основі них викликає функцію і посилає 
// її результат клієнту в якості відповіді
const actionHandler = async function(msg, actions) {
    let res, ok = false;
	const { type, id, path, args } = msg;

    try {
        const func = actions[path];
        if(func) {
            const data = args && args.length ? func(...args) : func();
            // перевіряємо, чи результат функції promise, 
            // якщо так - чекаємо на результат promise
            res = isPromise(data) ? (await data) : data;
            ok = true;
        }
        else {
            res = { msg: `Not found "${path}" action` };
        }
    }
    catch(e) {
        // щось пішло не так в процесі виконання
        // відловлюємо помилку і записуємо у відповідь
        res = { msg: e.message };
    }
    finally {
        // відправляємо
		self.postMessage({ type, id, ok, res });
    }
}

export default (opts={}) => {
    const actions = { 
		__proto__: null,
		$$_active: () => active
	};
    const pending = [];

    let delimiter = opts.delimiter || '/';
    // чи дозволити/заборонити викликати функції
    let active = 'active' in opts ? opts.active : true;
    // чи використовувати "чергу відкладеного виклику"
    let usePending = 'usePending' in opts ? opts.usePending : true;
    // ключ по якому клієнт і бек розпізнають один одного
    // вони повинні співпадати
    const type = opts.key || 'action'; 
    const message = opts.message;

    // обробник onmessage коли active == false
    // додає запити в чергу якщо usePending == true,
    // чи повертає клієнту помилку 
    const inActiveActionHandler = (data) => {
		if(data.always) {
			// виконувати завжди
            return actionHandler(data, actions);
        }
        else if(usePending) {
            return pending.push(data);
        }
		self.postMessage({ 
			type: data.type, 
			ok: false, 
			id: data.id,
			res: { msg: 'Back is disabled' }
        });
    };
    const messageHandler = (e) => {
        const data = e.data;
        if(data.type === type) {
            if(active) actionHandler(data, actions);
            else inActiveActionHandler(data);
        }
        else {
            // невідомий тип повідомлення
            // якщо ми назначили функцію message,
            // обробляємо там
            if(message) message(data);
        }
    }
    const setActions = (obj) => addFuncsHorizontal(actions, obj, [], delimiter);
    const pendingActions = () => {
		pending.forEach(data => actionHandler(data, actions));
	};
	
    self.addEventListener('message', messageHandler);
    if(opts.actions) {
        setActions(opts.actions);
    }
	
    return {
        setActions,
        getAction: (path) => actions[path],
        call: (path, ...args) => actions[path](...args),
        get active() { 
			return active;
		},
		set active(value) {
			if(active === value) return;
			active = value;
			if(active && usePending) {
				pendingActions();
			}
		},
        get delimiter() { 
			return delimiter;
		},
        set delimiter(value) {
            if(!value || delimiter === value) return;
            // переписуємо ключі якщо delimiter змінився
            replaceKeys(actions, value, delimiter);
            delimiter = value;
        }
    }
}