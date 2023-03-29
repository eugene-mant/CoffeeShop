/*
    Зробив спочатку ролі як масив стрінгів:
    { "roles": ["user", "editor", "admin"] }
    , але на перший погляд, з цим багато мороки, тому тіняю на такі константи: 
*/
const userRoleTypes = {
    USER: 10,
    EDITOR: 20,
    ADMIN: 30
};

export default userRoleTypes;
/* 
Роль вищого рівня, поглинає попередню і має також всі її права.
Тому, можна використати такий підхід
*/

// a масив з назвами можна буде отримати таким способом:
const getRolesNames = (roleType) => {
    let res = [];
    for(let key in userRoleTypes) {
        if(roleType >= userRoleTypes[key]) {
            res.push(key.toLowerCase());
        }
    }
    return res;
}