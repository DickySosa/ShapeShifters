const TABLE_NAME = 'users_data';

const createUser = (client, username, email, password) => {
    const registerQuery = {
        text: `INSERT INTO ${TABLE_NAME} (username, email, password) VALUES ($1, $2, $3)`,
        values: [username,email,password],
       };

       return client.query(registerQuery)
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
}