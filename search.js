document.addEventListener("DOMContentLoaded", function () {
    let query = localStorage.getItem("searchQuery");
    let results = JSON.parse(localStorage.getItem("searchResults"));

    if (!query) {
        document.getElementById("searchResults").innerHTML = "<p>No search query found.</p>";
        return;
    }

    document.getElementById("resultCount").innerText = `Results for: "${query}"`;

    let resultsContainer = document.getElementById("searchResults");
    resultsContainer.innerHTML = ""; // Clear previous results

    if (!results || results.length === 0) {
        resultsContainer.innerHTML = "<p>No matching results found.</p>";
        return;
    }

    results.forEach(item => {
        let card = document.createElement("div");
        card.classList.add("music-card");
        card.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <a href="${item.link}" class="explore-btn">
                <span>Explore</span>
                <i class="fas fa-chevron-right"></i>
            </a>
        `;
        resultsContainer.appendChild(card);
    });
});
