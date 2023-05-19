const actionResponseHandler = (msg, requests) => {
	const { id, ok, res } = msg;
    const req = requests[id];
    
    // від воркера прийшло неочікувана відповіді.
    // ми не знаємо як реагувати. просто ігноруємо
    if(!req) {
        return;
    }
    // ok (0 чи 1) говорить, успішно чи ні виконаний запит
    // якщо успішно, res буде містити відповідь, 
    // якщо ні - інформацію про помилку
    req[ok+0](res);
    delete requests[id];
}

export default (opts = {}) => {
    const worker = opts.worker;
    if(!worker) {
        // worker обов'язковий
        throw new Error('A worker is not defined');
    }

    let active = false;
    let requestId = 0;
    const requests = { __proto__: null };
    const type = opts.key || 'action'; 
    const message = opts.message;
    const workerError = opts.workerError;

    const messageHandler = (e) => {
        const data = e.data;
        if(data.type === type) {
            actionResponseHandler(data, requests);
        }
        else {
            if(message) message(data);
        }
    }
    const sendRequest = (type, path, args, always) => new Promise((res, rej) => {
        const id = requestId++;
        requests[id] = [rej, res];
		worker.postMessage({ type, id, path, args, always });
    });
    const setActive = (value) => {
        if(value === active) return;
        active = value;
        const key = active ? 'addEventListener' : 'removeEventListener';

        worker[key]('message', messageHandler);
        if(workerError) {
            worker[key]('error', workerError);
        }
    }
    setActive(true);

    return {
        request: (path, ...args) => sendRequest(type, path, args),
        isBackendActive: () => sendRequest(type, '$$_active', null, true),
        get active() {  
			return action; 
		},
        set active(value) { 
			setActive(value); 
		}
    }
}