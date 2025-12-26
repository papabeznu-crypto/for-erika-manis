// ==========================================
// ROMANTIC WEBSITE FOR ERIKA - JAVASCRIPT
// Interactive Features & Animations
// ==========================================

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function () {
    initFloatingHearts();
    initScrollAnimations();
    initQuizGame();
    initMusicPlayer();
    initScrollIndicator();
});

// ===== FLOATING HEARTS BACKGROUND =====
function initFloatingHearts() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heartSymbols = ['💜', '💗', '💖', '💕', '💝'];

    // Create initial hearts
    for (let i = 0; i < 15; i++) {
        createHeart();
    }

    // Create new hearts periodically
    setInterval(createHeart, 3000);

    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.animationDuration = (Math.random() * 5 + 8) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';

        heartsContainer.appendChild(heart);

        // Remove heart after animation completes
        setTimeout(() => {
            heart.remove();
        }, 12000);
    }
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe section titles
    document.querySelectorAll('.section-title').forEach(title => {
        observer.observe(title);
    });

    // Observe reason cards with stagger effect
    document.querySelectorAll('.reason-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(card);
    });
}

// ===== SCROLL INDICATOR =====
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const reasonsSection = document.getElementById('reasons');
            reasonsSection.scrollIntoView({ behavior: 'smooth' });
        });

        // Hide indicator after scrolling
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }
}

// ===== QUIZ GAME =====
function initQuizGame() {
    const player1 = document.getElementById('player1');
    const player2 = document.getElementById('player2');
    const runBtn = document.getElementById('runBtn');
    const holdHandsBtn = document.getElementById('holdHandsBtn');
    const resetBtn = document.getElementById('resetBtn');
    const gameStatus = document.getElementById('gameStatus');
    const gameMessage = document.getElementById('gameMessage');

    let gameState = 'initial'; // initial, running, holding
    let player1Pos = { x: 20, y: 20 };
    let player2Pos = { x: 20, y: 20 }; // relative to right side

    // Run towards each other
    runBtn.addEventListener('click', () => {
        if (gameState !== 'initial') return;

        gameState = 'running';
        gameStatus.textContent = '💨 Berlari mendekat...';
        gameStatus.className = 'game-status';
        gameMessage.textContent = '';

        // Animate players running towards center
        player1.style.transition = 'all 2s ease-out';
        player2.style.transition = 'all 2s ease-out';

        // Adjust positions based on screen size
        const isMobile = window.innerWidth <= 480;
        const leftPos = isMobile ? '30%' : '35%';
        const rightPos = isMobile ? '30%' : '35%';

        // Move closer but still separated by glasses
        player1.style.left = leftPos;
        player1.style.bottom = '50%';
        player1.style.transform = isMobile ? 'translateY(50%) scale(1.1)' : 'translateY(50%) scale(1.2)';

        player2.style.right = rightPos;
        player2.style.bottom = '50%';
        player2.style.transform = isMobile ? 'translateY(50%) scale(1.1)' : 'translateY(50%) scale(1.2)';

        setTimeout(() => {
            gameStatus.textContent = '👓 Terhalang kacamata... tapi masih bisa saling melihat! 💜';
            gameMessage.textContent = 'Klik "Raih Tanganku" untuk melampaui batas!';
        }, 2000);
    });

    // Hold hands - overcome the barrier
    holdHandsBtn.addEventListener('click', () => {
        if (gameState === 'initial') {
            gameMessage.textContent = 'Berlari dulu mendekat ya! 😊';
            return;
        }

        if (gameState === 'holding') {
            gameMessage.textContent = 'Kita sudah bergandengan tangan! 💕';
            return;
        }

        gameState = 'holding';

        // Make obstacle fade and move players to center
        const obstacle = document.querySelector('.obstacle');
        obstacle.style.transition = 'all 1s ease-out';
        obstacle.style.opacity = '0.2';
        obstacle.style.transform = 'translate(-50%, -50%) scale(0.5)';

        // Adjust final positions based on screen size
        const isMobile = window.innerWidth <= 480;
        const finalPos = isMobile ? '42%' : '45%';

        // Move players to center, overlapping
        player1.style.left = finalPos;
        player2.style.right = finalPos;

        // Create heart explosion effect
        createHeartExplosion();

        setTimeout(() => {
            gameStatus.textContent = '💕 Berhasil! Kita bergandengan tangan!';
            gameStatus.className = 'game-status success';
            gameMessage.textContent = 'Tidak ada yang bisa memisahkan kita ketika cinta kita kuat! 💜✨';

            // Add sparkle effect
            player1.style.filter = 'drop-shadow(0 0 10px #f8b4d9)';
            player2.style.filter = 'drop-shadow(0 0 10px #f8b4d9)';
        }, 1000);
    });

    // Reset game
    resetBtn.addEventListener('click', () => {
        gameState = 'initial';

        player1.style.transition = 'all 0.5s ease-out';
        player2.style.transition = 'all 0.5s ease-out';

        player1.style.left = '20px';
        player1.style.bottom = '20px';
        player1.style.transform = 'none';
        player1.style.filter = 'none';

        player2.style.right = '20px';
        player2.style.bottom = '20px';
        player2.style.transform = 'none';
        player2.style.filter = 'none';

        const obstacle = document.querySelector('.obstacle');
        obstacle.style.opacity = '1';
        obstacle.style.transform = 'translate(-50%, -50%) scale(1)';

        gameStatus.textContent = 'Tidak ada yang bisa memisahkan kita, bahkan kacamata sekalipun! 💜';
        gameStatus.className = 'game-status';
        gameMessage.textContent = '';
    });

    // Create heart explosion animation
    function createHeartExplosion() {
        const gameCanvas = document.querySelector('.game-canvas');
        const hearts = ['💜', '💗', '💖', '💕', '💝', '✨', '⭐'];

        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'absolute';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.fontSize = '1.5rem';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '100';

            const angle = (Math.PI * 2 * i) / 20;
            const velocity = 50 + Math.random() * 50;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;

            gameCanvas.appendChild(heart);

            heart.animate([
                {
                    transform: 'translate(-50%, -50%) scale(0)',
                    opacity: 1
                },
                {
                    transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1)`,
                    opacity: 0
                }
            ], {
                duration: 1000 + Math.random() * 500,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });

            setTimeout(() => heart.remove(), 2000);
        }
    }
}

// ===== MUSIC PLAYER =====
function initMusicPlayer() {
    const musicPlayer = document.getElementById('musicPlayer');
    const playBtn = document.getElementById('playBtn');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;

    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            playBtn.innerHTML = '<i class="fas fa-music"></i>';
            musicPlayer.classList.remove('playing');
            isPlaying = false;
        } else {
            // Check if audio source exists
            if (bgMusic.children.length === 0) {
                // No audio file loaded
                playBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i>';

                // Show temporary message
                const tempMsg = document.createElement('div');
                tempMsg.style.position = 'fixed';
                tempMsg.style.bottom = '100px';
                tempMsg.style.right = '30px';
                tempMsg.style.background = 'rgba(155, 89, 182, 0.95)';
                tempMsg.style.color = 'white';
                tempMsg.style.padding = '15px 20px';
                tempMsg.style.borderRadius = '10px';
                tempMsg.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
                tempMsg.style.zIndex = '1001';
                tempMsg.style.maxWidth = '250px';
                tempMsg.textContent = '🎵 Untuk mendengarkan "Penjaga Hati", tambahkan file audio ke folder project dan update tag <audio> di HTML!';
                document.body.appendChild(tempMsg);

                setTimeout(() => {
                    tempMsg.style.transition = 'opacity 0.5s';
                    tempMsg.style.opacity = '0';
                    setTimeout(() => tempMsg.remove(), 500);
                }, 4000);

                setTimeout(() => {
                    playBtn.innerHTML = '<i class="fas fa-music"></i>';
                }, 2000);

                return;
            }

            bgMusic.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            musicPlayer.classList.add('playing');
            isPlaying = true;
        }
    });

    // Handle music end
    bgMusic.addEventListener('ended', () => {
        playBtn.innerHTML = '<i class="fas fa-music"></i>';
        musicPlayer.classList.remove('playing');
        isPlaying = false;
    });
}

// ===== INTERACTIVE HEARTS ON CLICK =====
document.addEventListener('click', (e) => {
    // Skip if clicking on buttons or interactive elements
    if (e.target.tagName === 'BUTTON' || e.target.closest('button') ||
        e.target.closest('.music-player') || e.target.closest('.player')) {
        return;
    }

    createClickHeart(e.clientX, e.clientY);
});

function createClickHeart(x, y) {
    const heart = document.createElement('div');
    heart.textContent = '💜';
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = '1.5rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    heart.style.userSelect = 'none';

    document.body.appendChild(heart);

    heart.animate([
        {
            transform: 'translate(-50%, -50%) scale(0) rotate(0deg)',
            opacity: 1
        },
        {
            transform: 'translate(-50%, -100px) scale(1.5) rotate(15deg)',
            opacity: 0
        }
    ], {
        duration: 1000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });

    setTimeout(() => heart.remove(), 1000);
}

// ===== SMOOTH SCROLL FOR NAVIGATION =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== CONSOLE MESSAGE =====
console.log('%c💜 Untuk Erika 💜', 'color: #9b59b6; font-size: 24px; font-weight: bold;');
console.log('%cWebsite ini dibuat dengan penuh cinta dan kasih sayang', 'color: #bb8fce; font-size: 14px;');
console.log('%cSemoga kamu suka! 💕', 'color: #f8b4d9; font-size: 16px;');
