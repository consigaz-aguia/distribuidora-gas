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

const respostas = {
horario: "Funcionamos de segunda a sábado das 08h às 20h, e aos domingos das 08h às 14h.",
valores: "Gás: 105 retirada, 115 com entrega, Praia Grande 130. Botijão vazio: 160. Água no atacado: R$10 (acima de 5 unidades).",
localizacao: "Atendemos Humaitá, Pq Continental, Quarentenário, Rio Branco, Gleba 1 e 2 e algumas regiões próximas. Para confirmar, envie mensagem no WhatsApp!"
};


// Função para iniciar o chatbot no HTML
export function iniciarChatbot() {
const chatbot = document.getElementById('chatbot-box');
const header = document.getElementById('chat-header');
const content = document.getElementById('chat-content');
const input = document.getElementById('chat-input');


// Abre/fecha chatbot
header.onclick = () => {
chatbot.style.display = chatbot.style.display === 'block' ? 'none' : 'block';
};


// Quando o usuário aperta ENTER
input.addEventListener('keypress', (e) => {
if (e.key === 'Enter') {
const pergunta = e.target.value.toLowerCase();
let resposta = "Desculpe, não entendi. Poderia reformular?";


if (pergunta.includes('horário') || pergunta.includes('funciona') || pergunta.includes('abre')) {
resposta = respostas.horario;
}
if (pergunta.includes('preço') || pergunta.includes('valor') || pergunta.includes('gás') || pergunta.includes('agua') || pergunta.includes('água')) {
resposta = respostas.valores;
}
if (pergunta.includes('onde') || pergunta.includes('local') || pergunta.includes('região') || pergunta.includes('atende')) {
resposta = respostas.localizacao;
}


content.innerHTML += `<p><b>Você:</b> ${e.target.value}</p>`;
content.innerHTML += `<p><b>Bot:</b> ${resposta}</p>`;


content.scrollTop = content.scrollHeight;
e.target.value = '';
}
});
}
