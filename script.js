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
        description: "A group of vigilantes set out to take down corrupt superheroes with no more than wits and grit. Their mission is to expose the truth and protect the innocent."
    },
    {
        id: 2,
        title: "The Marvelous Mrs. Maisel",
        category: "comedy",
        rating: "8.7/10",
        year: 2017,
        image: "https://via.placeholder.com/180x260?text=Mrs.+Maisel",
        genre: "Comedy, Drama",
        description: "After her husband leaves her, a 1950s housewife decides to become a comedic stand-up performer. A witty and charming series."
    },
    {
        id: 3,
        title: "Fleabag",
        category: "comedy",
        rating: "8.7/10",
        year: 2016,
        image: "https://via.placeholder.com/180x260?text=Fleabag",
        genre: "Comedy, Drama",
        description: "A reckless woman juggles her job, her relationships, and her out-of-control mother. Breaking the fourth wall with humor."
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
        description: "A group of teens in a small town come under the shadow of an urban legend. Fear spreads rapidly."
    },
    {
        id: 7,
        title: "The Expanse",
        category: "sci-fi",
        rating: "8.5/10",
        year: 2015,
        image: "https://via.placeholder.com/180x260?text=The+Expanse",
        genre: "Action, Adventure, Drama",
        description: "In the year 2350, humans have colonized the Solar System. A detective and ship captain uncover a conspiracy."
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
        description: "An up-and-coming CIA analyst must prove his worth when he uncovers a plot to bring down the U.S."
    },
    {
        id: 12,
        title: "Patriot",
        category: "drama",
        rating: "8.3/10",
        year: 2015,
        image: "https://via.placeholder.com/180x260?text=Patriot",
        genre: "Comedy, Drama, Thriller",
        description: "An intelligence officer goes undercover to stop a terrorist attack while his personal life unravels."
    }
];

// State Management
class PrimeVideoApp {
    constructor() {
        this.watchlist = this.loadWatchlist();
        this.currentCarouselIndex = 0;
        this.isSearchActive = false;
    }

    loadWatchlist() {
        const stored = localStorage.getItem('primeVideoWatchlist');
        return stored ? JSON.parse(stored) : [];
    }

    saveWatchlist() {
        localStorage.setItem('primeVideoWatchlist', JSON.stringify(this.watchlist));
    }

    addToWatchlist(movieId) {
        if (!this.watchlist.includes(movieId)) {
            this.watchlist.push(movieId);
            this.saveWatchlist();
            return true;
        }
        return false;
    }

    removeFromWatchlist(movieId) {
        this.watchlist = this.watchlist.filter(id => id !== movieId);
        this.saveWatchlist();
    }

    isInWatchlist(movieId) {
        return this.watchlist.includes(movieId);
    }
}

const app = new PrimeVideoApp();

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    renderMovies('all');
    startHeroCarousel();
    setupKeyboardShortcuts();
    addLoadingStates();
});

// Setup keyboard shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePlayer();
            closeDetail();
        }
        if (e.ctrlKey && e.key === 'f') {
            e.preventDefault();
            document.getElementById('searchInput').focus();
        }
        if (e.key === ' ' && document.getElementById('videoPlayer').parentElement.offsetParent !== null) {
            e.preventDefault();
            const video = document.getElementById('videoPlayer');
            video.paused ? video.play() : video.pause();
        }
    });
}

// Add loading states
function addLoadingStates() {
    const imgs = document.querySelectorAll('img');
    imgs.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        img.addEventListener('error', () => {
            img.style.background = 'linear-gradient(135deg, #1a1a1a, #2a2a2a)';
            img.innerHTML = '<i class="fas fa-image"></i>';
        });
        img.style.opacity = '0';
    });
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    searchBtn.addEventListener('click', () => {
        app.isSearchActive = true;
        searchMovies(searchInput.value);
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            app.isSearchActive = true;
            searchMovies(searchInput.value);
        }
    });

    searchInput.addEventListener('focus', () => {
        searchInput.parentElement.style.borderColor = '#00a8e1';
        searchInput.parentElement.style.background = 'rgba(0, 168, 225, 0.15)';
    });

    searchInput.addEventListener('blur', () => {
        searchInput.parentElement.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        searchInput.parentElement.style.background = 'rgba(255, 255, 255, 0.1)';
    });

    // Category tabs
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            app.isSearchActive = false;
            document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            renderMovies(e.target.dataset.category);
            searchInput.value = '';
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

    // Add to watchlist in detail modal
    document.addEventListener('click', (e) => {
        if (e.target.closest('.btn-watchlist')) {
            const btn = e.target.closest('.btn-watchlist');
            handleWatchlistToggle(btn);
        }
    });
}

// Handle watchlist toggle with animation
function handleWatchlistToggle(btn) {
    const movieId = parseInt(btn.dataset.movieId) || 1;
    const isAdded = app.isInWatchlist(movieId);

    if (!isAdded) {
        app.addToWatchlist(movieId);
        btn.classList.add('added');
        btn.innerHTML = '<i class="fas fa-check"></i> Added to Watchlist';
        showNotification('Added to Watchlist', 'success');
    } else {
        app.removeFromWatchlist(movieId);
        btn.classList.remove('added');
        btn.innerHTML = '<i class="fas fa-heart"></i> Add to Watchlist';
        showNotification('Removed from Watchlist', 'info');
    }

    setTimeout(() => {
        btn.classList.remove('added');
        btn.innerHTML = '<i class="fas fa-heart"></i> Add to Watchlist';
    }, 3000);
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === 'success' ? '#00a8e1' : '#666'};
        color: #000;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 2000;
        animation: slideInRight 0.3s ease;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2500);
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

    // Add fade-in animation
    trending.style.opacity = '0';
    recommended.style.opacity = '0';
    popular.style.opacity = '0';

    setTimeout(() => {
        trending.innerHTML = createMovieCards(trendingMovies);
        recommended.innerHTML = createMovieCards(recommendedMovies);
        popular.innerHTML = createMovieCards(popularMovies);

        trending.style.opacity = '1';
        recommended.style.opacity = '1';
        popular.style.opacity = '1';

        attachCardListeners();
        addLoadingStates();
    }, 100);
}

// Create movie cards HTML
function createMovieCards(movies) {
    return movies.map(movie => {
        const inWatchlist = app.isInWatchlist(movie.id);
        return `
            <div class="video-card" data-id="${movie.id}" title="${movie.title}">
                <img src="${movie.image}" alt="${movie.title}" loading="lazy">
                <div class="video-card-overlay">
                    <div class="video-card-info">
                        <div class="video-card-title">${movie.title}</div>
                        <div class="video-card-rating">⭐ ${movie.rating}</div>
                        <div class="video-card-year">${movie.year}</div>
                    </div>
                    <div class="video-card-buttons">
                        <button class="play-card-btn" onclick="openPlayer(event)" title="Play">
                            <i class="fas fa-play"></i>
                        </button>
                        <button class="info-card-btn" onclick="openDetail(event, ${movie.id})" title="More Info">
                            <i class="fas fa-info-circle"></i>
                        </button>
                        <button class="watchlist-card-btn ${inWatchlist ? 'added' : ''}" onclick="addToWatchlistCard(event, ${movie.id})" title="${inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}">
                            <i class="fas fa-${inWatchlist ? 'check' : 'plus'}"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Add to watchlist from card
function addToWatchlistCard(e, movieId) {
    e.stopPropagation();
    const btn = e.target.closest('.watchlist-card-btn');
    const isAdded = app.isInWatchlist(movieId);

    if (!isAdded) {
        app.addToWatchlist(movieId);
        btn.classList.add('added');
        btn.innerHTML = '<i class="fas fa-check"></i>';
        showNotification('Added to Watchlist ✓', 'success');
    } else {
        app.removeFromWatchlist(movieId);
        btn.classList.remove('added');
        btn.innerHTML = '<i class="fas fa-plus"></i>';
        showNotification('Removed from Watchlist', 'info');
    }
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

// Hero carousel auto-rotation
function startHeroCarousel() {
    setInterval(() => {
        app.currentCarouselIndex = (app.currentCarouselIndex + 1) % moviesData.length;
        updateHeroCarousel();
    }, 8000);
}

function updateHeroCarousel() {
    const movie = moviesData[app.currentCarouselIndex];
    document.querySelector('.hero-item h1').textContent = movie.title;
    document.querySelector('.hero-item p').textContent = movie.description;
    document.querySelector('.hero-item img').src = movie.image;
}

// Open video player
function openPlayer(e) {
    if (e) e.stopPropagation();
    const modal = document.getElementById('playerModal');
    const video = document.getElementById('videoPlayer');
    
    modal.classList.add('active');
    video.style.opacity = '0';
    setTimeout(() => {
        video.style.opacity = '1';
        video.play().catch(() => console.log('Autoplay prevented'));
    }, 200);
    
    // Prevent scroll
    document.body.style.overflow = 'hidden';
}

// Close video player
function closePlayer() {
    const modal = document.getElementById('playerModal');
    const video = document.getElementById('videoPlayer');
    
    modal.classList.remove('active');
    video.pause();
    video.currentTime = 0;
    
    // Restore scroll
    document.body.style.overflow = 'auto';
}

// Open detail modal
function openDetail(e, movieId) {
    if (e) e.stopPropagation();
    const movie = moviesData.find(m => m.id == movieId);
    if (!movie) return;

    const detailImage = document.getElementById('detailImage');
    const detailTitle = document.getElementById('detailTitle');
    const detailRating = document.getElementById('detailRating');
    const detailYear = document.getElementById('detailYear');
    const detailGenre = document.getElementById('detailGenre');
    const detailDescription = document.getElementById('detailDescription');
    const watchlistBtn = document.querySelector('.btn-watchlist');

    detailImage.src = movie.image;
    detailTitle.textContent = movie.title;
    detailRating.textContent = `⭐ ${movie.rating}`;
    detailYear.textContent = `${movie.year}`;
    detailGenre.textContent = movie.genre;
    detailDescription.textContent = movie.description;
    watchlistBtn.dataset.movieId = movie.id;

    // Update watchlist button state
    if (app.isInWatchlist(movie.id)) {
        watchlistBtn.classList.add('added');
        watchlistBtn.innerHTML = '<i class="fas fa-check"></i> Added to Watchlist';
    } else {
        watchlistBtn.classList.remove('added');
        watchlistBtn.innerHTML = '<i class="fas fa-heart"></i> Add to Watchlist';
    }

    const modal = document.getElementById('detailModal');
    modal.classList.add('active');
    
    // Prevent scroll
    document.body.style.overflow = 'hidden';
}

// Close detail modal
function closeDetail() {
    const modal = document.getElementById('detailModal');
    modal.classList.remove('active');
    
    // Restore scroll
    document.body.style.overflow = 'auto';
}

// Search movies
function searchMovies(query) {
    if (!query.trim()) {
        document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
        document.querySelector('.category-tab[data-category="all"]').classList.add('active');
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

    trending.style.opacity = '0';
    recommended.style.opacity = '0';
    popular.style.opacity = '0';

    setTimeout(() => {
        if (filtered.length > 0) {
            const half = Math.ceil(filtered.length / 2);
            trending.innerHTML = createMovieCards(filtered.slice(0, half));
            recommended.innerHTML = createMovieCards(filtered.slice(half));
            popular.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px;">
                    <p style="color: #00a8e1; font-size: 16px;">Found ${filtered.length} result${filtered.length !== 1 ? 's' : ''}</p>
                </div>
            `;
        } else {
            trending.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px;">
                    <i class="fas fa-search" style="font-size: 48px; color: #666; margin-bottom: 15px; display: block;"></i>
                    <p style="color: #999; font-size: 16px;">No movies found matching "${query}"</p>
                </div>
            `;
            recommended.innerHTML = '';
            popular.innerHTML = '';
        }

        trending.style.opacity = '1';
        recommended.style.opacity = '1';
        popular.style.opacity = '1';

        attachCardListeners();
        addLoadingStates();
    }, 100);
}

// Smooth scroll on anchor click
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Add smooth transition styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    * {
        transition: opacity 0.3s ease;
    }
    
    .content-grid {
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);
