let fileInput = document.getElementById("fileInput");
let downloadBtn = document.getElementById("download");
downloadBtn.addEventListener('click',()=>{
    downloadBtn.innerHTML = "Downloading...";
    downloadBtn.setAttribute("disabled","true")
    downloadBtn.style.opacity="0.7";
    fetchFile(fileInput.value);
})

const fetchFile = (url)=>{
    fetch(url).then(response=>response.blob()).then(file=>{
        let tempUrl = URL.createObjectURL(file);
        let anchorTag = document.createElement("a");
        anchorTag.href = tempUrl;
        anchorTag.download = url.replace(/^.*[\\\/]/, '');
        document.body.appendChild(anchorTag);
        anchorTag.click();
        URL.revokeObjectURL(tempUrl);
        anchorTag.remove();
        createToastMessage();
        downloadBtn.innerHTML = "Download";
        downloadBtn.setAttribute("disabled","false")
        downloadBtn.style.opacity="1";
    }).catch((e)=>{
        alert(e);
    })
}

const createToastMessage = ()=>{
    let div = document.createElement("div");
    div.innerText = "Download Success!";
    div.className = 'toast-message toast-message-slide-in';
    document.body.appendChild(div);
    setTimeout(()=>{
        div.className = 'toast-message toast-message-slide-out';

        div.addEventListener('animationend',()=>{
            div.remove();
        })
    },3000)
}