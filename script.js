// ============================================================
// 1. LOADING SCREEN
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hidden');
    }, 1800);
});

// ============================================================
// 2. PRE-ROLL DISPLAY (PRD)
// ============================================================
const prdScreen = document.getElementById('prd-screen');
const enterBtn = document.getElementById('enter-invitation');

enterBtn.addEventListener('click', () => {
    prdScreen.classList.add('hidden');
    document.getElementById('header-nav').style.display = 'block';
    
    // Play music
    const bgm = document.getElementById('bgm');
    bgm.play().catch(() => {});
    document.getElementById('music-toggle').classList.add('playing');
});

// ============================================================
// 3. MUSIC CONTROL
// ============================================================
const musicToggle = document.getElementById('music-toggle');
const bgm = document.getElementById('bgm');

musicToggle.addEventListener('click', () => {
    if (bgm.paused) {
        bgm.play().catch(() => {});
        musicToggle.classList.add('playing');
        musicToggle.innerHTML = '<i class="fas fa-music"></i>';
    } else {
        bgm.pause();
        musicToggle.classList.remove('playing');
        musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
});

// ============================================================
// 4. NAVIGATION
// ============================================================
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const hamburgerBtn = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');

// Hamburger toggle
hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Nav links click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const target = link.dataset.section;
        const section = document.getElementById(target);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active nav on scroll
const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(link => {
                link.classList.toggle('active', link.dataset.section === id);
            });
        }
    });
}, { threshold: 0.4 });

sections.forEach(section => navObserver.observe(section));

// ============================================================
// 5. SCROLL TO TOP BUTTON
// ============================================================
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    // Show/hide button
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Auto scroll to top when reaching bottom
let isScrollingUp = false;
window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const clientHeight = window.innerHeight;
    
    // Jika sudah di bagian bawah (dengan toleransi 50px)
    if (scrollTop + clientHeight >= scrollHeight - 50) {
        // Scroll otomatis ke atas setelah 2 detik
        if (!isScrollingUp) {
            isScrollingUp = true;
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setTimeout(() => {
                    isScrollingUp = false;
                }, 1000);
            }, 2000);
        }
    }
});

// ============================================================
// 6. COUNTDOWN
// ============================================================
const targetDate = new Date('2026-07-24T08:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ============================================================
// 7. OPEN INVITATION BUTTON
// ============================================================
document.getElementById('open-invitation').addEventListener('click', () => {
    document.getElementById('info').scrollIntoView({ behavior: 'smooth' });
});

// ============================================================
// 8. FLOATING HEARTS
// ============================================================
function createFloatingHearts() {
    const container = document.getElementById('floating-hearts');
    const heartSymbols = ['❤', '🤍', '💛', '💗'];
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('span');
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 20 + 10}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.3 + 0.1};
            animation: floatHeart ${Math.random() * 15 + 10}s linear infinite;
            animation-delay: ${Math.random() * 10}s;
            pointer-events: none;
            transform: translateX(-50%);
        `;
        container.appendChild(heart);
    }
}
createFloatingHearts();

// CSS for floating hearts
const heartStyle = document.createElement('style');
heartStyle.textContent = `
    @keyframes floatHeart {
        0% { transform: translateY(100vh) rotate(0deg) scale(0.5); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-10vh) rotate(720deg) scale(1.2); opacity: 0; }
    }
`;
document.head.appendChild(heartStyle);

// ============================================================
// 9. SCROLL DOWN BUTTONS
// ============================================================
document.querySelectorAll('.scroll-down-btn-small').forEach(btn => {
    btn.addEventListener('click', () => {
        const section = btn.closest('.section');
        const nextSection = section.nextElementSibling;
        if (nextSection && nextSection.classList.contains('section')) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================================
// 10. GALLERY
// ============================================================
const galleryImages = [
    'assets/galeri/1.jpeg',
    'assets/galeri/2.jpeg',
    'assets/galeri/3.jpeg',
    'assets/galeri/4.jpeg',
    'assets/galeri/5.jpeg',
    'assets/galeri/6.jpeg',
    'assets/galeri/7.jpeg',
    'assets/galeri/8.jpeg',
];

const galleryLabels = [
    'Momen Bahagia',
    'Kebersamaan',
    'Cinta',
    'Tawa',
    'Kenangan',
    'Janji',
    'Doa',
    'Harapan'
];

const galleryGrid = document.getElementById('gallery-grid');

if (galleryGrid) {
    galleryGrid.innerHTML = '';
    
    galleryImages.forEach((img, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.dataset.index = index;
        item.innerHTML = `
            <img src="${img}" alt="Foto kenangan ${index + 1}" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22 viewBox=%220 0 200 200%22%3E%3Crect width=%22200%22 height=%22200%22 fill=%22%231a1512%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-family=%22Arial%22 font-size=%2214%22 fill=%22%23b8a99a%22 text-anchor=%22middle%22 dy=%22.3em%22%3E📷 Foto%3C/text%3E%3C/svg%3E'" />
            <div class="gallery-overlay">
                <i class="fas fa-expand-alt"></i>
                <span class="gallery-label">${galleryLabels[index] || `Kenangan ${index + 1}`}</span>
            </div>
            <span class="gallery-badge">${String(index + 1).padStart(2, '0')}</span>
        `;
        item.addEventListener('click', () => openLightbox(index));
        galleryGrid.appendChild(item);
    });
}

// ============================================================
// 11. LIGHTBOX
// ============================================================
const lightbox = document.getElementById('lightbox-modal');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const lightboxCounter = document.getElementById('lightbox-counter');
let currentIndex = 0;
let isLightboxOpen = false;

function openLightbox(index) {
    if (!lightbox || !lightboxImg) return;
    
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    lightbox.style.display = 'flex';
    isLightboxOpen = true;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '15px';
}

function closeLightbox() {
    if (!lightbox) return;
    
    lightbox.classList.remove('active');
    lightbox.style.display = 'none';
    isLightboxOpen = false;
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
}

function updateLightbox() {
    if (!lightboxImg || !lightboxCaption || !lightboxCounter) return;
    
    lightboxImg.src = galleryImages[currentIndex];
    lightboxImg.alt = galleryLabels[currentIndex] || `Kenangan ${currentIndex + 1}`;
    lightboxCaption.textContent = galleryLabels[currentIndex] || `Kenangan ${currentIndex + 1}`;
    lightboxCounter.textContent = `${currentIndex + 1} / ${galleryImages.length}`;
}

// Event listeners
const closeBtn = document.querySelector('.lightbox-close');
const prevBtn = document.querySelector('.lightbox-prev');
const nextBtn = document.querySelector('.lightbox-next');

if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
}

if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightbox();
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % galleryImages.length;
        updateLightbox();
    });
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Keyboard events
document.addEventListener('keydown', (e) => {
    if (!isLightboxOpen) return;
    
    if (e.key === 'Escape') {
        closeLightbox();
    }
    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightbox();
    }
    if (e.key === 'ArrowRight') {
        e.preventDefault();
        currentIndex = (currentIndex + 1) % galleryImages.length;
        updateLightbox();
    }
});

// Touch support
let touchStartX = 0;
let touchEndX = 0;
let isSwiping = false;

if (lightbox) {
    lightbox.addEventListener('touchstart', (e) => {
        if (e.target === lightbox || e.target.closest('.lightbox-slider')) {
            touchStartX = e.changedTouches[0].screenX;
            isSwiping = true;
        }
    }, { passive: true });

    lightbox.addEventListener('touchmove', (e) => {
        if (isSwiping) {
            e.preventDefault();
        }
    }, { passive: false });

    lightbox.addEventListener('touchend', (e) => {
        if (!isSwiping) return;
        
        touchEndX = e.changedTouches[0].screenX;
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                currentIndex = (currentIndex + 1) % galleryImages.length;
            } else {
                currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            }
            updateLightbox();
        }
        isSwiping = false;
    }, { passive: true });
}

// Reset lightbox state
document.addEventListener('DOMContentLoaded', function() {
    if (lightbox) {
        lightbox.style.display = 'none';
        lightbox.classList.remove('active');
    }
});

// ============================================================
// 12. RSVP - GOOGLE SHEETS INTEGRATION
// ============================================================

// Ganti URL ini dengan URL Apps Script Anda setelah deploy
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzMPuw_YuHhWh6wH6uNamJfCkL4yuu8fMtZRYtKk2tp-he2o3DMd2m_yBBlpl7l6-CyUA/exec';

const rsvpForm = document.getElementById('rsvp-form');
const rsvpTableBody = document.getElementById('rsvp-table-body');
const rsvpMessage = document.getElementById('rsvp-status-message');

// Load Data dari Google Sheets
async function loadRSVP() {
    try {
        rsvpTableBody.innerHTML = `<tr><td colspan="5" class="rsvp-loading">⏳ Memuat data...</td></tr>`;
        
        const response = await fetch(`${APPS_SCRIPT_URL}?action=getData`);
        const result = await response.json();
        
        if (result.status === 'success' && result.data && result.data.length > 0) {
            const data = result.data;
            
            if (data.length === 0) {
                rsvpTableBody.innerHTML = `<tr><td colspan="5" class="rsvp-loading">📭 Belum ada konfirmasi</td></tr>`;
                return;
            }
            
            rsvpTableBody.innerHTML = data.map(row => `
                <tr>
                    <td>${row.timestamp || '-'}</td>
                    <td>${row.name || '-'}</td>
                    <td>${row.status || '-'}</td>
                    <td>${row.guests || '-'}</td>
                    <td>${row.message || '-'}</td>
                </tr>
            `).join('');
        } else {
            rsvpTableBody.innerHTML = `<tr><td colspan="5" class="rsvp-loading">📭 Belum ada konfirmasi</td></tr>`;
        }
    } catch (error) {
        console.error('Error loading RSVP:', error);
        rsvpTableBody.innerHTML = `<tr><td colspan="5" class="rsvp-loading">⚠️ Gagal memuat data. Refresh halaman.</td></tr>`;
    }
}

// Submit Data ke Google Sheets
async function submitRSVP(formData) {
    try {
        const response = await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'addData',
                ...formData
            })
        });
        
        return { status: 'success' };
    } catch (error) {
        console.error('Error submitting RSVP:', error);
        throw error;
    }
}

// Event: Submit Form
rsvpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('rsvp-name').value.trim();
    const status = document.getElementById('rsvp-status').value;
    const guests = document.getElementById('rsvp-guests').value || '1';
    const message = document.getElementById('rsvp-message').value.trim();

    if (!name || !status) {
        rsvpMessage.className = 'rsvp-message error';
        rsvpMessage.textContent = '⚠️ Mohon isi Nama dan Status Kehadiran.';
        return;
    }

    const submitBtn = rsvpForm.querySelector('.btn-submit-glass');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';

    try {
        const formData = { name, status, guests, message };
        await submitRSVP(formData);
        
        rsvpForm.reset();
        rsvpMessage.className = 'rsvp-message success';
        rsvpMessage.textContent = '✅ Terima kasih! Konfirmasi Anda telah tercatat.';
        
        document.getElementById('nav-guest-name').textContent = name;
        document.getElementById('home-guest-name').textContent = name;
        
        setTimeout(() => {
            loadRSVP();
        }, 1500);
        
    } catch (error) {
        rsvpMessage.className = 'rsvp-message error';
        rsvpMessage.textContent = '❌ Gagal mengirim. Silakan coba lagi.';
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Kirim Konfirmasi';
    }
});

// Load data saat halaman dibuka
loadRSVP();

// Refresh data setiap 30 detik
setInterval(loadRSVP, 30000);

// ============================================================
// 13. AOS INIT
// ============================================================
AOS.init({
    duration: 800,
    once: true,
    offset: 50,
});

// ============================================================
// 14. CEK KONEKSI INTERNET
// ============================================================
window.addEventListener('online', () => {
    loadRSVP();
    rsvpMessage.className = 'rsvp-message success';
    rsvpMessage.textContent = '📶 Koneksi kembali. Data diperbarui.';
    setTimeout(() => {
        rsvpMessage.textContent = '';
        rsvpMessage.className = 'rsvp-message';
    }, 3000);
});

window.addEventListener('offline', () => {
    rsvpMessage.className = 'rsvp-message error';
    rsvpMessage.textContent = '⚠️ Tidak ada koneksi internet. Data tidak dapat disimpan.';
});

console.log('✅ Undangan Ririn & Diki siap!');
console.log('📌 Apps Script URL:', APPS_SCRIPT_URL);