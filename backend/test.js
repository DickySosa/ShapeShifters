/* Manipulate, where, how are they write */

//understand how to access to prototype of datatype array
//Purple: built-in functions of objects
//Blue: Object properties

// Create own function that replicates the logic of map()

const arrayExam = [1, 2, 3, 4, 5, 6, 7];


// const mapeado = arrayExam.map( (value) => {
//     return value * value
// }
// )
// console.log(mapeado)

/*change here*/
Array.prototype.dickMap = function (callback) {
    for (let i = 0; i < this.length; i++) {
        const result = this[i] + this[i]
        return result
    }
    callback(result);
};
console.log(dickMap())

// execute here 
arrayExam.dickMap((number) => {
    number = 5;
    console.log(number);
});


console.log('Hola');

// function prueba2 (){
//     for (let i = 0; i < arrayExam.length; i++) {
//         console.log(arrayExam[i] * arrayExam[i]);
//     }
// }


// function prueba () {
//     prueba2()
// }
// prueba()