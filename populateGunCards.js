// populateGunCards.js

document.addEventListener('DOMContentLoaded', () => {
    // Fetch gun data from the API
    fetch('/api/guns')
        .then(response => response.json())
        .then(data => {
            // Get the gun cards container element
            const gunCardsContainer = document.querySelector('.gun-cards-container');

            // Iterate over each gun object in the data
            data.forEach(gun => {
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
                            <p class="card-text">Color: ${gun.color}</p>
                            <p class="card-text">Availability: ${gun.availability}</p>
                            <p class="card-text">Price: ${gun.price}</p>
                            <!-- Add more information as needed -->
                        </div>
                    </div>
                `;

                // Append the gun card to the gun cards container
                gunCardsContainer.appendChild(gunCard);
            });
        })
        .catch(error => {
            console.error('Error fetching gun data:', error);
            // Handle errors if needed
        });
});
