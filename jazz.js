document.addEventListener('DOMContentLoaded', function() {
    // Jazz songs data
   

   
    // Handle audio players
    const audioPlayers = document.querySelectorAll('.audio-player');
    let currentlyPlaying = null;

    audioPlayers.forEach(player => {
        // Add loading class while audio is loading
        player.addEventListener('loadstart', function() {
            this.closest('.song-card').classList.add('loading');
        });

        // Remove loading class when audio is loaded
        player.addEventListener('canplay', function() {
            this.closest('.song-card').classList.remove('loading');
        });

        // Handle play event
        player.addEventListener('play', function() {
            // Pause other playing audio if any
            if (currentlyPlaying && currentlyPlaying !== this) {
                currentlyPlaying.pause();
            }
            currentlyPlaying = this;
            
            // Add playing class to card
            const cards = document.querySelectorAll('.song-card');
            cards.forEach(card => card.classList.remove('playing'));
            this.closest('.song-card').classList.add('playing');
        });

        // Handle pause event
        player.addEventListener('pause', function() {
            this.closest('.song-card').classList.remove('playing');
        });

        // Handle ended event
        player.addEventListener('ended', function() {
            this.closest('.song-card').classList.remove('playing');
            currentlyPlaying = null;
        });

        // Handle audio loading errors
        player.addEventListener('error', function() {
            const songCard = this.closest('.song-card');
            songCard.classList.remove('loading');
            const songTitle = songCard.querySelector('.song-details h3').textContent;
            
            if (!songCard.querySelector('.error-message')) {
                this.insertAdjacentHTML('afterend', 
                    `<p class="error-message">Unable to load audio for "${songTitle}"</p>`);
            }
        });
    });

    // Handle download buttons
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', async function(e) {
            e.preventDefault();
            
            const songCard = this.closest('.song-card');
            const songTitle = songCard.querySelector('.song-details h3').textContent;
            const artistName = songCard.querySelector('.song-details p').textContent;
            const audioSrc = this.getAttribute('href');
            
            this.classList.add('loading');
            
            try {
                const response = await fetch(audioSrc);
                
                if (response.ok) {
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `${songTitle} - ${artistName}.mp3`;
                    document.body.appendChild(link);
                    link.click();
                    
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);

                    const successMsg = document.createElement('p');
                    successMsg.className = 'success-message';
                    successMsg.textContent = `Downloading "${songTitle}"`;
                    this.insertAdjacentElement('afterend', successMsg);
                    
                    setTimeout(() => {
                        successMsg.remove();
                    }, 3000);
                } else {
                    throw new Error('File not found');
                }
            } catch (error) {
                console.error('Download error:', error);
                if (!songCard.querySelector('.download-error')) {
                    const errorMsg = document.createElement('p');
                    errorMsg.className = 'error-message download-error';
                    errorMsg.textContent = `Unable to download "${songTitle}"`;
                    this.insertAdjacentElement('afterend', errorMsg);
                    
                    setTimeout(() => {
                        errorMsg.remove();
                    }, 3000);
                }
            } finally {
                this.classList.remove('loading');
            }
        });
    });
}); 
// download script
document.addEventListener("DOMContentLoaded", function () {
    const downloadBtns = document.querySelectorAll(".download-btn");

    function checkLoginStatus() {
        return localStorage.getItem("isLoggedIn") === "true";
    }

    downloadBtns.forEach(button => {
        button.addEventListener("click", function (e) {
            if (!checkLoginStatus()) {
                e.preventDefault(); // Stop the download
                alert("Please log in to download this song.");
                window.location.href = "auth.html"; // Redirect to login page
            }
        });
    });
});

