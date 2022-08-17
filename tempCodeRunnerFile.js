// 'use Strict'
function stringGenerate(validChar, length) {
    var res = ''
    for (let index = 0; index < length; index++) {
        var res = res + validChar.charAt(Math.floor(Math.random() * (Math.floor(Math.random() * 10))))

    }
    return res
}

function str_output(queue) {
    var str = ''
    for (let index = 0; index < queue.length; index++) {
        str = str + queue[index];
    }
    return str
}
function emptyStrDict(a = {}) {
    char = ' abcdefghijklmnopqrstuvwxyz'
    // num = '0123456789'
    for (let i = 0; i < char.length; i++) {
        a[char[i]] = 0
    }
    return a
}
function isValid(key, queue) {
    if (key == queue[0]) {
        queue.substring(1)
        return true
    }
    else {
        return false
    }
}
function accuracy(key, error = {}, correct = {}) {
    if (isValid == true) {

        correct[key].update(correct[key] + 1);
        return true
    }
    else {
        if (key in error) {
            var temp = error[key]
            error[key] = temp + 1
        }
        else {
            var temp = error[key]
            error[key].update(temp + 1);
        }
    }
}


var error = emptyStrDict(error)
var correct = emptyStrDict(correct)
const a = stringGenerate('abcdef ', 50)
var validInputs = a

var inputValue = 'a'
console.log(validInputs, isValid(inputValue, validInputs))

// console.log(a)
