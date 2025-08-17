let speech = new SpeechSynthesisUtterance();

let voices = [];

let voiceOptions = document.querySelector('select');
let micButton = document.querySelector('.speak-btn')
const startSound = document.querySelector('.play-sound');
const pauseSound = document.querySelector('.stop-sound');
// const listenSound = document.querySelector('.listen-sound');

// Preload audio files
startSound.load();
pauseSound.load();

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    voices.forEach((voice, i) => (voiceOptions.options[i] = new Option(voice.name, i)))
};

voiceOptions.addEventListener('change', () => {
    speech.voice = voices[voiceOptions.value];
})

const listenBtn = document.querySelector('.listen-btn');
   listenBtn.addEventListener('click', () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
    listenBtn.style.boxShadow ="0 0 10px 10px rgba(255,255,255,.5)";
    listenBtn.style.transition = ".3s ease";

    setTimeout(() => {
       listenBtn.style.boxShadow ="";
    }, 1000);
    
});


let recognition;

if ('SpeechRecognition' in window) {
    recognition = new SpeechRecognition();
} else if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
} else {
    recognition = null;
    alert("SpeechRecognition not supported in this browser.");
}

let isListening = false;

if (recognition) {
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-us';

    recognition.onresult = (e) => {
        let transcript = e.results[0][0].transcript;
        document.querySelector('.textarea').value = transcript;
    };
    recognition.onerror = (err) => {
        console.error("Recognition error:", err);
    };
    recognition.onstart = () => {
        // This fires when recognition starts
        isListening = true;
    };
    recognition.onend = () => {
        // This fires when recognition automatically stops
        if (isListening) {
            isListening = false;
            micButton.style.boxShadow = "";
            startSound.pause();
            startSound.currentTime = 0;
            pauseSound.currentTime = 0;
            pauseSound.play();
        }
    };
    micButton.addEventListener('click', () => {
        if (!isListening) {
            startSound.currentTime = 0;
            startSound.play();
            recognition.start();
            micButton.setAttribute('style', 'box-shadow: 0 0 10px 10px rgba(255,255,255,.5)');
            micButton.style.transition = '.3s ease';
        }
        else {
            recognition.stop();
            // pauseSound.currentTime = 0;
            // pauseSound.play();
            startSound.pause();
            startSound.currentTime = 0;
        }
    });

}
else {
    alert("SpeechRecognition not supported in this browser.");
}






