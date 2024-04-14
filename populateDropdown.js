document.addEventListener('DOMContentLoaded', () => {
    // Fetch and populate dropdown menus
    fetchDropdownData('sizeDropdown', '/api/size');
    fetchDropdownData('typeDropdown', '/api/type');
    fetchDropdownData('availabilityDropdown', '/api/availability');
    fetchDropdownData('ammoDropdown', '/api/ammo');
    fetchDropdownData('colorDropdown', '/api/colors');
});

async function fetchDropdownData(dropdownId, url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${dropdownId} data`);
        }
        const data = await response.json();
        populateDropdown(dropdownId, data);
    } catch (error) {
        console.error('Error:', error.message);
        // Handle error
    }
}

function populateDropdown(dropdownId, options) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.innerHTML = ''; // Clear existing options
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        dropdown.appendChild(optionElement);
    });
}