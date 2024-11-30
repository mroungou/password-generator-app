const slider = document.getElementById('slider');

document.getElementById('copy').addEventListener('click', () => {
    // the div with the password generated
    const password = document.getElementById('output')
    

})

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