document.addEventListener('DOMContentLoaded', () => {
    // Fetch availability data from the API
    fetch('/api/availability')
        .then(response => response.json())
        .then(data => {
            // Get the availability dropdown element
            const availabilityDropdown = document.getElementById('availabilityDropdown');

            // Populate the availability dropdown menu with options
            data.forEach(availability => {
                const option = document.createElement('option');
                option.value = availability;
                option.textContent = availability;
                availabilityDropdown.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching availability data:', error);
            // Handle errors if needed
        });
});
