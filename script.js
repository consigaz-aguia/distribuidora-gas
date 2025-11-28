let index = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(i) {
    slides.forEach((slide, idx) => {
        slide.classList.remove("active");
        dots[idx].classList.remove("active");
    });

    slides[i].classList.add("active");
    dots[i].classList.add("active");
    index = i;
}


dots.forEach((dot, i) => {
    dot.addEventListener("click", () => showSlide(i));
});


let startX = 0;

document.querySelector(".slider").addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

document.querySelector(".slider").addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) {

        index = (index + 1) % slides.length;
        showSlide(index);
    }

    if (endX - startX > 50) {

        index = (index - 1 + slides.length) % slides.length;
        showSlide(index);
    }
});
const btn = document.getElementById('voice-btn');

// Verifica se o navegador suporta SpeechRecognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if(SpeechRecognition){
    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';

    btn.addEventListener('click', () => {
        recognition.start();
        btn.textContent = '🎙️ Ouvindo... diga "Mostrar endereço"';
    });

    recognition.addEventListener('result', (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        if(transcript.includes("mostrar endereço")){
            window.open("https://www.google.com/maps/search/?api=1&query=R.+Irm%C3%A3+Maria+Rita+de+Souza+Brito+Lopes,+559+-+Conjunto+Residencial+Humait%C3%A1,+S%C3%A3o+Vicente+-+SP,+11349-330", "_blank");
        }
        btn.textContent = '🎤 Ou diga "Mostrar endereço"';
    });

    recognition.addEventListener('end', () => {
        btn.textContent = '🎤 Ou diga "Mostrar endereço"';
    });
} else {
    btn.textContent = 'Seu navegador não suporta reconhecimento de voz';
}
