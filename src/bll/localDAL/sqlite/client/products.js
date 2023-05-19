import db from './remoteDb';

export const getById = (id) => db.request('products/getById', id);
export default {
    getById,
    getAll: () => db.request('products/getAll'),
    request: (...args) => db.request(...args)
}