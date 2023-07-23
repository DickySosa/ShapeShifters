const person = new Object({
    name: 'John',
    balance: 1000,

})

/*
1, create function, name kardex, rcvd 1 parametro que es un numero, function externa, use this.
2, balance === 0, se cagó,
3 return balance
*/

const kardexFnAdd = function (number){
    if(this.balance <= 0){
        console.log('mamaste')
    } else {
        this.balance = this.balance + number
    }
    return this.balance
}

person.functionKardex = kardexFnAdd;

console.log(person.functionKardex(-2000))
console.log(person.functionKardex(-500))

console.log(person.balance)
