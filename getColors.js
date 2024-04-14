document.addEventListener('DOMContentLoaded', () => {
    // Fetch gun data from the server
    fetch('/api/guns')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch gun data');
            }
            return response.json();
        })
        .then(data => {
            // Process the gun data and update the DOM
            data.forEach(gun => {
                const gunCard = createGunCard(gun);
                document.querySelector('.gun-cards-container').appendChild(gunCard);
            });
        })
        .catch(error => {
            console.error('Error fetching gun data:', error);
        });
});

// Function to create a gun card element
function createGunCard(gun) {
    const gunCard = document.createElement('div');
    gunCard.classList.add('guncard', 'container', 'row');

    const gunImageContainer = document.createElement('div');
    gunImageContainer.classList.add('gunimage', 'leftsideofcard');
    const gunImage = document.createElement('img');
    gunImage.src = gun.gun_img;
    gunImage.alt = gun.gun_name;
    gunImageContainer.appendChild(gunImage);
    gunCard.appendChild(gunImageContainer);

    const gunInfoContainer = document.createElement('div');
    gunInfoContainer.classList.add('rightsideofcard', 'column', 'info');
    const nameDescriptionDiv = document.createElement('div');
    const colorAvailabilityAmmoPriceDiv = document.createElement('div');

    const gunName = document.createElement('p');
    gunName.textContent = gun.gun_name;
    const description = document.createElement('p');
    description.textContent = gun.description;

    const color = document.createElement('p');
    color.textContent = `Color: ${gun.colors}`;
    const availability = document.createElement('p');
    availability.textContent = `Availability: ${gun.availability}`;
    const ammo = document.createElement('p');
    ammo.textContent = `Ammo: ${gun.ammo}`;
    const price = document.createElement('p');
    price.textContent = `Price: ${gun.price}`;

    nameDescriptionDiv.appendChild(gunName);
    nameDescriptionDiv.appendChild(description);
    colorAvailabilityAmmoPriceDiv.appendChild(color);
    colorAvailabilityAmmoPriceDiv.appendChild(availability);
    colorAvailabilityAmmoPriceDiv.appendChild(ammo);
    colorAvailabilityAmmoPriceDiv.appendChild(price);

    gunInfoContainer.appendChild(nameDescriptionDiv);
    gunInfoContainer.appendChild(colorAvailabilityAmmoPriceDiv);
    gunCard.appendChild(gunInfoContainer);

    return gunCard;
}
