let cards = document.querySelectorAll('.card');
let time = document.querySelector('.details .time');
let flip = document.querySelector('.details .flips');
let refreshBtn = document.querySelector('.details button');
let disableFlip = false;
let matchCountCard = 0;
let flipCount = 0;
let timeCount = 60;
let isTimeEnd = false;
let timer = null;
let isWatch = false;

let cardOne, cardTwo;
time.innerHTML = `Time: ${timeCount}s`;
function timeChange(){
    timeCount--;
    if(timeCount < 0){
        isTimeEnd = true;
        clearInterval(timer);
        cards.forEach(card=>card.removeEventListener('click',flipCard));
    }else{
        time.innerHTML = `Time: ${timeCount < 10? '0'+timeCount: timeCount}s`;
    }
}

refreshBtn.addEventListener('click',()=>{
    timeCount = 60;
    time.innerHTML = `Time: ${timeCount}s`;
    isTimeEnd = false;
    isWatch = false;
    flipCount = 0;
    flip.innerHTML = `Flips: ${flipCount}`;
    shuffleCard();
})

function flipCard(e){
    let clickElement = e.target;
    if(clickElement !== cardOne && !disableFlip){
        if(!isTimeEnd && !isWatch){
            timer = setInterval(timeChange,1000);
            isWatch = true;
        }
        flipCount++;
        flip.innerHTML = `Flips: ${flipCount}`;
        clickElement.classList.add('flip');
        if(!cardOne){
            return cardOne = clickElement;
        }
        cardTwo = clickElement;
        disableFlip = true;
        let img1 =  cardOne.querySelector('.back-view img').src;
        let img2 =  cardTwo.querySelector('.back-view img').src;
        match(img1,img2)
    }
} 

function match(img1, img2){
    if(img1 === img2){
        matchCountCard += 2;
        setTimeout(()=>{
            if(matchCountCard === 16){
                return shuffleCard();
            }
        },1000)
        cardOne.removeEventListener('click',flipCard);
        cardTwo.removeEventListener('click',flipCard);
        cardOne = cardTwo = "";
        return disableFlip = false;
    }
    setTimeout(() => {
        cardOne.classList.add('shake');
        cardTwo.classList.add('shake');
    }, 400);
    setTimeout(() => {
        cardOne.classList.remove('shake','flip');
        cardTwo.classList.remove('shake','flip');
        cardOne = cardTwo = null;
        disableFlip = false;
    }, 1200);
}

function shuffleCard(){
    matchCountCard = 0;
    cardOne = cardTwo = null;
    let arr = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
    arr.sort((a,b)=>Math.random() > 0.5 ? a-b : b-a);
    cards.forEach((card,index)=>{
        card.querySelector('.back-view img').src = `img/img-${arr[index]}.png`;
        card.classList.add('flip');
        setTimeout(() => {
            card.classList.remove('flip');
            card.addEventListener('click',flipCard);
        }, 1500);
    })
}
shuffleCard();