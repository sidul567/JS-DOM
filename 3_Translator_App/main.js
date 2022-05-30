let selectTag = document.querySelectorAll("select");
let translateBtn = document.getElementById("translateBtn");
let from = document.getElementById("from-text");
let to = document.getElementById("to-text");
let exchange = document.getElementById("exchange");
let fcopy = document.getElementById("fcopy");
let tcopy = document.getElementById("tcopy");
let fspeak = document.getElementById("fspeak");
let tspeak = document.getElementById("tspeak");
let div = null;

selectTag.forEach((tag,index)=>{
    for(let country_code in countries){
        let select;
        if((index==0 && country_code=="en-US") || (index==1 && country_code=="bn-IN")){
            select = "selected";
        }
        let option = `<option value=${country_code} ${select}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML('beforeend',option);
    }
})

translateBtn.addEventListener('click',()=>{
    to.value = 'Translating...';
    let text =from.value;
    let translateFrom = selectTag[0].value;
    let translateTo = selectTag[1].value;
    let api = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(api).then(result=>result.json()).then(data=>{
        to.value = data.responseData.translatedText;
    })
})

exchange.addEventListener('click',()=>{
    let text = from.value;
    from.value = to.value;
    to.value = text;
    let lang = selectTag[0].value;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = lang;
})

fcopy.addEventListener('click',()=>{
    navigator.clipboard.writeText(from.value);
    if(!div){
        createToastMessage();
    }
})

tcopy.addEventListener('click',()=>{
    navigator.clipboard.writeText(to.value);
    if(!div){
        createToastMessage();
    }
})

fspeak.addEventListener('click',()=>{
    let utterance = new SpeechSynthesisUtterance(from.value);
    utterance.lang = selectTag[0].value;
    speechSynthesis.speak(utterance);
    console.log(window.speechSynthesis.getVoices());
})

tspeak.addEventListener('click',()=>{
    let utterance = new SpeechSynthesisUtterance(to.value);
    utterance.lang = selectTag[1].value;
    speechSynthesis.speak(utterance);
})

const createToastMessage = ()=>{
    div = document.createElement("div");
    div.innerText = "Text Copied!";
    div.className = 'toast-message toast-message-slide-in';
    document.body.appendChild(div);
    setTimeout(()=>{
        div.className = 'toast-message toast-message-slide-out';
        div.addEventListener('animationend',()=>{
            div.remove();
            div = null;
        })
    },3000)
}