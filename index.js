let characters = []
var generatePasswords = document.querySelector("#generate-password")
var firstPassword = document.querySelector("#first-generated-pass")
var secondPassword = document.querySelector("#second-generated-pass")
var copyFirstPass = document.querySelector("#copy-first-pass-btn")
var copySecondPass = document.querySelector("#copy-second-pass-btn")
var symbolsCheckbox = document.querySelector("#exclude-symbols")
var numbersCheckbox = document.querySelector("#exclude-numbers")
var passwordLength = document.querySelector("#pass-length")
let textHint1 = false 
let textHint2 = false
let textHint3 = false
let interval = 0
firstPassword.disabled = true
secondPassword.disabled = true

//symbolsNumsLetters()
renderHintText()

function symbols(){
    for(let i = 33; i < 48; i++){
        let c = String.fromCharCode(i)
        characters.push(c)
    }
    for(let i = 58; i < 65; i++){
        let c = String.fromCharCode(i)
        characters.push(c)
    }
    for(let i = 91; i < 97; i++){
        let c = String.fromCharCode(i)
        characters.push(c)
    }
    
}

function numbers(){
    for(let i = 0; i < 10; i++)
        characters.push(i)
   
}

function letters(){
    for(let i = 65; i < 91; i++){
        let c = String.fromCharCode(i)
        characters.push(c)
    }
    for(let i = 97; i < 123; i++){
        let c = String.fromCharCode(i)
        characters.push(c)
    }
   
}

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
    if(passwordLength.value < 8)
        passwordLength.value = 8
    let completePassword = ""
    for(let i = 0; i < passwordLength.value; i++)
        completePassword += randomChars()
    return completePassword                   
}

generatePasswords.addEventListener("click", function(){
    textHint1 = true
    textHint2 = false
    textHint3 = false
    if(symbolsCheckbox.checked == true && numbersCheckbox.checked == true){
        characters = []
        letters()
    }
    else if(symbolsCheckbox.checked == true && numbersCheckbox.checked == false){
        characters = []
        numbers()
        letters()
    }
    else if(symbolsCheckbox.checked == false && numbersCheckbox.checked == true){
        characters = []
        symbols()
        letters()
    }
    else if(symbolsCheckbox.checked == false && numbersCheckbox.checked == false){
        characters = []
        symbolsNumsLetters()
    }
    firstPassword.value = CompletePass()
    secondPassword.value = CompletePass()
    renderHintText()
    clearInterval(interval)
    interval = 0
    console.log(characters)
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

symbolsCheckbox.addEventListener("click", function(){
    if(symbolsCheckbox.checked == true)
        document.querySelector("#checkbox-symbols").style.display = "none"
    else
        document.querySelector("#checkbox-symbols").style.display = "block"
})
numbersCheckbox.addEventListener("click", function(){
    if(numbersCheckbox.checked == true)
        document.querySelector("#checkbox-numbers").style.display = "none"
    else
        document.querySelector("#checkbox-numbers").style.display = "block"
})

