let typingText = document.querySelector('.typing-text p');
let inputField = document.querySelector('.input-field');
let mistakeElement = document.querySelector('.mistake span');
let timeElement = document.querySelector('.time span b');
let cpm = document.querySelector('.cpm span');
let wpm = document.querySelector('.wpm span');
let tryAgainBtn = document.querySelector('.content button');
let charIndex = mistake = 0;
let timeCount = maxTime = 60;
let timer;
let isTyping = false;

timeElement.innerHTML = timeCount;
function randomParagraph(){
    typingText.innerHTML = '';
    let randomIndex = Math.floor(Math.random() * paragraphs.length);
    paragraphs[randomIndex].split('').forEach(paragraph=>{
        let span = `<span>${paragraph}</span>`
        typingText.innerHTML += span;
    })
    let wordCount = paragraphs[randomIndex].trim().split(' ').filter(word=>word!='').length;
    typingText.querySelector('span').classList.add('active');
} 

function initTyping(){
    let typeChar = inputField.value.split('')[charIndex];
    let characters = typingText.querySelectorAll('span');
    if(charIndex < characters.length-1 && timeCount > 0){
        if(!isTyping){
            timer = setInterval(initTimer,1000);
            isTyping = true;
        }
        if(typeChar==null){
            charIndex--;
            if(characters[charIndex].classList.contains('incorrect')){
                mistake--;
            }
            characters[charIndex].classList.remove('correct','incorrect');
        }else{
            if(characters[charIndex].innerText === typeChar){
                characters[charIndex].classList.add('correct');
            }else{
                mistake++;
                characters[charIndex].classList.add('incorrect');
            }
            charIndex++;
        }
        characters.forEach(character=>character.classList.remove('active'));
        characters[charIndex].classList.add('active');
        mistakeElement.innerHTML = mistake;
        cpm.innerHTML = charIndex - mistake;
        let wpmCount = Math.round(((charIndex - mistake)/5)/(maxTime - timeCount)*60);
        wpmCount = wpmCount < 0 || !wpmCount || wpmCount == Infinity? 0: wpmCount;
        wpm.innerHTML = wpmCount;
    }else{  
        clearInterval(timer);
        inputField.value = '';
    }
}

function initTimer(){
    if(timeCount > 0){
        timeCount--;
        timeElement.innerHTML = timeCount;
    }else{
        clearInterval(timer);
    }
}

tryAgainBtn.addEventListener('click',()=>{
    randomParagraph();
    inputField.value = '';
    timeCount = 60;
    charIndex = mistake = 0;
    timeElement.innerHTML = timeCount;
    mistakeElement.innerHTML = mistake;
    clearInterval(timer);
    cpm.innerHTML = '0';
    isTyping = false;
})

randomParagraph();

document.addEventListener('keydown',()=>inputField.focus());
typingText.addEventListener('click',()=>inputField.focus());
inputField.addEventListener('input',initTyping);