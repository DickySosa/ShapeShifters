const TABLE_NAME = 'users_data';

const createUser = (client, username, email, password) => {
    const registerQuery = {
        text: `INSERT INTO ${TABLE_NAME} (username, email, password) VALUES ($1, $2, $3)`,
        values: [username,email,password],
       };

       return client.query(registerQuery)
}

const verifyUser = (client, username, password) => {
    console.log(
    'verify user...............', 
    'Username: ' + username, 
    'Password : '+ password
    )
    const signInQuery = {
        text : `SELECT username, password FROM ${TABLE_NAME} WHERE username = '${username}' AND password = '${password}'`
    }
    console.log(signInQuery)
    return client.query(signInQuery)
}

const getAllUsers = () => {

}

const getUserById = () => {

}

const updateUser = () => {

}

const deleteUser = () => {

}

module.exports = {
    createUser,
    verifyUser,
}