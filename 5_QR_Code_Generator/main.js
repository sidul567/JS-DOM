let generateBtn = document.querySelector('button');
let text = document.querySelector('input');
let wrapper = document.querySelector('.wrapper');
let qrImg = document.querySelector('.qr-code img');
let downlaodBtn = document.querySelector('.qr-code button');

generateBtn.addEventListener('click',()=>{
    if(!text.value) return;
    generateBtn.innerHTML = 'Generating QR Code...';
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?data=${text.value}&size=170x170`;
    qrImg.addEventListener('load',()=>{
        wrapper.classList.add('active');
    })
})

text.addEventListener('keyup',()=>{
    if(!text.value){
        wrapper.classList.remove('active');
    }
})

downlaodBtn.addEventListener('click',()=>{
    fetch(`https://api.qrserver.com/v1/create-qr-code/?data=${text.value}&size=170x170`).then(result=>result.blob()).then(data=>{
        let a = document.createElement('a');
        let objectUrl = URL.createObjectURL(data);
        a.href = objectUrl;
        a.download = "QR-Code.png";
        a.click();
        URL.revokeObjectURL(temp);
        a.remove();
    })
})