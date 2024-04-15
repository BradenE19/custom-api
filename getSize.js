// Example: getSize.js

document.addEventListener('DOMContentLoaded', () => {
    // Fetch size data from the API
    fetch('/api/size')
        .then(response => response.json())
        .then(data => {
            // Get the size dropdown element
            const sizeDropdown = document.getElementById('sizeDropdown');

            // Populate the size dropdown menu with size options
            data.forEach(size => {
                const option = document.createElement('option');
                option.value = size;
                option.textContent = size;
                sizeDropdown.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching size data:', error);
            // Handle errors if needed
        });
});
