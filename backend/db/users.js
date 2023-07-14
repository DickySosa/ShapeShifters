const TABLE_NAME = 'users_data';

const createUser = (client, createNewUser) => {
    const { username, email, password } = createNewUser
    const registerQuery = {
        text: `INSERT INTO ${TABLE_NAME} (username, email, password) VALUES ($1, $2, $3) RETURNING id`,
        values: [username, email, password],
    };

    return client.query(registerQuery)
}

const verifyUser = (client, username, password) => {
    const signInQuery = {
        text: `SELECT username, password FROM ${TABLE_NAME} WHERE username = '${username}' AND password = '${password}'`
    }
    console.log(signInQuery)
    return client.query(signInQuery)
}

module.exports = {
    createUser,
    verifyUser,
}