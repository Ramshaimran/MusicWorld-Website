// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Sample music data (you can replace this with real data from an API)
const sampleMusicData = [
    {
        title: 'Rock',
        description: 'Experience the power of electric guitars and drums',
        cover: 'images/rock theme.jpg'
    },
    {
        title: 'Jazz',
        description: 'Smooth rhythms and sophisticated harmonies',
        cover: 'images/jazz-theme.jpg'
    },
    {
        title: 'Pop',
        description: 'Catchy tunes and modern beats',
        cover: 'images/pop-theme.png'
    },
    {
        title: 'Rap',
        description: 'Urban beats and powerful lyrics',
        cover: 'images/rap-theme.jpg'
    },
    {
        title: 'Classical',
        description: 'Timeless orchestral masterpieces',
        cover: 'images/classical-theme.jpg'
    }
];

// Function to dynamically update trending section
function updateTrendingSection() {
    const musicGrid = document.querySelector('.music-grid');
    if (musicGrid) {
        musicGrid.innerHTML = '';

        sampleMusicData.forEach(genre => {
            const card = document.createElement('div');
            card.className = 'music-card';
            card.innerHTML = `
                <img src="${genre.cover}" alt="${genre.title} Music">
                <h3>${genre.title}</h3>
                <p>${genre.description}</p>
                <button class="explore-btn" onclick="exploreGenre('${genre.title.toLowerCase()}')">
                    Explore ${genre.title}
                    <i class="fas fa-chevron-right"></i>
                </button>
            `;
            musicGrid.appendChild(card);

            // Add animation to music card on hover
            card.addEventListener('mouseover', () => {
                card.style.transform = 'scale(1.05)';
                card.style.transition = 'transform 0.3s ease';
            });

            card.addEventListener('mouseout', () => {
                card.style.transform = 'scale(1)';
            });
        });
    }
}

// Function to handle genre exploration
function exploreGenre(genre) {
    switch(genre.toLowerCase()) {
        case 'rock':
            window.location.href = 'rock.html';
            break;
        case 'jazz':
            window.location.href = 'jazz.html';
            break;
        case 'pop':
            window.location.href = 'pop.html';
            break;
        case 'rap':
            window.location.href = 'rap.html';
            break;
        case 'classical':
            window.location.href = 'classical.html';
            break;
        default:
            window.location.href = '#' + genre.toLowerCase();
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', updateTrendingSection);

// Login button redirect
const loginBtn = document.getElementById('loginBtn');
if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        window.location.href = 'auth.html'; // Redirect to auth.html after login
    });
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        } else {
            header.style.backgroundColor = '#000000';
        }
    }
});

// Signup Modal Functionality
const signupModal = document.getElementById('signupModal');
const signupLink = document.getElementById('signupLink');
const loginLink = document.getElementById('loginLink');
const signupForm = document.getElementById('signupForm');
const closeSignup = signupModal ? signupModal.getElementsByClassName('close')[0] : null;

// Switch to signup modal
signupLink && signupLink.addEventListener('click', function(e) {
    e.preventDefault();
    signupModal.style.display = 'block';
});

// Switch to login modal
loginLink && loginLink.addEventListener('click', function(e) {
    e.preventDefault();
    signupModal.style.display = 'none';
});

// Close signup modal
closeSignup && closeSignup.addEventListener('click', function() {
    signupModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close signup modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === signupModal) {
        signupModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Handle signup form submission
signupForm && signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('terms').checked;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    // Validate terms
    if (!terms) {
        alert('Please agree to the Terms and Conditions');
        return;
    }
    
    // Here you would typically make an API call to your backend
    console.log('Signup attempt:', { fullName, email, username, password, terms });
    
    // For demo purposes, show success message
    alert('Account created successfully! Please login.');
    signupModal.style.display = 'none';
    signupForm.reset();
});

// Password validation
const newPassword = document.getElementById('newPassword');
const confirmPassword = document.getElementById('confirmPassword');

function validatePassword() {
    if (newPassword.value !== confirmPassword.value) {
        confirmPassword.setCustomValidity('Passwords do not match');
    } else {
        confirmPassword.setCustomValidity('');
    }
}

newPassword && newPassword.addEventListener('input', validatePassword);
confirmPassword && confirmPassword.addEventListener('input', validatePassword);

// Function to update login button based on user state
function updateLoginButton() {
    const loginBtn = document.getElementById('loginBtn');
    const currentUser = localStorage.getItem('currentUser');
    
    if (currentUser && loginBtn) {
        // Create user profile element
        const userProfile = document.createElement('div');
        userProfile.className = 'user-profile';
        userProfile.innerHTML = `
            <span class="username">${currentUser}</span>
            <button class="logout-btn" title="Logout"><i class="fas fa-sign-out-alt"></i></button>
        `;
        
        // Replace login button with user profile
        loginBtn.parentNode.replaceChild(userProfile, loginBtn);
        
        // Add logout functionality
        const logoutBtn = userProfile.querySelector('.logout-btn');
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            window.location.reload();
        });
    } else if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            window.location.href = 'auth.html';
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    updateLoginButton();
});



document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburgerMenu.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
});

//search bar
document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.querySelector(".search-bar form");

    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();
        let query = document.querySelector(".search-bar input").value.trim().toLowerCase();
        if (query === "") return; // Stop if input is empty

        // Define mappings for categories, albums, and artists
        const pageMappings = {
            "rock": "rock.html",
            "jazz": "jazz.html",
            "pop": "pop.html",
            "rap": "rap.html",
            "classical": "classical.html",
            "songs": "songs.html",
            "album": "album.html",
            "artists": "artists.html"
        };

        // Check if query matches a category, album, or artist
        if (pageMappings[query]) {
            window.location.href = pageMappings[query]; // Redirect to the page
            return;
        }

        // Otherwise, search for individual songs within music cards
        let results = [];
        document.querySelectorAll(".music-card").forEach((card) => {
            let title = card.querySelector("h3").innerText.toLowerCase();
            let description = card.querySelector("p").innerText.toLowerCase();
            if (title.includes(query) || description.includes(query)) {
                results.push({
                    title: card.querySelector("h3").innerText,
                    image: card.querySelector("img").src,
                    description: card.querySelector("p").innerText,
                    link: card.querySelector("a").href
                });
            }
        });

        // Store the search results and redirect to search.html
        localStorage.setItem("searchResults", JSON.stringify(results));
        localStorage.setItem("searchQuery", query);
        window.location.href = "search.html";
    });
});
