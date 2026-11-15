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
// Función para iniciar la música con cualquier interacción
const iniciarMusica = () => {
    if (music1.paused && music2.paused) {
        music1.play().then(() => {
            // Si la reproducción tiene éxito, eliminamos los listeners para que no se repita la orden
            ['click', 'touchstart', 'scroll', 'mousemove', 'keydown'].forEach(evento => {
                window.removeEventListener(evento, iniciarMusica);
            });
        }).catch(error => {
            console.log("La reproducción automática requiere más interacción del navegador.");
        });
    }
};

// Asignamos la función a múltiples eventos de usuario (toque, scroll, movimiento, clic, teclado)
['click', 'touchstart', 'scroll', 'mousemove', 'keydown'].forEach(evento => {
    window.addEventListener(evento, iniciarMusica, { passive: true });
});

playBtn.addEventListener("click", function() {
    // Si la música 2 está sonando y presionan el botón de nuevo, la detenemos
    if (!music2.paused) {
        music2.pause();
        music2.currentTime = 0; // Reiniciamos la canción 2
        playBtn.innerText = "🎄 Reproducir Sorpresa";
        music1.play(); // Volvemos a la música de fondo
    } else {
        // Pausamos la música de fondo (Musica1)
        music1.pause();
        
        // Reproducimos la música especial (Musica2)
        music2.play();
        playBtn.innerText = "⏹️ Detener Sorpresa";
    }
});

// Cuando la música especial (Musica2) termine, vuelve a empezar la música de fondo (Musica1)
music2.addEventListener('ended', function() {
    playBtn.innerText = "🎄 Reproducir Sorpresa";
    music1.play();
});

// --- 3. LÓGICA DE CONFIRMACIÓN DE ASISTENCIA ---
const btnConfirmar = document.getElementById("btnConfirmar");

if (btnConfirmar) {
    btnConfirmar.addEventListener("click", function() {
        // Obtenemos el identificador del invitado desde la URL actual de la tarjeta (si existe)
        const urlParams = new URLSearchParams(window.location.search);
        const guestId = urlParams.get('guest');
        
        // Enlace real de tu plataforma de Google Apps Script
        let rsvpUrl = "https://script.google.com/macros/s/AKfycbxuSZ4cdlzi6Daic2hsc3Wz-XIlyCuYnB--Vb5KpMJMa6PUS22EUz-Ymu34kjKoakJt/exec";
        
        // Si hay un ID de invitado, se lo pasamos a la plataforma de confirmación
        if (guestId) {
            rsvpUrl += "?guest=" + guestId;
        }
        
        // Efecto visual antes de redirigir
        btnConfirmar.innerText = "Redirigiendo...";
        btnConfirmar.style.backgroundColor = "var(--green-xmas)";
        
        // Redirige directamente al backend de Google Apps Script
        window.location.href = rsvpUrl;
    });
}