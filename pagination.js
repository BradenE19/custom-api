function changePage(page) {
  let start = (page - 1) * itemsPerPage;
  let end = start + itemsPerPage;
  let displayedGuns = guns.slice(start, end);

  // Clear current gun cards
  let gunCardsContainer = document.getElementById("gunCardsContainer");
  gunCardsContainer.innerHTML = "";

  // Populate gun cards
  displayedGuns.forEach(gun => {
    let card = document.createElement("div");
    card.classList.add("col-md-4");
    card.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${gun.name}</h5>
          <!-- Other gun details here -->
        </div>
      </div>
    `;
    gunCardsContainer.appendChild(card);
  });
}

function populatePagination() {
  let pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    let li = document.createElement("li");
    li.classList.add("page-item");
    
    let a = document.createElement("a");
    a.classList.add("page-link");
    a.href = "#";
    a.innerText = i;
    
    // Add event listener to change page
    a.addEventListener("click", function(event) {
      event.preventDefault();
      changePage(i);
    });
    
    li.appendChild(a);
    pagination.appendChild(li);
  }
}

// Highlight the current page
function highlightCurrentPage(page) {
  let paginationLinks = document.querySelectorAll(".page-link");
  paginationLinks.forEach(link => {
    link.classList.remove("active");
    if (parseInt(link.innerText) === page) {
      link.classList.add("active");
    }
  });
}

async function fetchFilteredGuns() {
  const { size, type, availability, ammo, colors } = getSelectedValues();
  
  try {
    const response = await fetch(`/api/guns?size=${size}&availability=${availability}&type=${type}&ammo=${ammo}&colors=${colors}`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    guns = data; // Update guns array with fetched data
    totalPages = Math.ceil(guns.length / itemsPerPage); // Recalculate total pages
    populatePagination(); // Populate pagination with updated total pages
    changePage(1); // Display first page of gun cards
  } catch (error) {
    console.error('There was a problem fetching the filtered guns data:', error);
  }
}

async function fetchFilteredGuns() {
  const { size, type, availability, ammo, colors } = getSelectedValues();
  
  try {
    const response = await fetch(`/api/guns?size=${size}&availability=${availability}&type=${type}&ammo=${ammo}&colors=${colors}`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    guns = data; // Update guns array with fetched data
    totalPages = Math.ceil(guns.length / itemsPerPage); // Recalculate total pages
    populatePagination(); // Populate pagination with updated total pages
    changePage(1); // Display first page of gun cards
  } catch (error) {
    console.error('There was a problem fetching the filtered guns data:', error);
  }
}

// Event listener for dropdown changes
document.getElementById("sizeDropdown").addEventListener("change", function() {
  fetchFilteredGuns();
  highlightCurrentPage(1);
});
document.getElementById("typeDropdown").addEventListener("change", function() {
  fetchFilteredGuns();
  highlightCurrentPage(1);
});
document.getElementById("availabilityDropdown").addEventListener("change", function() {
  fetchFilteredGuns();
  highlightCurrentPage(1);
});
document.getElementById("ammoDropdown").addEventListener("change", function() {
  fetchFilteredGuns();
  highlightCurrentPage(1);
});
document.getElementById("colorDropdown").addEventListener("change", function() {
  fetchFilteredGuns();
  highlightCurrentPage(1);
});
