// Fixed credentials - in a real application these would be server-side
const CORRECT_USERNAME = "admin@xyz.com";
const CORRECT_PASSWORD = "12345";

// Get form elements
const loginForm = document.getElementById('loginForm');
const messageEl = document.getElementById('message');

// Add event listener to form submission
loginForm.addEventListener('submit', function(event) {
    // Prevent the form from submitting
    event.preventDefault();
    
    // Get input values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Clear previous messages
    messageEl.classList.remove('success', 'error', 'show');
    
    // Check credentials
    if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
        // Success
        messageEl.textContent = 'Login successful! Redirecting...';
        messageEl.classList.add('success', 'show');
        
        // In a real application, you would redirect to another page or perform further actions
        setTimeout(() => {
            alert('Login successful! Redirecting to dashboard.');
            window.location.href = '/dashboardpage/dashboard.html';  // Uncomment in a real app
        }, 1500);
    } else {
        // Error
        messageEl.textContent = 'Invalid username or password. Please try again.';
        messageEl.classList.add('error', 'show');
    }
});
