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
const music = document.getElementById("bgMusic");
const playBtn = document.getElementById("playBtn");
let isPlaying = false;

playBtn.addEventListener("click", function() {
    if (isPlaying) {
        music.pause();
        playBtn.innerText = "🎵 Reproducir";
        isPlaying = false;
    } else {
        music.play();
        playBtn.innerText = "⏸️ Pausar";
        isPlaying = true;
    }
});