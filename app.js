// Quotes arrays
const motivationalQuotes = [
    {text: "Keep swimming! The current won't carry you forever!", author: "Salmon Rushfin"},
    {text: "You're o-fish-ally awesome!", author: "Marlin Monroe"},
    {text: "Don't be koi – make waves!", author: "Gillbert Grape"}
];

const demotivationalQuotes = [
    {text: "Why bother? The net always wins...", author: "Red Herring"},
    {text: "You're just a small fish in a big pond...", author: "Red Herring"},
    {text: "Tomorrow's just another day to be bait...", author: "Red Herring"}
];

// PWA Installation
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('installButton').style.display = 'block';
});

document.getElementById('installButton').addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            document.getElementById('installButton').style.display = 'none';
        }
    }
});

window.addEventListener('load', () => {
    const now = new Date();
    const isDaytime = now.getHours() >= 6 && now.getHours() < 18;
    if (!isDaytime) {
        document.querySelector('#carp').src='red-herring.png';
    }
});

// Fish Click Handler
document.getElementById('carp').addEventListener('click', () => {
    const speechBubble = document.getElementById('speechBubble');
    const now = new Date();
    const isDaytime = now.getHours() >= 6 && now.getHours() < 18;
    
    const quotes = isDaytime ? motivationalQuotes : demotivationalQuotes;
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    speechBubble.innerHTML = `"${randomQuote.text}"<br><em>- ${randomQuote.author}</em>`;
    speechBubble.style.display = 'block';
    
    // Position bubble above fish
    const fishRect = document.getElementById('carp').getBoundingClientRect();
    speechBubble.style.left = `${fishRect.left + fishRect.width/2 - 125}px`;
    speechBubble.style.top = `${fishRect.top - 100}px`;
    
    setTimeout(() => {
        speechBubble.style.display = 'none';
    }, 3000);
});

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => console.log('ServiceWorker registered'))
            .catch(err => console.log('ServiceWorker registration failed: ', err));
    });
}