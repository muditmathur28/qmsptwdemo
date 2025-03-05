document.addEventListener('DOMContentLoaded', () => {
    const backToDashboardBtn = document.getElementById('backToDashboard');
    
    backToDashboardBtn.addEventListener('click', () => {
        // In a real application, this would be a proper navigation
        // For this example, we'll use a simple alert
        alert('Navigating back to Dashboard');
        
        // Simulated navigation - replace with actual routing in a real app
        // window.location.href = '/dashboard';
    });

    // Optional: You could add more interactive features here
    // For example, fetching real-time approval status from a backend
    function checkApprovalStatus() {
        // Simulate API call to check approval status
        // This is a placeholder and would be replaced with actual backend communication
        const mockStatuses = {
            permitOwner: true,
            areaIncharge: false,
            approverHOD: false,
            hseCoordinator: false
        };

        // Update status icons based on mockup
        Object.entries(mockStatuses).forEach(([stepId, isComplete]) => {
            const step = document.getElementById(stepId);
            const statusIcon = step.querySelector('.status-icon');
            
            if (isComplete) {
                statusIcon.textContent = '✓';
                statusIcon.classList.remove('incomplete');
                statusIcon.classList.add('complete');
                step.querySelector('p').textContent = 'Status: Approved';
            } else {
                statusIcon.textContent = '✗';
                statusIcon.classList.remove('complete');
                statusIcon.classList.add('incomplete');
                step.querySelector('p').textContent = 'Status: Pending';
            }
        });
    }

    // Uncomment this in a real application with backend integration
    // checkApprovalStatus();
});