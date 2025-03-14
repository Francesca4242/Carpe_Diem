// Quotes arrays
const motivationalQuotes = [
    {text: "Dive in headfirst—the water's fine and so are your goals!", author: "Anchovy Aristotle"},
    {text: "Don't let setbacks scale you down!", author: "Finnius Claw"},
    {text: "Be the shark in a sea of minnows!", author: "Jawdeen Sharp"},
    {text: "Even the mightiest tuna started as a guppy!", author: "Bubbles McFintastic"},
    {text: "Life's a current—swim against it and grow stronger!", author: "Tidalia Wavecrest"},
    {text: "Net working beats not working!", author: "Codfrey Netcaster"},
    {text: "You're a starfish in a sea of possibilities!", author: "Stella Marina"},
    {text: "Don't clam up—share your pearls of wisdom!", author: "Shelly Bivalve"},
    {text: "Stay afloat… even jellyfish know how to drift with purpose!", author: "Bloom Meduzo"},
    {text: "Reel in your dreams—no catch-and-release today!", author: "Rodney Reelworth"},
    {text: "Why fit in when you were born to school?", author: "Piranha Picasso"},
    {text: "The ocean is your oyster… now find that pearl!", author: "Pearlie Clamshell"},
    {text: "Avoid the bait of doubt—you're a great catch!", author: "Lure McHook"},
    {text: "Crab your destiny with both claws!", author: "Crustacean Determination"},
    {text: "Anglerfish rule the dark—shine even when it's pitch black!", author: "Glowbert Deepsea"},
    {text: "Don't flounder—every tide turns eventually!", author: "Captain Finspire"},
    {text: "Eel-ieve in yourself—slither past obstacles!", author: "Slick Silverfin"},
    {text: "Aim higher than the seagull stealing fries!", author: "Wingtip Gullsworth"},
    {text: "Your potential is as endless as the abyss… dive deeper!", author: "Nemo Nauticus"},
    {text: "A rising tide lifts all boats—so let's make waves together!", author: "Coral Connors"}
];

const demotivationalQuotes = [
    {text: "Why bother? The net always wins...", author: "Red Herring"},
    {text: "You're just a small fish in a big pond...", author: "Red Herring"},
    {text: "Tomorrow's just another day to be bait...", author: "Red Herring"},
    {text: "The current's strong and you're getting tired.", author: "Red Herring"},
    {text: "The ocean doesn't care if you drown.", author: "Red Herring"},
    {text: "Even if you swim upstream, you'll still end up downstream.", author: "Red Herring"},
    {text: "You're not even a fish—just plankton.", author: "Red Herring"},
    {text: "The early fish gets the hook… but you're late anyway.", author: "Red Herring"},
    {text: "There are plenty of fish in the sea… and you're still alone.", author: "Red Herring"},
    {text: "Every fishbowl has a lid… and you're trapped.", author: "Red Herring"},
    {text: "Sharks circle. Always.", author: "Red Herring"},
    {text: "Tides rise… but so do your regrets.", author: "Red Herring"},
    {text: "You think you're a catch? The line's been cut.", author: "Red Herring"},
    {text: "Sink or swim? Either way, you're still wet.", author: "Red Herring"},
    {text: "Your 'school' of thought? Dropout.", author: "Red Herring"},
    {text: "Pearls are for clams… and you're shellfish.", author: "Red Herring"},
    {text: "Dory forgot? So will everyone else.", author: "Red Herring"},
    {text: "Bubbles rise… your hopes don't.", author: "Red Herring"}
];

// PWA Installation
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('installButton').style.display = 'inline-block';
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