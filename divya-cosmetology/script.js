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
