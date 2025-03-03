// Execute when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all permit cards
    const permitCards = document.querySelectorAll('.permit-card');
    
    // Add click event listeners to each permit card
    permitCards.forEach(card => {
        card.addEventListener('click', function() {
            // Get the permit type from data attribute
            const permitType = this.getAttribute('data-permit-type');
            
            // Highlight the selected card
            clearSelectedCards();
            this.classList.add('selected');
            
            // In a real application, you would redirect to the permit form
            // or open a modal with the permit form
            console.log(`Selected permit type: ${permitType}`);
            
            // For demo purposes, show a temporary message
            showTemporaryMessage(`${permitType.toUpperCase()} permit selected. Redirecting to form...`);
        });
    });
    
    // Clear selection from all cards
    function clearSelectedCards() {
        permitCards.forEach(card => {
            card.classList.remove('selected');
        });
    }
    
    // Show a temporary message
    function showTemporaryMessage(message) {
        // Create message element
        const messageElement = document.createElement('div');
        messageElement.classList.add('temporary-message');
        messageElement.textContent = message;
        
        // Append to body
        document.body.appendChild(messageElement);
        
        // Remove after 3 seconds
        setTimeout(() => {
            messageElement.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(messageElement);
            }, 500);
        }, 2500);
    }
    
    // Search functionality
    const searchInput = document.querySelector('.search-container input');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        permitCards.forEach(card => {
            const permitTitle = card.querySelector('h3').textContent.toLowerCase();
            const permitDesc = card.querySelector('p').textContent.toLowerCase();
            
            if (permitTitle.includes(searchTerm) || permitDesc.includes(searchTerm)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
    
    // Simulate a click on the notification icon
    const notificationIcon = document.querySelector('.notification-icon');
    
    notificationIcon.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Toggle a class to show/hide notifications dropdown
        // This would be implemented with actual notification elements
        console.log('Notifications clicked');
    });
    
    // Add handler for new permit button
    const createBtn = document.querySelector('.create-btn');
    
    createBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Show the permit grid (in case it was hidden)
        document.querySelector('.permit-selection-container').style.display = 'block';
        
        // Scroll to the permit selection section
        document.querySelector('.permit-header').scrollIntoView({
            behavior: 'smooth'
        });
        
        console.log('Create new permit clicked');
    });
    
    
    // Add animation for notification overlay (blue box)
    const notificationOverlay = document.querySelector('.notification-overlay');
    
    // Add a slight floating animation
    function animateNotification() {
        notificationOverlay.style.transition = 'transform 3s ease-in-out';
        
        let isUp = true;
        
        setInterval(() => {
            if (isUp) {
                notificationOverlay.style.transform = 'translateY(5px)';
            } else {
                notificationOverlay.style.transform = 'translateY(0)';
            }
            isUp = !isUp;
        }, 3000);
    }
    
    animateNotification();
});