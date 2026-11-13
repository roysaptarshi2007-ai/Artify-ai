
// ======================================
// STEP 1: GET HTML ELEMENTS
// ======================================

const favoritesContainer =
    document.getElementById("favoritesContainer");

const favoriteCount =
    document.getElementById("favoriteCount");

const emptyMessage =
    document.getElementById("emptyMessage");

const filterButtons =
    document.querySelectorAll(".filter-btn");


// ======================================
// STEP 2: GET SAVED FAVORITES
// ======================================

let favorites =
    JSON.parse(localStorage.getItem("favoritePrompts")) || [];

let selectedCategory = "All";


// ======================================
// STEP 3: SAVE FAVORITES
// ======================================

function saveFavorites() {

    localStorage.setItem(
        "favoritePrompts",
        JSON.stringify(favorites)
    );

}


// ======================================
// STEP 4: DISPLAY FAVORITES
// ======================================

function displayFavorites() {

    favoritesContainer.innerHTML = "";

    // Update total count
    favoriteCount.textContent =
        favorites.length +
        (favorites.length === 1 ? " prompt saved" : " prompts saved");


    // Show empty message if there are no favorites
    if (favorites.length === 0) {

        emptyMessage.style.display = "block";
        return;

    } else {

        emptyMessage.style.display = "none";

    }


    // Filter favorites by category
    const filteredFavorites = favorites.filter(function(item) {

        return selectedCategory === "All" ||
            item.category === selectedCategory;

    });


    // Create a card for each favorite
    filteredFavorites.forEach(function(item) {

        const card = document.createElement("div");
        card.className = "favorite-card";


        // Prompt title
        const title = document.createElement("h3");
        title.textContent = item.title;


        // Category
        const category = document.createElement("span");
        category.className = "favorite-category";
        category.textContent = item.category;


        // Prompt description
        const prompt = document.createElement("p");
        prompt.className = "favorite-prompt";
        prompt.textContent = item.prompt;


        // Buttons container
        const actions = document.createElement("div");
        actions.className = "favorite-actions";


        // COPY BUTTON
        const copyButton = document.createElement("button");
        copyButton.textContent = "Copy Prompt";

        copyButton.addEventListener("click", async function() {

            try {

                await navigator.clipboard.writeText(item.prompt);
                copyButton.textContent = "Copied!";

            } catch (error) {

                copyButton.textContent = "Copy failed";

            }

        });


        // USE PROMPT BUTTON
        const useButton = document.createElement("button");
        useButton.textContent = "Use Prompt";

        useButton.addEventListener("click", function() {

            localStorage.setItem(
                "selectedPrompt",
                item.prompt
            );

            window.location.href = "generation.html";

        });


        // REMOVE BUTTON
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className = "remove-btn";

        removeButton.addEventListener("click", function() {

            favorites = favorites.filter(function(favorite) {

                return favorite.id !== item.id;

            });

            saveFavorites();

            displayFavorites();

        });


        // Add buttons to container
        actions.append(
            copyButton,
            useButton,
            removeButton
        );


        // Add all elements to card
        card.append(
            title,
            category,
            prompt,
            actions
        );


        // Add card to page
        favoritesContainer.appendChild(card);

    });

}


// ======================================
// STEP 5: FILTER BY CATEGORY
// ======================================

filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // Remove active class from all buttons
        filterButtons.forEach(function(btn) {

            btn.classList.remove("active");

        });


        // Activate clicked button
        button.classList.add("active");


        // Get selected category
        selectedCategory = button.dataset.category;


        // Display filtered favorites
        displayFavorites();

    });

});


// ======================================
// STEP 6: INITIAL DISPLAY
// ======================================

displayFavorites();
