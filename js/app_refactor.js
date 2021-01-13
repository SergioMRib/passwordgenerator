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
    } else if (passLength < 4) {
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

    
    passwordElem.innerHTML = password.password;
    entropyElem.innerHTML = "Entropy: " + password.entropy;
    entropyElem.className = password.strengthClass;
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

    let allCharacters = {
        lowercaseLetters: 'abcdefghijklmnopqrstuvwxyz',
        uppercaseLetters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        symbols: ',;:.-_?*)(/&%$#!@£{[]}',
        digits: '1234567890'
    };

    let password = populatePattern(pattern, allCharacters);
    let entropy = calculateEntropy(types, allCharacters, length);
    let strengthClass = passwordStrength(entropy);
    return {
        password: password, 
        entropy: entropy,
        strengthClass: strengthClass
    };
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
 * @param {object} 
 * @returns {string} password
 */
function populatePattern(pattern, charactersObject) {

    let passwordArray = pattern.map(element => {
        
        switch (element) {
            case 'l':
                return charactersObject.lowercaseLetters[Math.floor(Math.random() * charactersObject.lowercaseLetters.length)];
            case 'u':
                return charactersObject.uppercaseLetters[Math.floor(Math.random() * charactersObject.uppercaseLetters.length)];
            case 's':
                return charactersObject.symbols[Math.floor(Math.random() * charactersObject.symbols.length)];
            case 'd':
                return charactersObject.digits[Math.floor(Math.random() * charactersObject.digits.length)]; 
            } 
    })
    return passwordArray.join('');
}

// copy password to clipboard
copyButton.addEventListener('click', function() {
   
    let element = document.createElement("input")
    let password = document.getElementById("password").innerHTML;
    document.body.appendChild(element);

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

/**
 * 
 * @param {array} types  
 * @param {object} charactersObject 
 * @param {integer} length 
 */
function calculateEntropy(types, charactersObject, length) {
    let entropy, possibleCharacters = 0;

    types.forEach(element => {
        if (element === 'l') {
            possibleCharacters += charactersObject.lowercaseLetters.length;
        }
        if (element === 'u') {
            possibleCharacters += charactersObject.uppercaseLetters.length;
        }
        if (element === 's') {
            possibleCharacters += charactersObject.symbols.length;
        }
        if (element === 'd') {
            possibleCharacters += charactersObject.digits.length;
        }
    })
    entropy = Math.floor(Math.log2(Math.pow(possibleCharacters, length)));
    if (entropy > 40) {
        strenght = 'Strong password'
    } else if (entropy > 30) {
        strenght = 'Somewhat strong password'
    } else {
        strenght = 'Weak passowrd'
    }
    return entropy;
}


/**
 * 
 * @param {integer} entropy 
 * @returns {string} to add as a class to the html element
 */
function passwordStrength(entropy) {
    if (entropy < 28) {
        return "text-strength-very-weak";
    } else if (entropy >= 28 && entropy < 35) {
        console.log(entropy)
        return "text-strength-weak";
    } else if (entropy >=35 && entropy < 59) {
        return "text-strength-reasonable";
    } else if (entropy >=60 && entropy < 127) {
        return "text-strength-strong";
    } else {
        return "text-strength-very-strong";
    }
}