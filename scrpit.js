// Sample content data
const moviesData = [
    {
        id: 1,
        title: "The Boys",
        category: "action",
        rating: "8.7/10",
        year: 2019,
        image: "https://via.placeholder.com/180x260?text=The+Boys",
        genre: "Action, Crime, Drama",
        description: "A group of vigilantes set out to take down corrupt superheroes with no more than wits and grit."
    },
    {
        id: 2,
        title: "The Marvelous Mrs. Maisel",
        category: "comedy",
        rating: "8.7/10",
        year: 2017,
        image: "https://via.placeholder.com/180x260?text=Mrs.+Maisel",
        genre: "Comedy, Drama",
        description: "After her husband leaves her, a 1950s housewife decides to become a comedic stand-up performer."
    },
    {
        id: 3,
        title: "Fleabag",
        category: "comedy",
        rating: "8.7/10",
        year: 2016,
        image: "https://via.placeholder.com/180x260?text=Fleabag",
        genre: "Comedy, Drama",
        description: "A reckless woman juggles her job, her relationships, and her out-of-control mother."
    },
    {
        id: 4,
        title: "Invincible",
        category: "action",
        rating: "8.5/10",
        year: 2021,
        image: "https://via.placeholder.com/180x260?text=Invincible",
        genre: "Action, Adventure, Animation",
        description: "An earthly teenager whose father is the most powerful superhero must establish himself as a hero in his own right."
    },
    {
        id: 5,
        title: "The Terminal",
        category: "drama",
        rating: "8.0/10",
        year: 2004,
        image: "https://via.placeholder.com/180x260?text=The+Terminal",
        genre: "Comedy, Drama",
        description: "An Eastern European man is stuck in JFK airport, and must find a way to enter the United States."
    },
    {
        id: 6,
        title: "Rings",
        category: "horror",
        rating: "5.3/10",
        year: 2017,
        image: "https://via.placeholder.com/180x260?text=Rings",
        genre: "Horror, Thriller",
        description: "A group of teens in a small town come under the shadow of an urban legend."
    },
    {
        id: 7,
        title: "The Expanse",
        category: "sci-fi",
        rating: "8.5/10",
        year: 2015,
        image: "https://via.placeholder.com/180x260?text=The+Expanse",
        genre: "Action, Adventure, Drama",
        description: "In the year 2350, humans have colonized the Solar System. A detective and a ship captain work together for the greater good."
    },
    {
        id: 8,
        title: "Futureman",
        category: "sci-fi",
        rating: "7.7/10",
        year: 2017,
        image: "https://via.placeholder.com/180x260?text=Futureman",
        genre: "Action, Comedy, Sci-Fi",
        description: "A gamer is transported to a dangerous alternate universe to join an elite force trying to save the world."
    },
    {
        id: 9,
        title: "The Tick",
        category: "action",
        rating: "7.7/10",
        year: 2016,
        image: "https://via.placeholder.com/180x260?text=The+Tick",
        genre: "Action, Comedy, Fantasy",
        description: "A mighty blue superhero inspires a mild-mannered accountant to become a superhero."
    },
    {
        id: 10,
        title: "Sneaky Pete",
        category: "drama",
        rating: "7.9/10",
        year: 2015,
        image: "https://via.placeholder.com/180x260?text=Sneaky+Pete",
        genre: "Comedy, Crime, Drama",
        description: "A con man leaves prison to work as an undercover operative for a federal agent."
    },
    {
        id: 11,
        title: "Jack Ryan",
        category: "action",
        rating: "7.5/10",
        year: 2018,
        image: "https://via.placeholder.com/180x260?text=Jack+Ryan",
        genre: "Action, Crime, Drama",
        description: "An up-and-coming CIA analyst must prove his worth when he uncovers a plot that could bring down the U.S."
    },
    {
        id: 12,
        title: "Patriot",
        category: "drama",
        rating: "8.3/10",
        year: 2015,
        image: "https://via.placeholder.com/180x260?text=Patriot",
        genre: "Comedy, Drama, Thriller",
        description: "An intelligence officer goes undercover to stop a potential terrorist attack while his personal life unravels."
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderMovies('all');
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    searchBtn.addEventListener('click', () => searchMovies(searchInput.value));
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchMovies(searchInput.value);
        }
    });

    // Category tabs
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            renderMovies(e.target.dataset.category);
        });
    });

    // Hero play button
    document.getElementById('playBtn').addEventListener('click', () => {
        openPlayer();
    });

    // Modal close buttons
    document.getElementById('closePlayer').addEventListener('click', closePlayer);
    document.getElementById('closeDetail').addEventListener('click', closeDetail);

    // Detail play button
    document.getElementById('detailPlayBtn').addEventListener('click', openPlayer);

    // Close modals on background click
    document.getElementById('playerModal').addEventListener('click', (e) => {
        if (e.target.id === 'playerModal') closePlayer();
    });

    document.getElementById('detailModal').addEventListener('click', (e) => {
        if (e.target.id === 'detailModal') closeDetail();
    });
}

// Render movies based on category
function renderMovies(category) {
    const trending = document.getElementById('trendingContent');
    const recommended = document.getElementById('recommendedContent');
    const popular = document.getElementById('popularContent');

    let filtered = category === 'all' ? moviesData : moviesData.filter(m => m.category === category);

    // Shuffle and split data
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    const trendingMovies = shuffled.slice(0, 6);
    const recommendedMovies = shuffled.slice(6, 12);
    const popularMovies = [...filtered].slice(0, 6);

    trending.innerHTML = createMovieCards(trendingMovies);
    recommended.innerHTML = createMovieCards(recommendedMovies);
    popular.innerHTML = createMovieCards(popularMovies);

    attachCardListeners();
}

// Create movie cards HTML
function createMovieCards(movies) {
    return movies.map(movie => `
        <div class="video-card" data-id="${movie.id}">
            <img src="${movie.image}" alt="${movie.title}">
            <div class="video-card-overlay">
                <div class="video-card-title">${movie.title}</div>
                <div class="video-card-rating">⭐ ${movie.rating}</div>
                <div class="video-card-buttons">
                    <button class="play-card-btn" onclick="openPlayer(event)">
                        <i class="fas fa-play"></i> Play
                    </button>
                    <button class="info-card-btn" onclick="openDetail(event, ${movie.id})">
                        <i class="fas fa-info-circle"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Attach event listeners to cards
function attachCardListeners() {
    document.querySelectorAll('.video-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('button')) {
                const movieId = card.dataset.id;
                openDetail(e, movieId);
            }
        });
    });
}

// Open video player
function openPlayer(e) {
    if (e) e.stopPropagation();
    document.getElementById('playerModal').classList.add('active');
    document.getElementById('videoPlayer').play();
}

// Close video player
function closePlayer() {
    const modal = document.getElementById('playerModal');
    const video = document.getElementById('videoPlayer');
    modal.classList.remove('active');
    video.pause();
    video.currentTime = 0;
}

// Open detail modal
function openDetail(e, movieId) {
    if (e) e.stopPropagation();
    const movie = moviesData.find(m => m.id == movieId);
    if (!movie) return;

    document.getElementById('detailImage').src = movie.image;
    document.getElementById('detailTitle').textContent = movie.title;
    document.getElementById('detailRating').textContent = `⭐ ${movie.rating}`;
    document.getElementById('detailYear').textContent = `${movie.year}`;
    document.getElementById('detailGenre').textContent = movie.genre;
    document.getElementById('detailDescription').textContent = movie.description;

    document.getElementById('detailModal').classList.add('active');
}

// Close detail modal
function closeDetail() {
    document.getElementById('detailModal').classList.remove('active');
}

// Search movies
function searchMovies(query) {
    if (!query.trim()) {
        renderMovies('all');
        return;
    }

    const filtered = moviesData.filter(movie =>
        movie.title.toLowerCase().includes(query.toLowerCase()) ||
        movie.genre.toLowerCase().includes(query.toLowerCase()) ||
        movie.category.toLowerCase().includes(query.toLowerCase())
    );

    const trending = document.getElementById('trendingContent');
    const recommended = document.getElementById('recommendedContent');
    const popular = document.getElementById('popularContent');

    if (filtered.length > 0) {
        const half = Math.ceil(filtered.length / 2);
        trending.innerHTML = createMovieCards(filtered.slice(0, half));
        recommended.innerHTML = createMovieCards(filtered.slice(half));
        popular.innerHTML = '<p style="color: #999; padding: 20px;">No more results</p>';
    } else {
        trending.innerHTML = '<p style="color: #999; padding: 20px;">No movies found matching your search.</p>';
        recommended.innerHTML = '';
        popular.innerHTML = '';
    }

    attachCardListeners();
}

// Add to watchlist
document.addEventListener('click', (e) => {
    if (e.target.closest('.btn-watchlist')) {
        const btn = e.target.closest('.btn-watchlist');
        btn.style.background = '#00a8e1';
        btn.style.color = '#000';
        btn.innerHTML = '<i class="fas fa-check"></i> Added';
        setTimeout(() => {
            btn.style.background = 'rgba(255, 255, 255, 0.2)';
            btn.style.color = '#fff';
            btn.innerHTML = '<i class="fas fa-heart"></i> Add to Watchlist';
        }, 2000);
    }
});
