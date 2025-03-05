// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set default date values
    setDefaultDates();
    
    // Form submission handler
    const form = document.getElementById('hvacPermitForm');
    form.addEventListener('submit', handleFormSubmit);
    
    // Show/hide permit reference field based on "other permit" radio selection
    const otherPermitRadios = document.querySelectorAll('input[name="otherPermit"]');
    otherPermitRadios.forEach(radio => {
        radio.addEventListener('change', togglePermitRefVisibility);
    });
    
    // Initialize permit reference visibility
    togglePermitRefVisibility();
});

/**
 * Sets default date values for the form
 */
function setDefaultDates() {
    const today = new Date();
    
    // Format date for the request date field
    const requestDateField = document.getElementById('requestDate');
    if (requestDateField) {
        requestDateField.valueAsDate = today;
    }
    
    // Set default start and end times
    const startTimeField = document.getElementById('startTime');
    const endTimeField = document.getElementById('endTime');
    
    if (startTimeField && endTimeField) {
        // Set start time to now
        const startTime = new Date();
        startTime.setMinutes(Math.ceil(startTime.getMinutes() / 15) * 15); // Round up to nearest 15 min
        startTimeField.value = formatDateTimeLocal(startTime);
        
        // Set end time to 8 hours from now
        const endTime = new Date(startTime);
        endTime.setHours(endTime.getHours() + 8);
        endTimeField.value = formatDateTimeLocal(endTime);
    }
}

/**
 * Formats a Date object for datetime-local input
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string for datetime-local input
 */
function formatDateTimeLocal(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

/**
 * Toggles the visibility of the permit reference field
 */
function togglePermitRefVisibility() {
    const otherPermitValue = document.querySelector('input[name="otherPermit"]:checked')?.value;
    const permitRefContainer = document.querySelector('.permit-ref');
    
    if (permitRefContainer) {
        if (otherPermitValue === 'yes') {
            permitRefContainer.style.display = 'block';
        } else {
            permitRefContainer.style.display = 'none';
        }
    }
}

/**
 * Handles form submission
 * @param {Event} e - The submit event
 */
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Perform validation
    if (validateForm()) {
        // Collect form data
        const formData = collectFormData();
        
        // Here you would typically send the data to a server
        console.log('Form data collected:', formData);
        
        // Show success message
        showSuccessMessage();
    }
}

/**
 * Validates the form fields
 * @returns {boolean} Whether the form is valid
 */
function validateForm() {
    let isValid = true;
    
    // Validate required fields
    const requiredFields = ['permitNumber', 'requestedBy', 'workerName', 'workLocation'];
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field && !field.value.trim()) {
            field.style.borderColor = 'red';
            isValid = false;
        } else if (field) {
            field.style.borderColor = '#ddd';
        }
    });
    
    return isValid;
}

/**
 * Collects all form data into an object
 * @returns {Object} The collected form data
 */
function collectFormData() {
    const formData = {};
    const form = document.getElementById('hvacPermitForm');
    
    // Collect text inputs, selects, and textareas
    const inputs = form.querySelectorAll('input[type="text"], input[type="date"], input[type="datetime-local"], select, textarea');
    inputs.forEach(input => {
        formData[input.id] = input.value;
    });
    
    // Collect radio buttons
    const radioGroups = ['instruction', 'contractors', 'otherPermit', 'escapeRoutes', 
                         'combustible', 'areaCleared', 'gasConnection', 
                         'fireExtinguisher', 'fireRetardant', 'drainInlets'];
    
    radioGroups.forEach(groupName => {
        const selectedRadio = document.querySelector(`input[name="${groupName}"]:checked`);
        formData[groupName] = selectedRadio ? selectedRadio.value : null;
    });
    
    return formData;
}

/**
 * Shows a success message after form submission
 */
function showSuccessMessage() {
    alert('HVAC Work Permit submitted successfully!');
    window.location.href = '/approvalpage/approval.html';
    
    // Optional: Reset form
    // document.getElementById('hvacSPermitForm').reset();
}