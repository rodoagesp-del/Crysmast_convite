// --- 1. LÓGICA DE LA CUENTA REGRESIVA ---
// Actualizado para las 7:00 PM (19:00 horas) del 24 de Diciembre de 2026
const targetDate = new Date(2026, 11, 24, 19, 0, 0).getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        document.getElementById("countdown").innerHTML = "¡Feliz Navidad! La celebración ha comenzado.";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days.toString().padStart(2, '0');
    document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// --- 2. LÓGICA DEL REPRODUCTOR DE MÚSICA ---
const music1 = document.getElementById("bgMusic1");
const music2 = document.getElementById("bgMusic2");
const playBtn = document.getElementById("playBtn");

// --- INTENTO DE REPRODUCCIÓN AUTOMÁTICA MEJORADA ---
const iniciarMusica = () => {
    if (music1.paused && music2.paused) {
        music1.play().then(() => {
            ['click', 'touchstart', 'scroll', 'mousemove', 'keydown'].forEach(evento => {
                window.removeEventListener(evento, iniciarMusica);
            });
        }).catch(error => {
            console.log("La reproducción automática requiere más interacción del navegador.");
        });
    }
};

['click', 'touchstart', 'scroll', 'mousemove', 'keydown'].forEach(evento => {
    window.addEventListener(evento, iniciarMusica, { passive: true });
});

playBtn.addEventListener("click", function() {
    if (!music2.paused) {
        music2.pause();
        music2.currentTime = 0;
        playBtn.innerText = "🎄 Reproducir Sorpresa";
        music1.play();
    } else {
        music1.pause();
        music2.play();
        playBtn.innerText = "⏹️ Detener Sorpresa";
    }
});

music2.addEventListener('ended', function() {
    playBtn.innerText = "🎄 Reproducir Sorpresa";
    music1.play();
});

// --- 3. LÓGICA DE CONFIRMACIÓN DE ASISTENCIA ---
function enviarRespuesta(estado, boton) {
    const urlParams = new URLSearchParams(window.location.search);
    const guestId = urlParams.get('guest');
    
    // Enlace real de tu plataforma de Google Apps Script
    let rsvpUrl = "https://script.google.com/macros/s/AKfycbwv1oZT__4yTpZIQM2fr7oNbK20LMYZf2uin9eKk5Lv-LVLtSMShIwOXt5ZMBeZcjfp/exec";
    
    if (guestId) {
        // Añadimos el guest y el estado (yes o no) a la URL
        rsvpUrl += "?guest=" + guestId + "&status=" + estado;
        
        // Efecto visual antes de redirigir
        boton.innerText = "Registrando...";
        boton.style.opacity = "0.7";
        
        // Redirige directamente al backend de Google Apps Script
        window.location.href = rsvpUrl;
    } else {
        alert("Falta el identificador de invitado en el enlace.");
    }
}

const btnConfirmar = document.getElementById("btnConfirmar");
const btnRechazar = document.getElementById("btnRechazar");

if (btnConfirmar) {
    btnConfirmar.addEventListener("click", function() {
        enviarRespuesta("yes", this);
    });
}

if (btnRechazar) {
    btnRechazar.addEventListener("click", function() {
        enviarRespuesta("no", this);
    });
}