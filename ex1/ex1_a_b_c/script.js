// ex1

// prm1.js 
// Write a function compareToTen that takes a number as an argument and returns a promise. 
// The Promise should resolve to the string 'Valid' if the number >= 10
//  and otherwise rejected with the error: 'Give me more'

function testFuncEx1() {

    compareToTen(15)
        .then(result => console.log(result))
        // Should Print: 15 is Valid
        .catch(error => console.log(error))

    compareToTen(8)
        .then(result => console.log(result))
        .catch(error => console.log(error))
    // Should Print: 8 is too small

}
function compareToTen(num) {
    if (num >= 10) {
        return Promise.resolve(`${num} is valid`)
    }
    else {
        return Promise.reject(`${num} give me more`)
    }
}


// ex2

// prm2.js 
// Write two functions: makeAllCaps,
//  sortWords that gets an array 
// and return a promise if the
// array contains anything but strings, 
// it should throw an error.


// testEx2()
function testEx2() {
    makeAllCaps(['cucumber', 'tomatos', 'avocado', 9])
        .then(sortWords)
        .then((result) => console.log(result))
        .catch(error => console.log('sorry err:', error))

    makeAllCaps(['cucumber', 'tomatos', 'avocado'])
        .then(sortWords)
        .then((result) => console.log(result))
        .catch(error => console.log('sorry err:', error))

}

function makeAllCaps(strs) {
    return new Promise((resolve, reject) => {
        const strAllCaps = strs.map(str =>
            typeof str === 'string'
                ?
                str.toUpperCase()
                :
                reject('only string')
        )
        resolve(strAllCaps)
    })
}


function sortWords(strs) {
    const sortedStrs = strs.sort((str1, str2) => str1.localeCompare(str2))
    return Promise.resolve(sortedStrs)
}

// ex3

// prm3.js
// Implement the functions fetchX, fetchY to make this code work as described
// `fetchX()` should return a promise that is resolved to 25 immediately
// `fetchY()` should return a promise that is resolved after 2 seconds to 17
// testEx3()
function testEx3() {
    add(fetchX(), fetchY(2000))
        .then(sum => {
            console.log(sum)
        })
}


function add(prmX, prmY) {
    return Promise.all([prmX, prmY])
        .then(values => {
            return values[0] + values[1]
        })
}

function fetchX() {
    return Promise.resolve(25)
}

function fetchY(t) {
    // return Promise.resolve(17)
    const prm = new Promise((resolve, reject) => {
        if (t < 0) return reject('rejected,time is negative.')
        setTimeout(() => {
            resolve(17)
        }, t)
    })
    return prm
}