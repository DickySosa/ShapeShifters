const TABLE_NAME = 'users_data';

const createUserFromAdmin = (client, username, email, password) => {
    const {username, email, password} = createNewUser
    const registerQuery = {
        text: `INSERT INTO ${TABLE_NAME} (username, email, password) VALUES ($1, $2, $3)`,
        values: [username,email,password],
       };

       return client.query(registerQuery)
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



const updateUser = (client, existingUser) => {
    const  {id, username, email, password} = existingUser
    const updateUserQuery = {
        text : 
        `UPDATE ${TABLE_NAME} 
        SET
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

module.exports ={
    createUserFromAdmin,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
}