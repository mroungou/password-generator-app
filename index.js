/* getting the user's password pref */
const inputs = document.querySelectorAll('input[type="checkbox"]')
const slider = document.getElementById('slider');
const passwordDiv = document.getElementById('output') // output div for password
// password generator
// the collection of characters to be included in the password generated
const characters = {
    uppercase: {chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', size: 26},
    lowercase: {chars: 'abcdefghijklmnopqrstuvwxyz', size: 26},
    numbers: {chars: '1234567890', size: 10},
    symbols: {chars: '!@#$%^&*()_+-=[]{}|;:,.<>?', size: 32}
}

const passwordGenerator = () => {
    const passwordLength = slider.value
    let poolSize = 0
    let charactersChosen = ``
    let password = ''
    /* depending on the options selected by the user the chars to be used will be added
    for selection later */
    inputs.forEach(option => {
        if (option.checked) {
            charactersChosen += characters[option.id].chars
            poolSize += characters[option.id].size
        }
    })

    // creating the password
    /* loop runs for the duration of the length of the password that the user wants */
    for (let i = 0; i < passwordLength; i++) {
        // randomIndex creates a randomly generated index within the range of characterChosen
        randomIndex = Math.floor(Math.random() * charactersChosen.length)
        // using the randomly generated index to create the password
        password += charactersChosen[randomIndex]
    }

    passwordStrength(password, poolSize)

    passwordDiv.innerText = password
    passwordDiv.classList.add('active')
}

// determining the strength of the password
/* a password's strength is determined by the password's entropy i.e. how effective the password
is against people who try to guess it or brute force

an effective password has a high entropy meaning that it would take a long time for anyone to guess
guess the password

entropy formula: E = logbase 2 (R^L)

R = size of the the pool of unique chars the passwrod was built with
L = length of the password

E = L logbase2(R)

0 - 35 bits -> very weak
36 - 59 bits -> weak
60 - 119 -> strong 
120+ -> very strong
*/
const passwordStrength = (userPassword, poolSize) => {
    const bitSize = userPassword.length * Math.log2(poolSize) //bit size calcs

    const strengthText = document.getElementById('text')
    
    strengthText.innerText = 
        bitSize > 120 ? 'strong' :
        bitSize > 60 ? 'medium' :
        bitSize > 36 ? 'weak' : 'too weak!'

    if (bitSize > 120) {
        updateStrengthIndicator(4)
    } else if (bitSize > 60) {
        updateStrengthIndicator(3)
    } else if (bitSize > 36) {
       updateStrengthIndicator(2)
    } else {
        updateStrengthIndicator(1)
    }
}

const updateStrengthIndicator = (level = 0) => {
    const strengthIndicator = document.getElementById('strength-indicator').querySelectorAll('span')

    strengthIndicator.forEach(bar => {
        bar.classList.remove('strength-very-weak', 'strength-weak', 'strength-medium', 'strength-strong')
    })

    for (let i = 0; i < level; i++) {
        const bar = strengthIndicator[i]
       
        level === 1 ? bar.classList.add('strength-very-weak') :
        level === 2 ? bar.classList.add('strength-weak') :
        level === 3 ? bar.classList.add('strength-medium'): bar.classList.add('strength-strong')
    }
}

const updateSlider = () => {
    const sliderMin = slider.min
    const sliderMax = slider.max
    const sliderValue = slider.value;
    
    // calculating the percentage og the slider value
    const percentage = ((sliderValue - sliderMin) / (sliderMax - sliderMin)) * 100
    // updating the slider with a linear background
    slider.style.background = `linear-gradient(to right, rgb(164, 255, 175) ${percentage}%,  rgb(24, 23, 31) ${percentage}%)`
    
    // displaying the correct slider value
    document.getElementById('password-length').innerHTML = sliderValue
}

updateSlider()

document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault()

    // covering case where a user doesn't choose an option
    if([...inputs].some(input => input.checked)) {
        passwordGenerator()
    } else {
        window.alert('Please select at leasy one option')
    }
})

// copying the password generated 
document.getElementById('copy').addEventListener('click', () => {
    // retrieving the password to be copied
    passwordDiv.innerText
    // copies the text to the clipboard
    navigator.clipboard.writeText(passwordDiv)

    const copiedMessage = document.getElementById('copied-text');
    copiedMessage.style.opacity = '1';    // Make the message visible
    
    // Hide the message after 2 seconds
    setTimeout(() => {
        copiedMessage.style.opacity = '0';
    }, 2000);  // 2-second delay
})