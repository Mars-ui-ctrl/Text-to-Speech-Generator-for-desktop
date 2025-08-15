let speech = new SpeechSynthesisUtterance();

let voices = [];

let voiceOptions = document.querySelector('select');

window.speechSynthesis.onvoiceschanged = () =>{
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    voices.forEach((voice, i) => (voiceOptions.options[i] = new Option(voice.name, i)))
};

voiceOptions.addEventListener('change', () =>{
    speech.voice = voices[voiceOptions.value];
})

document.querySelector('button').addEventListener('click', () =>{
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
});