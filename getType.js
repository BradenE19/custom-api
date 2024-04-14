document.addEventListener('DOMContentLoaded', () => {
    // Fetch type data from the API
    fetch('/api/type')
        .then(response => response.json())
        .then(data => {
            // Get the type dropdown element
            const typeDropdown = document.getElementById('typeDropdown');

            // Populate the type dropdown menu with options
            data.forEach(type => {
                const option = document.createElement('option');
                option.value = type;
                option.textContent = type;
                typeDropdown.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching type data:', error);
            // Handle errors if needed
        });
});
