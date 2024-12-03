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

    console.log(poolSize)
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

0 -35 bits -> very weak
36 - 59 bits -> weak
60 - 119 -> strong 
120 + -> very strong
*/
const passwordStrength = (userPassword, poolSize) => {
    const bitSize = userPassword.length * Math.log2(poolSize) //bit size calcs

    const strengthText = document.getElementById('text')
    strengthText.innerText = ''
    const strengthIndicator = document.getElementById('strength-indicator')

    if (bitSize > 75) {
        strengthText.innerText = 'strong'
    } else if (bitSize > 50) {
        strengthText.innerText = 'medium'
    } else if (bitSize > 25) {
        strengthText.innerText = 'weak'
    } else if (bitSize < 25) {
        strengthText.innerText = 'too weak!'
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

    passwordGenerator()
})

// copying the password generated 
document.getElementById('copy').addEventListener('click', () => {
    // retrieving the password to be copied
    passwordDiv.innerText
    // copies the text to the clipboard
    navigator.clipboard.writeText(passwordDiv)
})