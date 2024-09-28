let btn = document.querySelector("#btn")
let content = document.querySelector("#content")
let voice = document.querySelector("#voice")

function speak(text){
    let text_speak = new SpeechSynthesisUtterance(text)
    text_speak.rate = 1
    text_speak.pitch = 1
    text_speak.volume = 3
    //text_speak.lang = "hi-GB"
    window.speechSynthesis.speak(text_speak)
}

function wishMe(){
    let day = new Date()
    let hours = day.getHours()
    if(hours>=0 && hours<12){
        speak("Good Morning ")
    }
    else if (hours>=12 && hours < 16){
        speak("Good Afternoon ")
    }
    else{
        speak("Good Evening ")
    }
}
window.addEventListener('load' , ()=>{
    wishMe()
})


let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition = new speechRecognition()
recognition.onresult = (event)=>{
    let currentIndex = event.resultIndex
    let transcript = event.results[currentIndex][0].transcript
    content.innerText = transcript
    takeCommand(transcript.toLowerCase())
}
btn.addEventListener("click" , ()=>{
    recognition.start()
    btn.style.display="none"
    voice.style.display="block"
})
function takeCommand(message){
    btn.style.display="flex"
    voice.style.display="none"
    if( message.includes("hello") || message.includes("hey") || message.includes("swiffy")){
        speak("hello sir , how can i help you?")
    }
    else if(message.includes("who are you") || message.includes("who created you") || message.includes("who made u") || message.includes("what is your name")){
        speak("I am Swiffy , a Virtual Assistant always ready to help u , created by Hironmoy sir ")
    }
    else if(message.includes("open youtube")){
        speak("opening youtube for u")
        window.open("https://www.youtube.com/")
    }
    else if(message.includes("open calculator")){
        speak("opening calculator for u")
        window.open("https://www.google.com/search?q=calculator&oq=calculator&gs_lcrp=EgZjaHJvbWUqCQgAECMYJxiPAjIJCAAQIxgnGI8CMgoIARAAGLEDGIAEMhIIAhAAGEMYgwEYsQMYgAQYigUyCggDEAAYsQMYgAQyCggEEAAYsQMYgAQyCggFEAAYsQMYgAQyCggGEAAYsQMYgAQyCggHEAAYsQMYgAQyCggIEAAYsQMYgAQyCggJEAAYsQMYgATSAQg4NDUxajBqNKgCALACAA&sourceid=chrome&ie=UTF-8")
    }
    else if(message.includes("open google")){
        speak("opening google for u")
        window.open("https://www.google.co.in/")
    }
    else if(message.includes("open chatgpt")){
        speak("opening chatgpt for u")
        window.open("https://openai.com/chatgpt/")
    }
    else if(message.includes("open gemini")){
        speak("opening gemini for u")
        window.open("https://gemini.google.com/")
    }
    else if(message.includes("open")){
        speak("what should i open")
    }
    else if(message.includes("time")){
        let time = new Date().toLocaleString(undefined , {hour:"numeric",minute:"numeric"})
        if(time >= 12 ){
            speak("it's" + time + "aM")
        }
        else{
            speak("it's" + time + "pM")
        }
       
    }
    else if(message.includes("date")){
        let date = new Date().toLocaleString(undefined , { day:"numeric",month:"long",year:"2-digit"})
        let weekday = new Date().toLocaleString(undefined , { weekday:"long" })
        speak("it's" + weekday + "," + date )
    }
    else{
        
        speak(`this is what i found on internet regarding ${(message.replace("sufi"," ") || message.replace("sweety" , " "))}`)
        window.open(`https://www.google.com/search?q=${(message.replace("sufi"," ") || message.replace("sweety" , " "))}`)
        //speak(" I need to work on that for now u can check out gemini or chat gpt for more support and accurate answer")
    }
    recognition.stop()
}