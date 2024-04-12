document.addEventListener('DOMContentLoaded', () => {
    const colorDropdownItems = document.querySelectorAll('#colorDropdownButton .dropdown-item');
    colorDropdownItems.forEach(item => {
        item.addEventListener('click', async (event) => {
            const selectedColor = event.target.dataset.color;
            try {
                const response = await fetch(`/api/guns?color=${encodeURIComponent(selectedColor)}`);
                if (!response.ok) {
                    throw new Error('Error fetching filtered guns');
                }
                const data = await response.json();
                displayFilteredGuns(data);
            } catch (error) {
                console.error('Error:', error.message);
                // Handle error
            }
        });
    });
});

function displayFilteredGuns(guns) {
    // Clear existing gun display
    // Then display the filtered guns
}