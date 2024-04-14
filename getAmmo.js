document.addEventListener('DOMContentLoaded', () => {
    // Fetch ammo data from the API
    fetch('/api/ammo')
        .then(response => response.json())
        .then(data => {
            // Get the ammo dropdown element
            const ammoDropdown = document.getElementById('ammoDropdown');

            // Populate the ammo dropdown menu with options
            data.forEach(ammo => {
                const option = document.createElement('option');
                option.value = ammo;
                option.textContent = ammo;
                ammoDropdown.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching ammo data:', error);
            // Handle errors if needed
        });
});
