// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvTCPFXIQInqsjQxnBF42gDNevlXHDGsw",
  authDomain: "divyasstudio-8c764.firebaseapp.com",
  projectId: "divyasstudio-8c764",
  storageBucket: "divyasstudio-8c764.firebasestorage.app",
  messagingSenderId: "454284508676",
  appId: "1:454284508676:web:df5bc0b7862cce38e23f51",
  measurementId: "G-T26YL9T8T9"
};

let db = null;
if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
}

// Global Firebase Data Fetcher
async function getFirebaseData(collectionName) {
    if (!db) return [];
    try {
        const snapshot = await db.collection(collectionName).get();
        let data = [];
        snapshot.forEach(doc => {
            let item = doc.data();
            item.id = doc.id;
            data.push(item);
        });
        return data.sort((a,b) => (a.createdAt || 0) - (b.createdAt || 0));
    } catch (e) {
        console.error("Firebase get error", e);
        return [];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    window.revealObserver = revealObserver; // Make it global

    revealElements.forEach(el => revealObserver.observe(el));

    // Parallax effect on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-bg');
        
        parallaxElements.forEach(el => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            el.style.backgroundPosition = `center ${yPos}px`;
        });
    });
});

// Admin Login Logic - Global Scope
function showLogin() {
    let loginModal = document.getElementById('loginModal');
    if (!loginModal) {
        loginModal = document.createElement('div');
        loginModal.id = 'loginModal';
        loginModal.innerHTML = `
            <div style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); z-index:2000; display:flex; align-items:center; justify-content:center;">
                <div style="background:white; padding:3rem; width:100%; max-width:400px; text-align:center;">
                    <h2 style="margin-bottom:2rem; font-family:'Montserrat', sans-serif;">ADMIN <span>LOGIN</span></h2>
                    <input type="text" id="adminUser" placeholder="Username" style="width:100%; padding:1rem; margin-bottom:1rem; border:1px solid #DDD; font-family:'Montserrat', sans-serif;">
                    <div style="position:relative; margin-bottom:2rem;">
                        <input type="password" id="adminPass" placeholder="Password" style="width:100%; padding:1rem; border:1px solid #DDD; font-family:'Montserrat', sans-serif;">
                        <span onclick="toggleLoginPass()" style="position:absolute; right:1rem; top:50%; transform:translateY(-50%); cursor:pointer; font-size:1.2rem; filter:grayscale(100%);">👁️</span>
                    </div>
                    <div style="display:flex; gap:1rem;">
                        <button onclick="checkLogin()" style="flex:1; padding:1rem; background:black; color:white; border:none; font-weight:700; cursor:pointer; font-family:'Montserrat', sans-serif;">LOGIN</button>
                        <button onclick="hideLogin()" style="flex:1; padding:1rem; background:none; border:1px solid black; cursor:pointer; font-family:'Montserrat', sans-serif;">CANCEL</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(loginModal);
    }
    loginModal.style.display = 'block';
}

function toggleLoginPass() {
    const pInput = document.getElementById('adminPass');
    const icon = event.target;
    if (pInput.type === 'password') {
        pInput.type = 'text';
        icon.style.filter = 'grayscale(0%)';
    } else {
        pInput.type = 'password';
        icon.style.filter = 'grayscale(100%)';
    }
}

function hideLogin() {
    document.getElementById('loginModal').style.display = 'none';
}

function checkLogin() {
    const user = document.getElementById('adminUser').value;
    const pass = document.getElementById('adminPass').value;
    const savedPass = localStorage.getItem('divya_admin_pass') || 'divya123';
    
    // Simple hardcoded user 'admin' for demo, dynamic pass
    if (user === 'admin' && pass === savedPass) {
        sessionStorage.setItem('divya_admin_logged_in', 'true');
        window.location.href = 'admin.html';
    } else {
        alert('Invalid credentials');
    }
}

function logoutAdmin() {
    sessionStorage.removeItem('divya_admin_logged_in');
    window.location.href = 'index.html';
}

function updateAdminPassword(currentPass, newPass) {
    const savedPass = localStorage.getItem('divya_admin_pass') || 'divya123';
    if (currentPass !== savedPass) {
        alert('Current password incorrect');
        return false;
    }
    localStorage.setItem('divya_admin_pass', newPass);
    alert('Password updated successfully!');
    return true;
}

document.addEventListener('DOMContentLoaded', () => {

    // Admin login trigger from URL
    if (window.location.search.includes('admin=true')) {
        setTimeout(showLogin, 500);
    }

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Header offset
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll background effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.85)';
            header.style.boxShadow = 'none';
        }
    });

    // Simple reveal text animation for hero
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(20px)';
        setTimeout(() => {
            heroTitle.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 100);
    }
});

// Mobile Menu Toggle
function toggleMobileMenu() {
    const nav = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    if(nav && hamburger) {
        nav.classList.toggle('nav-active');
        hamburger.classList.toggle('toggle');
    }
}

// Testimonial Slider Logic
let currentSlide = 0;
let totalSlides = 0;
let cardsPerView = 3;

async function initTestimonialSlider() {
    const sliderContainer = document.getElementById('homeTestimonialSlider');
    const dotsContainer = document.getElementById('homeTestimonialDots');
    if (!sliderContainer) return; // Not on home page

    try {
        const feedbackData = await getFirebaseData('feedback');
        
        // Filter out highly rated only (e.g., 4 or 5 stars) and sort by newest
        const validFeedback = feedbackData
            .filter(f => f.rating >= 4 && f.positive)
            .sort((a, b) => b.createdAt - a.createdAt);

        if (validFeedback.length === 0) {
            sliderContainer.innerHTML = '<div style="text-align:center; width:100%; color:#999; padding: 2rem;">No stories to show yet. Be the first to leave feedback!</div>';
            
            // Hide navigation if no feedback
            const wrapper = document.querySelector('.testimonial-slider-wrapper');
            if(wrapper) {
                const btns = wrapper.querySelectorAll('.slider-btn');
                btns.forEach(btn => btn.style.display = 'none');
            }
            return;
        }

        let htmlContent = '';
        validFeedback.slice(0, 10).forEach(item => { // Show max 10
            const initial = (item.name || 'A').charAt(0).toUpperCase();
            
            // Limit text size
            let text = item.positive;
            if (text.length > 150) {
                text = text.substring(0, 150) + '...';
            }

            const dateStr = item.date || (item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '');
            
            htmlContent += `
                <div class="testimonial-card-wrapper">
                    <div class="testimonial-card">
                        <div class="quote-icon">"</div>
                        <h3 class="testimonial-title">${item.rating === 5 ? 'Exceptional Service!' : 'Great Experience!'}</h3>
                        <p class="testimonial-text">"${text}"</p>
                        <div class="testimonial-author">
                            <div class="author-avatar">${initial}</div>
                            <div class="author-info">
                                <h4>${item.name || 'Anonymous'}</h4>
                                <p>Client</p>
                            </div>
                            <div class="author-date">${dateStr}</div>
                        </div>
                    </div>
                </div>
            `;
        });

        sliderContainer.innerHTML = htmlContent;
        
        // Wait for rendering then setup
        setTimeout(setupSlider, 100);

    } catch (e) {
        console.error("Error loading testimonials:", e);
        sliderContainer.innerHTML = '<div style="text-align:center; width:100%; color:#FF0000;">Could not load stories.</div>';
    }
}

function setupSlider() {
    const wrapper = document.querySelector('.testimonial-slider-wrapper');
    const slider = document.getElementById('homeTestimonialSlider');
    if (!slider) return;
    const cards = slider.querySelectorAll('.testimonial-card-wrapper');
    
    if (cards.length === 0) return;

    function updateCardsPerView() {
        if (window.innerWidth <= 576) cardsPerView = 1;
        else if (window.innerWidth <= 968) cardsPerView = 2;
        else cardsPerView = 3;
        
        // E.g. 5 cards, 3 per view -> max slide is 2
        totalSlides = Math.max(0, cards.length - cardsPerView);
        currentSlide = Math.min(currentSlide, totalSlides); // adjust if resized
        updateSliderPosition();
        createDots();
    }

    window.addEventListener('resize', updateCardsPerView);
    updateCardsPerView(); // Initial call
    
    // Auto-advance
    if(totalSlides > 0) {
        setInterval(() => {
            if (currentSlide < totalSlides) {
                moveTestimonialSlider(1);
            } else {
                goToSlide(0);
            }
        }, 7000); // Increased reading time
    }
}

function createDots() {
    const dotsContainer = document.getElementById('homeTestimonialDots');
    if(!dotsContainer) return;
    dotsContainer.innerHTML = '';
    
    if (totalSlides <= 0) return; // don't show dots if everything fits

    for (let i = 0; i <= totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = `dot ${i === currentSlide ? 'active' : ''}`;
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    }
}

function updateDots() {
    const dots = document.querySelectorAll('#homeTestimonialDots .dot');
    dots.forEach((dot, index) => {
        dot.className = `dot ${index === currentSlide ? 'active' : ''}`;
    });
}

function updateSliderPosition() {
    const slider = document.getElementById('homeTestimonialSlider');
    if(!slider) return;
    
    let wrapEl = document.querySelector('.testimonial-card-wrapper');
    if(!wrapEl) return;
    
    // CSS gap is 2rem (approx 32px based on 16px body font)
    const gap = 32; 
    let cardWidth = wrapEl.offsetWidth;
    
    slider.style.transform = `translateX(-${currentSlide * (cardWidth + gap)}px)`;
}

window.moveTestimonialSlider = function(direction) {
    currentSlide += direction;
    if (currentSlide < 0) currentSlide = 0;
    if (currentSlide > totalSlides) currentSlide = totalSlides;
    
    updateSliderPosition();
    updateDots();
}

function goToSlide(index) {
    currentSlide = index;
    updateSliderPosition();
    updateDots();
}

document.addEventListener('DOMContentLoaded', () => {
    // Tiny delay to let firebase complete initialization
    setTimeout(initTestimonialSlider, 300);
});
