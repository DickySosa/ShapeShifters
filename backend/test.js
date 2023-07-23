/* Manipulate, where, how are they write */

//understand how to access to prototype of datatype array
//Purple: built-in functions of objects
//Blue: Object properties

// Create own function that replicates the logic of map()

// const arrayExam = [1, 2, 3, 4, 5, 6, 7];

/*change here*/
// Array.prototype.dickMap = function (callback) {
//     const newArray = []
//     for (let i = 0; i < this.length; i++) {
//         const newValue = callback(this[i]);
//         newArray.push(newValue)
//     }
//     return newArray;
// };


// // execute here 
// const myHof = arrayExam.dickMap((number) => {
//     return number + number
// });

// console.log(myHof)

/*MAke my own filter*/
//recibe call back
//call bac se ejecuta en cada iteracion
//hacer un array
//retornar un array
//recibir condicinales 
// escribir una condicional para ver si se cumple la condición

const words = ["apple", "banana", "orange", "grapes", "kiwi"];


Array.prototype.dicter = function (callback) {
    const filtedArray = []
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i])) {
            const filtedValue = this[i]
            filtedArray.push(filtedValue)
        }
    }
    return filtedArray
}

const arrayTry = words.dicter((word) => {
    return word.length > 5
})
console.log(arrayTry)

/*un includes masivo*/

/*Make my own reduce */
//recibe call back
//call bac se ejecuta en cada iteracion
//hacer dos variables, una para el valor anterior y una para el actual
//retornar un array
//

const arrayExam = [1, 2, 3, 4, 5, 6, 7];

Array.prototype.dickDuce = function (callback) {
    const totalSum = 0;
    for (let i = 0; i < this.length; i++) {

    }
    return totalSum
}


/*
const reduceExample = arrayExam.reduce((previous,actual)=> {
return previous + actual
},0)

console.log('try reduce ---->',  reduceExample)
*/

const submit = async () => {
    /*some code*/
    try {
        const promise = await feth('HTTP', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objectWeWantToSend)
        })
        const promiseJson = promise.json()
        if (promiseJson[0].rows) {
            console.log('users created')
            navigate('/home')
        } else {
            return
        }

    } catch (error) {
        console.log(error)
    }
}



const thenPromise = fetch('someUrl',)
//response.json()
thenPromise

.then((response) => {
    if(!response.ok){
        throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json()
})

.then((data) => { 
    console.log(data[0].name)
})

.catch((error) =>{
    console.error(`Could not get products: ${error}`);
})

thenPromise.then((response) => {
    const jsonResponse = response.json()
    jsonResponse.then((data) => {
        console.log(data[0].name)
    })
    .catch((error) =>[
        console.log('Some error happened', error)
    ])
})

