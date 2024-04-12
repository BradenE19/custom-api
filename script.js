const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const searchResults = document.querySelector('#search-results');

document.addEventListener('DOMContentLoaded', () => {
    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const searchQuery = searchInput.value.trim();
        
        try {
            const response = await fetch(`/search?q=${encodeURIComponent(searchQuery)}`);
            if (!response.ok) {
                throw new Error('Error fetching search results');
            }
            const data = await response.json();
            displaySearchResults(data);
        } catch (error) {
            console.error('Error:', error.message);
            searchResults.innerHTML = 'Error fetching search results';
        }
    });
    
    function displaySearchResults(results) {
        // Clear previous results
        searchResults.innerHTML = '';
    
        // Display new results
        results.forEach((result) => {
            const resultItem = document.createElement('div');
            resultItem.textContent = result.gun_name; // Adjust as per your data structure
            searchResults.appendChild(resultItem);
        });
    }
});