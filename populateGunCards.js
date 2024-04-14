document.addEventListener('DOMContentLoaded', () => {
    // Fetch gun data from the API
    fetch('/api/guns')
        .then(response => response.json())
        .then(data => {
            // Get the gun cards container element
            const gunCardsContainer = document.getElementById('gunCardsContainer');

            // Populate the gun cards initially with all guns
            displayFilteredGuns(data);
        })
        .catch(error => {
            console.error('Error fetching gun data:', error);
            // Handle errors if needed
        });

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
    console.log('Dropdown changed');
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

function createGunCard(gun) {
    // Create a new gun card element
    const gunCard = document.createElement('div');
    gunCard.classList.add('col-md-4', 'mb-4');

    // Populate the gun card with gun information
    gunCard.innerHTML = `
        <div class="card">
            <img src="${gun.gun_image}" class="card-img-top" alt="Gun Image">
            <div class="card-body">
                <h5 class="card-title">${gun.gun_name}</h5>
                <p class="card-text">${gun.description}</p>
                <p class="card-text">Colors: ${gun.colors}</p>
                <p class="card-text">Availability: ${gun.availability}</p>
                <p class="card-text">Price: ${gun.price}</p>
                <!-- Add more information as needed -->
            </div>
        </div>
    `;

    return gunCard;
}
