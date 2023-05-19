import { init, stmtStore as s } from '@code/tools/sqlite-db/index';

init.tables.users`
    CREATE TABLE users (
        id INTEGER PRIMARY KEY, 
        username TEXT NOT NULL UNIQUE,
        password TEXT,
        role TEXT,
        firstname TEXT,
        lastname TEXT
    );
`
const toUser = (res) => !res || !res.length ? null : ({
	id: res[0], 
    username: res[1], 
    password: res[2], 
    role: res[3], 
    firstname: res[4],
    lastname: res[5]
});


s.$.insertUser`
    INSERT 
	INTO users (username, password, role, firstname, lastname) 
		VALUES (?, ?, ?, ?, ?);
`
export const add = (arr) => {
    let res = true;
    const stmt = s.insertUser;
    try {
        for(let u of arr) {
            stmt.run([u.username, u.password, u.role, u.firstname, u.lastname]);
        }
    }
    catch(e) {
        console.log('error', e);
        res = false;
    }
    finally {
        stmt.reset();
        return true;
    }
}

s.$.selectUserByNameAndPass`
    SELECT * FROM users 
        WHERE username = ? AND password = ?;
`;
export const getByUsernameAndPassword = (opts) => {
    const stmt = s.selectUserByNameAndPass;
    const res = stmt.get([opts.username, opts.password]);
    stmt.reset();
    return toUser(res);
}