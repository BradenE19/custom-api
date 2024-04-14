document.addEventListener('DOMContentLoaded', () => {
    // Fetch data for dropdown menus from the server
    fetchDropdownData('/api/size', 'sizeDropdown');
    fetchDropdownData('/api/type', 'typeDropdown');
    fetchDropdownData('/api/availability', 'availabilityDropdown');
    fetchDropdownData('/api/ammo', 'ammoDropdown');
    fetchDropdownData('/api/colors', 'colorDropdown');
});

async function fetchDropdownData(url, dropdownId) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${dropdownId} data`);
        }
        const data = await response.json();
        populateDropdown(data, dropdownId);
    } catch (error) {
        console.error('Error:', error.message);
        // Handle error if needed
    }
}

function populateDropdown(data, dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        dropdown.appendChild(option);
    });
}
