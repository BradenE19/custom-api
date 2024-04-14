document.addEventListener('DOMContentLoaded', () => {
    // Fetch colors data from the server
    fetch('/api/colors')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch colors data');
            }
            return response.json();
        })
        .then(data => {
            // Process the colors data and update the DOM
            data.forEach(color => {
                const colorOption = createColorOption(color);
                document.querySelector('.color-dropdown').appendChild(colorOption);
            });
        })
        .catch(error => {
            console.error('Error fetching colors data:', error);
        });
});

function createColorOption(color) {
    const option = document.createElement('option');
    option.value = color;
    option.textContent = color;
    return option;
}
