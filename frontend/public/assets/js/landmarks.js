document.addEventListener('DOMContentLoaded', function() {
    // Initialize landmark filters
    const categoryFilter = document.querySelector('#categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterLandmarks);
    }

    // Initialize hover effects
    const landmarkCards = document.querySelectorAll('.landmark-card');
    landmarkCards.forEach(card => {
        card.addEventListener('mouseover', () => {
            card.classList.add('transform', 'scale-105');
        });
        card.addEventListener('mouseout', () => {
            card.classList.remove('transform', 'scale-105');
        });
    });

    // Add landmark button handler
    const addLandmarkBtn = document.querySelector('#addLandmarkBtn');
    if (addLandmarkBtn) {
        addLandmarkBtn.addEventListener('click', showAddLandmarkForm);
    }
});

function filterLandmarks(e) {
    const category = e.target.value;
    const cards = document.querySelectorAll('.landmark-card');
    
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function showAddLandmarkForm() {
    // Implement form display logic
    console.log('Show add landmark form');
}