const root = document.querySelector(':root');
const rootStyle = getComputedStyle(root);
const mainColor = rootStyle.getPropertyValue('--blur');
const labelList = document.getElementsByClassName('control-label')
const imageContainer = document.querySelector('.imageContainer')
const loadInput = document.querySelector('.btn-load--input')

let imgNumber = 1

document.addEventListener('change', event => {
    let targetName = event.target.getAttribute('name');

    if (targetName == 'upload') {
        reset()
        const file = loadInput.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            imageContainer.src = reader.result;
        }
        reader.readAsDataURL(file);
    } else {
        root.style.setProperty(`--${targetName}`,
            `${event.target.value}${event.target.dataset.sizing}`);
        event.path[1].children[1].value = event.target.value;
    }
});

document.querySelector('.btn-reset').addEventListener('click', function() {
    reset()
});

function reset() {
    for (let item of labelList) {
        let inputElement = item.children[0];
        let outputElelement = item.children[1];
        let targetName = inputElement.getAttribute('name');
        let defaultValue = targetName == 'saturate' ? 100 : 0;

        root.style.setProperty(`--${targetName}`,
            `${defaultValue}${inputElement.dataset.sizing}`);
        inputElement.value = defaultValue;
        outputElelement.value = defaultValue;
    }
}

document.querySelector(".btn-next").addEventListener('click', event => {
    reset()
    let date = new Date();
    let hours = date.getHours();

    if (imgNumber > 20) {
        imgNumber = 1
    }
    if (hours < 6) {
        changeImg('night', imgNumber)
        return
    }
    if (hours < 12) {
        changeImg('morning', imgNumber)
        return
    }
    if (hours < 18) {
        changeImg('day', imgNumber)
        return
    }
    if (hours < 24) {
        changeImg('evening', imgNumber)
        return
    }

})

function changeImg(date, number) {

    if (imgNumber < 10) {
        imageContainer.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${date}/0${number}.jpg`
    } else {
        imageContainer.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${date}/${number}.jpg`
    }
    imgNumber++


}

document.querySelector('.btn-save').addEventListener('click', event => {
    const canvas = document.querySelector('canvas');

    function drawImage() {
        const img = new Image();
        img.setAttribute('crossOrigin', 'anonymous');
        img.src = imageContainer.src
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.filter = getComputedStyle(imageContainer).filter;
            ctx.drawImage(img, 0, 0);
            var link = document.createElement('a');
            link.download = 'download.png';
            link.href = canvas.toDataURL();
            link.click();
            link.delete;
        };
    }
    drawImage();

})