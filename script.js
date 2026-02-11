

document.addEventListener('DOMContentLoaded', () => {
   
    initSmoothScroll();
    initPromiseCards();
    initEnvelopeInteraction();
    initSealPromise();
    initFloatingParticles();
    initMusicPlayer(); 
});

function createFloatingflo(container) {
    const heart = document.createElement('div');
    heart.innerText = '🌸';
    heart.style.position = 'absolute';
    heart.style.left = '50%';
    heart.style.top = '50%';
    heart.style.transform = 'translate(-50%, -50%)';
    heart.style.fontSize = '2rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '100';
    
   
    const animation = heart.animate([
        { transform: 'translate(-50%, -50%) scale(0.5)', opacity: 0 },
        { transform: 'translate(-50%, -50%) scale(1.2)', opacity: 1, offset: 0.2 },
        { transform: 'translate(-50%, -150%) scale(1)', opacity: 0 }
    ], {
        duration: 1000,
        easing: 'ease-out'
    });

    container.appendChild(heart);
    
    animation.onfinish = () => heart.remove();
}

function initSmoothScroll() {
    const heroBtn = document.querySelector('.glass-btn');
    
    if (heroBtn) {
        heroBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector('#promise-section');
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start' 
                });
                
                
                createSparkleBurst(e.clientX, e.clientY);
            }
        });
    }
}


function initPromiseCards() {
    const cards = document.querySelectorAll('.promise-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
     
            let message = "";
            const title = this.querySelector('h3').innerText;

            if (title === 'Trust') message = "I promise to trust you with all my heart.";
            if (title === 'Care') message = "I promise to care for you in every way I can.";
            if (title === 'Forever') message = "My love for you is a journey starting at forever.";

            revealPromise(this, message);
        });
    });
}

function revealPromise(element, message) {
    
    if (element.classList.contains('is-revealed')) {
        createFloatingHeart(element); 
        return;
    }

    const textElement = element.querySelector('.reveal-text');
    
   
    textElement.style.opacity = '0';
    
    setTimeout(() => {
        textElement.innerText = message;
        textElement.style.color = "#ff758c";
        textElement.style.fontWeight = "600";
        textElement.style.opacity = '1';
        

        element.classList.add('is-revealed');
        element.style.borderColor = "#a1c4fd";
        element.style.boxShadow = "0 0 30px rgba(161, 196, 253, 0.4)";
        
 
        createFloatingHeart(element);
        playSoftChime(); 
    }, 300);
}


function initEnvelopeInteraction() {
    const envelopeWrapper = document.querySelector('.envelope-wrapper');
    const hintText = document.querySelector('.click-hint');
    
    if (envelopeWrapper) {
        envelopeWrapper.addEventListener('click', () => {
            const isOpen = envelopeWrapper.classList.contains('open');
            
            if (!isOpen) {
                
                envelopeWrapper.classList.add('open');
                if (hintText) hintText.innerText = "Click again to close 💌";
                createSparkleBurst(
                    envelopeWrapper.getBoundingClientRect().left + 150, 
                    envelopeWrapper.getBoundingClientRect().top + 100
                );
            } else {
                
                envelopeWrapper.classList.remove('open');
                if (hintText) hintText.innerText = "Click the envelope to open 💌";
            }
            for(let i=0; i<5; i++) {
    setTimeout(() => createFloatingflo(envelopeWrapper), i * 1);
}
        });
        
    }
    
}


function initSealPromise() {
    const sealBtn = document.querySelector('.action-btn');
    
    if (sealBtn) {
        sealBtn.addEventListener('click', sealPromise);
    }
}

function sealPromise() {
    const input = document.getElementById('userPromise');
    const display = document.getElementById('sealedMessage');
    
    if (!input || !display) return;
    
    const userText = input.value.trim();

    if(userText === "") {
        shakeElement(input); 
        input.placeholder = "Please write a promise first! ✨";
        return;
    }

    
    display.innerHTML = `
        <span style="font-size: 2rem; display: block; margin-bottom: 10px;">💋</span>
        Sealed Forever:<br>
        <span class="cursive-text">"${userText}"</span>
    `;
    
    display.style.display = "block";
    display.style.opacity = "0";
    display.style.transform = "translateY(20px)";
    
    
    setTimeout(() => {
        display.style.transition = "all 0.8s ease";
        display.style.opacity = "1";
        display.style.transform = "translateY(0)";
    }, 100);

    
    input.value = "";
    input.placeholder = "Promise sealed successfully! 🌸";
    
    
    triggerConfetti();
}




function createFloatingHeart(container) {
    const heart = document.createElement('div');
    heart.innerText = '💖';
    heart.style.position = 'absolute';
    heart.style.left = '50%';
    heart.style.top = '50%';
    heart.style.transform = 'translate(-50%, -50%)';
    heart.style.fontSize = '2rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '100';
    
   
    const animation = heart.animate([
        { transform: 'translate(-50%, -50%) scale(0.5)', opacity: 0 },
        { transform: 'translate(-50%, -50%) scale(1.2)', opacity: 1, offset: 0.2 },
        { transform: 'translate(-50%, -150%) scale(1)', opacity: 0 }
    ], {
        duration: 1000,
        easing: 'ease-out'
    });

    container.appendChild(heart);
    
    animation.onfinish = () => heart.remove();
}


function shakeElement(element) {
    element.animate([
        { transform: 'translateX(0)' },
        { transform: 'translateX(-10px)' },
        { transform: 'translateX(10px)' },
        { transform: 'translateX(-10px)' },
        { transform: 'translateX(0)' }
    ], {
        duration: 400
    });
}


function initFloatingParticles() {
    const container = document.querySelector('.floating-particles');
    if(!container) return;

    const particleCount = 20;
    const icons = ['🌸', '✨', '💖', '☁️', '💍'];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('span');
        particle.innerText = icons[Math.floor(Math.random() * icons.length)];
        
        // Random positioning and sizing
        const size = Math.random() * 20 + 10;
        particle.style.fontSize = `${size}px`;
        particle.style.position = 'absolute';
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        particle.style.pointerEvents = 'none';
        
        // Custom float animation duration
        const duration = Math.random() * 20 + 10;
        particle.style.animation = `floatBackground ${duration}s linear infinite`;
        
        container.appendChild(particle);
    }
}


function createSparkleBurst(x, y) {
    const colors = ['#FFD700', '#FF758C', '#A1C4FD', '#FFFFFF'];
    const count = 10;

    for (let i = 0; i < count; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'fixed';
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;
        sparkle.style.width = '6px';
        sparkle.style.height = '6px';
        sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        sparkle.style.borderRadius = '50%';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        
        document.body.appendChild(sparkle);


        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 60 + 20;
        const moveX = Math.cos(angle) * velocity;
        const moveY = Math.sin(angle) * velocity;

        const anim = sparkle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${moveX}px, ${moveY}px) scale(0)`, opacity: 0 }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0, .9, .57, 1)'
        });

        anim.onfinish = () => sparkle.remove();
    }
}

function triggerConfetti() {
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createSparkleBurst(
                Math.random() * window.innerWidth, 
                window.innerHeight / 2
            );
        }, i * 50);
    }
}


function playSoftChime() {
    
    const audio = new Audio('chime.mp3');
    audio.volume = 0.2;
    audio.play().catch(e => console.log("Audio play failed (user interaction needed first)"));
    console.log("🎵 *Soft Chime Sound*");
}

function initMusicPlayer() {
    console.log("Music Player Module Loaded");
   
}

const styleSheet = document.createElement("style");
styleSheet.innerText = `
    @keyframes floatBackground {
        0% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
        100% { transform: translateY(0) rotate(360deg); }
    }
    
    .cursive-text {
        font-family: 'Great Vibes', cursive;
        color: #ff758c;
    }
    
    .promise-card.is-revealed {
        background: rgba(255, 255, 255, 0.4);
    }
`;
document.head.appendChild(styleSheet);


document.addEventListener('mousemove', (e) => {
  
    if (Math.random() > 0.1) { 
        createPinkSparkle(e.clientX, e.clientY);
    }
});

function createPinkSparkle(x, y) {
    const sparkle = document.createElement('div');
    
    // Randomize size 
    const size = Math.random() * 6 + 2; 
    
    sparkle.style.position = 'fixed';
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    
    // Soft pink glow aesthetic
    sparkle.style.backgroundColor = '#ff758c'; 
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '10000';
    sparkle.style.boxShadow = '0 0 8px #ff758c, 0 0 12px #ffffff';
    
    document.body.appendChild(sparkle);

    // Random drift direction
    const moveX = (Math.random() - 0.5) * 30;
    const moveY = (Math.random() - 0.5) * 30;

    const anim = sparkle.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${moveX}px, ${moveY}px) scale(0)`, opacity: 0 }
    ], {
        duration: 800 + Math.random() * 400,
        easing: 'ease-out'
    });

    anim.onfinish = () => sparkle.remove();
}


document.addEventListener('mousedown', (e) => {
    createClickBurst(e.clientX, e.clientY);
});

function createClickBurst(x, y) {
    
    const colors = ['#ff758c', '#ff9eb5', '#ffffff', '#ffb6c1'];
    const particleCount = 15; 

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.width = `${Math.random() * 8 + 4}px`; 
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '10001';
        particle.style.boxShadow = '0 0 10px rgba(255, 117, 140, 0.5)';
        
        document.body.appendChild(particle);

        // Calculate circular explosion path
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 100 + 50; 
        const moveX = Math.cos(angle) * velocity;
        const moveY = Math.sin(angle) * velocity;

        const anim = particle.animate([
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
            { transform: `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px)) scale(0)`, opacity: 0 }
        ], {
            duration: 600 + Math.random() * 400,
            easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)' 
        });

        anim.onfinish = () => particle.remove();
    }
}