    const bgMusic = document.getElementById('bg-music');
    const toggleBtn = document.getElementById('toggleMusic');

    const startTime = 0; // in seconds
    const endTime = 37;   // in seconds

    // Jump to start time when ready
    bgMusic.addEventListener('loadedmetadata', () => {
      bgMusic.currentTime = startTime;
    });

    // Loop within the range
    bgMusic.addEventListener('timeupdate', () => {
      if (bgMusic.currentTime >= endTime) {
        bgMusic.currentTime = startTime;
        bgMusic.play();
      }
    });

    // Start bounce + glow
    toggleBtn.classList.add('bounce-glow');
    toggleBtn.addEventListener('click', () => {
      if (bgMusic.paused) {
        bgMusic.play();
        toggleBtn.innerHTML = '🔊';
      } else {
        bgMusic.pause();
        toggleBtn.innerHTML = '🔇';
      }
      toggleBtn.classList.remove('bounce-glow');
    });

    // Create confetti
    const confettiPieces = [];
    for (let i = 0; i < 15; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = Math.random() * -100 + 'vh';
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
    confetti.style.animationDuration = (Math.random() * 3 + 3) + 's';
    document.body.appendChild(confetti);
    confettiPieces.push(confetti);
    }

    // Remove confetti after 40 seconds
    setTimeout(() => {
    confettiPieces.forEach(piece => piece.remove());
    }, 40000); // 40000ms = 40 seconds

    // Fade between two profile pictures
    const pic1 = document.getElementById('profilePic1');
    const pic2 = document.getElementById('profilePic2');
    let showingFirst = true;

    setInterval(() => {
      if (showingFirst) {
        pic1.classList.remove('active');
        pic2.classList.add('active');
      } else {
        pic2.classList.remove('active');
        pic1.classList.add('active');
      }
      showingFirst = !showingFirst;
    }, 5000); // switch every 5 seconds

    // Dynamic name, type, and images via URL
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name') || 'Sazzad';
    const type = urlParams.get('type') || 'Happy Birthday';
    const img1 = urlParams.get('img1');
    const img2 = urlParams.get('img2');

    document.getElementById('greeting').innerHTML = `🎉 ${type}, ${name}! 🎉`;
    document.getElementById('message').innerHTML = `Wishing you a wonderful ${type.toLowerCase()} filled with joy and love 💖`;

    if (img1) pic1.src = img1;
    if (img2) pic2.src = img2;

    // Dynamic page title
    document.title = `${type}, ${name}!`;

    // Anime-style glitter trail
    document.addEventListener("mousemove", (e) => {
        const glitter = document.createElement("div");
        glitter.classList.add("glitter");
        glitter.style.left = `${e.clientX}px`;
        glitter.style.top = `${e.clientY}px`;
        document.body.appendChild(glitter);
        setTimeout(() => glitter.remove(), 900);
    });

    // Particle burst on click
    document.addEventListener("click", (e) => {
        const particles = 15;
        for (let i = 0; i < particles; i++) {
            const particle = document.createElement("div");
            particle.classList.add("particle");
            particle.style.left = `${e.clientX}px`;
            particle.style.top = `${e.clientY}px`;

            const angle = Math.random() * 2 * Math.PI;
            const radius = Math.random() * 50;

            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            particle.style.transform = `translate(${x}px, ${y}px)`;
            particle.style.transition = "transform 0.6s ease-out, opacity 0.6s ease-out";

            document.body.appendChild(particle);

            requestAnimationFrame(() => {
            particle.style.opacity = "0";
            });

            setTimeout(() => particle.remove(), 600);
        }
    });

    // Copy and Share
    function copyLink() {
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert("✅ Link copied!"))
        .catch(() => alert("❌ Failed to copy link."));
    }

    function shareNow() {
      if (navigator.share) {
        navigator.share({
          title: document.title,
          text: "✨ Here's a special wish for you!",
          url: window.location.href
        }).catch((err) => console.error("Share failed:", err));
      } else {
        alert("❗ Sharing not supported on this device.");
      }
    }

    // Set up lightbox images array using dynamic img1 and img2
    const images = [
      img1 || 'images/sazzad1.jpg',
      img2 || 'images/sazzad.jpg'
    ];

    let currentIndex = 0;

    const lightbox = document.getElementById('lightboxOverlay');
    const lightboxImg = document.getElementById('lightboxImg');
    const profileContainer = document.getElementById('profileContainer');

    // Open lightbox with currently visible image
    profileContainer.addEventListener('click', () => {
      const activeImg = document.querySelector('.fade-image.active');
      currentIndex = images.findIndex(img => activeImg.src.includes(img));
      if (currentIndex === -1) currentIndex = 0; // fallback
      openLightbox(currentIndex);
    });

    function openLightbox(index) {
      lightboxImg.src = images[index];
      lightbox.classList.add('show');
    }

    function closeLightbox() {
      lightbox.classList.remove('show');
    }

    function prevImage() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      openLightbox(currentIndex);
    }

    function nextImage() {
      currentIndex = (currentIndex + 1) % images.length;
      openLightbox(currentIndex);
    }




