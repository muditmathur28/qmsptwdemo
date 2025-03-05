// Initialize Chart.js chart for permit statistics
document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('permitChart').getContext('2d');
    
    const permitChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: 'Created',
                    data: [12, 15, 10, 18, 14, 8, 5],
                    backgroundColor: '#2e8b57',
                    borderRadius: 5,
                    barThickness: 15,
                },
                {
                    label: 'Approved',
                    data: [8, 10, 7, 15, 12, 6, 3],
                    backgroundColor: '#4caf50',
                    borderRadius: 5,
                    barThickness: 15,
                },
                {
                    label: 'Rejected',
                    data: [2, 3, 1, 2, 0, 1, 0],
                    backgroundColor: '#f44336',
                    borderRadius: 5,
                    barThickness: 15,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        boxWidth: 15,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false,
                    }
                },
                x: {
                    grid: {
                        display: false,
                    }
                }
            }
        }
    });

    // Handle filter options click
    const filterOptions = document.querySelectorAll('.filter-option');
    filterOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            filterOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Update chart data based on filter
            if (this.textContent === 'Monthly') {
                permitChart.data.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                permitChart.data.datasets[0].data = [45, 52, 68, 72, 56, 40];
                permitChart.data.datasets[1].data = [38, 45, 60, 68, 50, 33];
                permitChart.data.datasets[2].data = [5, 3, 7, 2, 4, 2];
            } else {
                permitChart.data.labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                permitChart.data.datasets[0].data = [12, 15, 10, 18, 14, 8, 5];
                permitChart.data.datasets[1].data = [8, 10, 7, 15, 12, 6, 3];
                permitChart.data.datasets[2].data = [2, 3, 1, 2, 0, 1, 0];
            }
            
            permitChart.update();
        });
    });

    // Sidebar menu item click handler
    const menuItems = document.querySelectorAll('.sidebar-menu ul li');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            menuItems.forEach(menuItem => menuItem.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
        });
    });

    // Add hover effect to activity items, permit items, and site items
    const hoverItems = document.querySelectorAll('.activity-item, .permit-item, .site-item');
    hoverItems.forEach(item => {
        item.addEventListener('mouseover', function() {
            this.style.backgroundColor = '#f8f9fa';
        });
