const passwordLength = document.getElementById('password-length');
const slider = document.getElementById('slider');

const updateSlider = () => {
    const sliderValue = slider.value;
    slider.style.background = `linear-gradient(to right, rgb(24, 23, 31) ${sliderValue}%, rgb(164, 255, 175) ${sliderValue}%)`
}

updateSlider()

slider.oninput = () => passwordLength.innerHTML = slider.value