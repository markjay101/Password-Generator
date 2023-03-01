var characters = []
let generatePasswords = document.querySelector("#generate-password")
let firstPassword = document.querySelector("#first-generated-pass")
let secondPassword = document.querySelector("#second-generated-pass")
let copyFirstPass = document.querySelector("#copy-first-pass-btn")
let copySecondPass = document.querySelector("#copy-second-pass-btn")
let textHint1 = false 
let textHint2 = false
let textHint3 = false
let interval = 0
firstPassword.disabled = true
secondPassword.disabled = true

symbolsNumsLetters()
renderHintText()
function symbolsNumsLetters(){
    for(let i = 33; i < 127; i++){
        let c = String.fromCharCode(i)
        characters.push(c)
    }
}

function randomChars(){
    let random = Math.floor(Math.random() * characters.length)
    return characters[random]
}

function CompletePass(){
    let completePassword = ""
    for(let i = 0; i < 12; i++)
        completePassword += randomChars()
    return completePassword                   
}

generatePasswords.addEventListener("click", function(){
    textHint1 = true
    textHint2 = false
    textHint3 = false
    firstPassword.value = CompletePass()
    secondPassword.value = CompletePass()
    renderHintText()
    clearInterval(interval)
    interval = 0
})

copyFirstPass.addEventListener("click", function(){
    clearInterval(interval)
    interval = 0
    if(firstPassword.value === ""){
        textHint1 = false
        textHint2 = false
        textHint3 = true
    }
    else{
        textHint1 = false
        textHint2 = true
        textHint3 = false
        renderHintText()
        interval = setInterval(()=>{
            textHint1 = true
            textHint2 = false
            textHint3 = false
            renderHintText()
        }, 2000)
        firstPassword.select();
        firstPassword.setSelectionRange(0, firstPassword.value.length); 
        navigator.clipboard.writeText(firstPassword.value);
    } 
    renderHintText()
})
copySecondPass.addEventListener("click", function(){
    clearInterval(interval)
    interval = 0
    if(secondPassword.value === ""){
        textHint1 = false
        textHint2 = false
        textHint3 = true
    }
    else{
        textHint1 = false
        textHint2 = true
        textHint3 = false
        renderHintText()
        interval = setInterval(()=>{
            textHint1 = true
            textHint2 = false
            textHint3 = false
            renderHintText()
        }, 2000)
        secondPassword.select();
        secondPassword.setSelectionRange(0, secondPassword.value.length); 
        navigator.clipboard.writeText(secondPassword.value);
    } 
    renderHintText()  
})
function renderHintText(){
    if(!textHint1 && !textHint2 && !textHint3){
        document.querySelector("#text-hint1").style.display = "none"
        document.querySelector("#text-hint2").style.display = "none"
        document.querySelector("#text-hint3").style.display = "none"
    }
    else if(textHint1 && !textHint2 && !textHint3){
        document.querySelector("#text-hint1").style.display = "block"
        document.querySelector("#text-hint2").style.display = "none"
        document.querySelector("#text-hint3").style.display = "none"
    }
    else if(!textHint1 && textHint2 && !textHint3){
        document.querySelector("#text-hint1").style.display = "none"
        document.querySelector("#text-hint2").style.display = "block"
        document.querySelector("#text-hint3").style.display = "none"
    }
    else if(!textHint1 && !textHint2 && textHint3){
        document.querySelector("#text-hint1").style.display = "none"
        document.querySelector("#text-hint2").style.display = "none"
        document.querySelector("#text-hint3").style.display = "block"
    }
}


