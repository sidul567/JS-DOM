let wrapper = document.getElementById("wrapper");
let fileInput = document.getElementById("file");
let form = document.getElementById("form");
let qrText = document.getElementById("qrText");
let qrRead = document.getElementById("qrRead");
let qrImg = document.getElementById("qrImg");
let copy = document.getElementById("copy");
let close = document.getElementById("close");
let div = null;

fileInput.addEventListener('change',(e)=>{
    let file = e.target.files[0];
    let formData = new FormData();
    formData.append("file",file);
    fetchQRCode(formData,file);
})

form.addEventListener('click',()=>fileInput.click());

const fetchQRCode = (formData,file)=>{
    qrText.innerHTML = "Scanning QR Code...";
    fetch("https://api.qrserver.com/v1/read-qr-code/",{
        method: "POST",
        body: formData
    }).then(result=>result.json()).then(data=>{
        wrapper.classList.add("active");
        qrRead.innerHTML = data[0].symbol[0].data;
        qrImg.src = URL.createObjectURL(file);
    })
}

copy.addEventListener('click',()=>{
    navigator.clipboard.writeText(qrRead.textContent);
    if(!div){
        createToastMessage();
    }
})

close.addEventListener('click',()=>{
    qrText.innerHTML = "Upload QR Code to Read";
    wrapper.classList.remove("active");
    fileInput.value = null;
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