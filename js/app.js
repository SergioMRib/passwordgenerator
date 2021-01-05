
let generatorElem = document.getElementById("generator"),
    passwordElem = document.getElementById("password"),
    lengthElem = document.getElementById("length"),
    lowercaseElem = document.getElementById("lowercase"),
    uppercaseElem = document.getElementById("uppercase"),
    digitsElem = document.getElementById("digits"),
    button = document.getElementById('generate-button'),
    entropyElem = document.getElementById('strength'),
    copyButton = document.getElementsByClassName('far')[0]


let possibleCharacters = '',
    lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz',
    uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    symbols = ',;:.-_?*)(/&%$#!@£{[]}',
    digits = '1234567890',
    password = '';    


/**
 * Gets the form and its data
 *
 * @param {*} form
 */
function submitData(form) {

    form.preventDefault();

    console.log('Form was submitted and function was called')
    console.log(form.target.length.value)
    console.log(form.target)
    console.log(form.target.lowercase.checked)
    //console.log(form.target.uppercase.checked)
    //console.log(form.target.digits.checked)
    //console.log(form.target.symbols.checked)
    

    // Convert length to an integer
    let passLength = parseInt(form.target.length.value, 10)

    // Alert about the length of password
    if (passLength < 0) {
        alert('Am I a joke to you?!')
        return
    } else if (passLength === 0 || passLength === NaN) {
        alert("Password must have more than 0 caracters.")
        return
    } else if (passLength < 6) {
        alert("This is considered a weak password. It should have at least 16 characters")
    }

    //Define the type of characters used
    if (form.target.lowercase.checked === false 
        && form.target.uppercase.checked === false
        && form.target.digits.checked === false
        && form.target.symbols.checked === false) {
        alert('Am I a joke to you?')
        return
    }
    if (form.target.lowercase.checked) {
        possibleCharacters += lowercaseLetters;
    }
    if (form.target.uppercase.checked) {
        possibleCharacters += uppercaseLetters;
    }
    if (form.target.digits.checked) {
        possibleCharacters += digits;
    }
    if (form.target.symbols.checked) {
        possibleCharacters += symbols;
    }

    /* console.log(form.target.length.value)
    console.log(possibleCharacters) */

    GeneratePassword(passLength, possibleCharacters);
    calculateEntropy(possibleCharacters.length, passLength);
}

function GeneratePassword(length, caracters) {

    copyButton.innerHTML = '';
    password = '';
    let letter = '';

    if (length > 50) {
        length = 50;
    }

    for (i = 0; i < length; i++) {
        letter = caracters[Math.floor(Math.random()*caracters.length)]
        password += letter
    }
    console.log("The pass is: " + password)
    passwordElem.innerHTML = password
}

copyButton.addEventListener('click', function() {
    console.log('copy was clicked')
    console.log(password);
    let element = document.createElement("input")
    document.body.appendChild(element)

    element.value = password;
    element.select()
    element.setSelectionRange(0, 99999);
    document.execCommand("copy");
    element.remove();
    copiedWarning();
})

function calculateEntropy(charSet, length) {
    let entropy, text;
    entropy = Math.log2(Math.pow(charSet, length));
    //console.log(entropy)
    if (entropy > 40) {
        text = 'Strong password'
    } else if (entropy > 30) {
        text = 'Somewhat strong password'
    } else {
        text = 'Weak passowrd'
    }
    entropyElem.innerHTML = text;
}

function copiedWarning () {
    let element = document.createElement("span")
    copyButton.innerHTML = 'copied'

}
