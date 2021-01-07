let generatorElem = document.getElementById("generator"),
    passwordElem = document.getElementById("password"),
    button = document.getElementById('generate-button'),
    entropyElem = document.getElementById('strength'),
    copyButton = document.getElementsByClassName('far')[0]

    
function submitData(form) {

    form.preventDefault();

    // remove text if there is any
    copyButton.innerHTML = '';

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
        return
    }

    //Define the type of characters used
    let use = {
        lowercase: form.target.lowercase.checked,
        uppercase: form.target.uppercase.checked,
        symbols: form.target.symbols.checked,
        digits: form.target.digits.checked
    };

    if (use.lowercase === false 
        && use.uppercase === false
        && use.symbols === false
        && use.digits === false) {
        alert('Am I a joke to you?')
        return
    }
    
    let charTypes = [];
    
    if (use.lowercase) {
        charTypes.push('l')
    }
    if (use.uppercase) {
        charTypes.push('u')
    }
    if (use.symbols) {
        charTypes.push('s')
    }
    if (use.digits) {
        charTypes.push('d')
    }

    let password = generatePassword(passLength, charTypes);
    //calculateEntropy(possibleCharacters.length, passLength);

    passwordElem.innerHTML = password;
}

/**
 * 
 * @param {integer} length The length of the password
 * @param {array} types Types of characters to use for password creation
 */
function generatePassword(length, types) {

    // creating array with required length
    let pattern = [];
    for (let i = 0; i < length; i++) {
        pattern.push('');
    }

    // creating pattern with provided types
    do {
        pattern = createPattern(pattern, types);
    }
    while (!checkPattern(pattern, types));
    
    // creating the password
    let password = createPassword(pattern);

    return password;
}

/**
 * Creates a pattern based on the types selected
 * @param {array} pattern 
 * @param {*} types 
 */
function createPattern(pattern, types) {
    pattern = pattern.map(element => { 
        return element = types[Math.floor(Math.random() * types.length)]; 
    });
    return pattern;
}

/**
 * check if supplied pattern has all required types
 * @param {array} pattern 
 * @param {array} types 
 * @returns {boolean} true if all types are included; 
 */
function checkPattern(pattern, types) {
    let checks = true;
    types.forEach(element => {
        if (!pattern.includes(element)) {
            checks = false;
        }
    })
    return checks;
}


/**
 * creates a password based on the provided pattern by substituting the type for a random character
 * @param {array} pattern This pattern must be an array composed of strings of the 4 types: 
 *      l for lowercase, 
 *      u for uppercase, 
 *      d for digits,
 *      s for symbols
 * @returns {string} password
 */
function createPassword(pattern) {

    let lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz',
        uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        symbols = ',;:.-_?*)(/&%$#!@£{[]}',
        digits = '1234567890';

    let passwordArray = pattern.map(element => {
        
        switch (element) {
            case 'l':
                return lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)];
            case 'u':
                return uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)];
            case 's':
                return symbols[Math.floor(Math.random() * symbols.length)];
            case 'd':
                return digits[Math.floor(Math.random() * digits.length)]; 
            } 
    })
    return passwordArray.join('');
}

// copy password to clipboard
copyButton.addEventListener('click', function() {
   
    let element = document.createElement("input")
    document.body.appendChild(element)

    element.value = password;
    element.select()
    element.setSelectionRange(0, 99999);
    document.execCommand("copy");
    element.remove();
    showCopiedWarning();
})

function showCopiedWarning () {
    let element = document.createElement("span")
    copyButton.innerHTML = 'copied'
}