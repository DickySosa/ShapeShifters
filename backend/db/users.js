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

const getAllUsers = (client) => {
    const getAllUsersQuery = {
        text : `SELECT * FROM ${TABLE_NAME}`
    }
    console.log(getAllUsersQuery)
    return client.query(getAllUsersQuery)
}

const getUserById = (client, id) => {
    const getUsersByIdQuery = {
        text : `SELECT id, username, email, password FROM ${TABLE_NAME} WHERE id = ${id}`
    }
    console.log(getUsersByIdQuery)
    return client.query(getUsersByIdQuery)
}

const updateUser = (client, id, username, email, password) => {
    const updateUserQuery = {
        text : 
        `UPDATE ${TABLE_NAME} 
        SET
        id =  ${id},
        username = ${username},
        email = ${email},
        password =  ${password}
        WHERE id = ${id}`
    }
    console.log(updateUserQuery)
    return client.query(updateUserQuery)
}

const deleteUser = (client, id) => {
    const deleteUserQuery = {
        text : `DELETE FROM ${TABLE_NAME} WHERE id = ${id}`
    }
    console.log(deleteUserQuery)
    return client.query(deleteUserQuery)
}

module.exports = {
    createUser,
    verifyUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
}