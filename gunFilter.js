document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners to dropdown menus
    document.getElementById('sizeDropdown').addEventListener('change', handleDropdownChange);
    document.getElementById('availabilityDropdown').addEventListener('change', handleDropdownChange);
    document.getElementById('typeDropdown').addEventListener('change', handleDropdownChange);
    document.getElementById('ammoDropdown').addEventListener('change', handleDropdownChange);
    document.getElementById('colorDropdown').addEventListener('change', handleDropdownChange);
});

async function handleDropdownChange() {
    // Fetch filtered data from the server based on selected options
    const size = document.getElementById('sizeDropdown').value;
    const availability = document.getElementById('availabilityDropdown').value;
    const type = document.getElementById('typeDropdown').value;
    const ammo = document.getElementById('ammoDropdown').value;
    const colors = document.getElementById('colorDropdown').value;

    try {
        const response = await fetch(`/api/guns?size=${size}&availability=${availability}&type=${type}&ammo=${ammo}&colors=${colors}`);
        if (!response.ok) {
            throw new Error('Error fetching filtered guns');
        }
        const data = await response.json();
        displayFilteredGuns(data);
    } catch (error) {
        console.error('Error:', error.message);
        // Handle error
    }
}

function displayFilteredGuns(guns) {
    // Clear existing gun display
    const gunCardsContainer = document.getElementById('gunCardsContainer');
    gunCardsContainer.innerHTML = '';

    // Display the filtered guns
    guns.forEach(gun => {
        const gunCard = createGunCard(gun);
        gunCardsContainer.appendChild(gunCard);
    });
}
