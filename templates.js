
// ==================================
// STEP 1: STORE PROMPT TEMPLATES
// ==================================

const templates = [

    {
        id: 1,
        title: "Professional Portrait",
        category: "Portrait",
        prompt: "Create a professional portrait of a person with studio lighting, realistic skin texture and a clean background."
    },

    {
        id: 2,
        title: "Fantasy Character",
        category: "Fantasy",
        prompt: "Create a magical fantasy character wearing detailed armor, standing in an enchanted kingdom."
    },

    {
        id: 3,
        title: "Mountain Landscape",
        category: "Nature",
        prompt: "Create a beautiful mountain landscape with a flowing river, green forests and golden sunlight."
    },

    {
        id: 4,
        title: "Modern Architecture",
        category: "Architecture",
        prompt: "Design a modern luxury house with large glass windows, minimal interiors and beautiful surroundings."
    },

    {
        id: 5,
        title: "Anime Portrait",
        category: "Portrait",
        prompt: "Create an anime-style portrait with expressive eyes, detailed hair and beautiful soft lighting."
    },

    {
        id: 6,
        title: "Magical Forest",
        category: "Fantasy",
        prompt: "Create an enchanted forest with glowing plants, magical lights and a mysterious atmosphere."
    }

];


// ==================================
// STEP 2: GET HTML ELEMENTS
// ==================================

const templateContainer =
    document.getElementById("templateContainer");

const searchInput =
    document.getElementById("searchInput");

const categoryButtons =
    document.querySelectorAll(".category-btn");

const noResults =
    document.getElementById("noResults");


// Currently selected category

let selectedCategory = "All";


// ==================================
// STEP 3: DISPLAY TEMPLATES
// ==================================

function displayTemplates() {

    // Remove previous cards

    templateContainer.innerHTML = "";

    // Get search text

    const searchText = searchInput.value.toLowerCase();


    // Filter templates

    const filteredTemplates = templates.filter(function(template) {

        const matchesSearch =
            template.title.toLowerCase().includes(searchText) ||
            template.prompt.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "All" ||
            template.category === selectedCategory;

        return matchesSearch && matchesCategory;

    });


    // Show message if no results

    if (filteredTemplates.length === 0) {

        noResults.style.display = "block";

        return;

    }

    noResults.style.display = "none";


    // Create cards

    filteredTemplates.forEach(function(template) {

        const card = document.createElement("div");

        card.classList.add("template-card");


        const title = document.createElement("h3");

        title.textContent = template.title;


        const category = document.createElement("span");

        category.classList.add("category");

        category.textContent = template.category;


        const prompt = document.createElement("p");

        prompt.classList.add("prompt-text");

        prompt.textContent = template.prompt;


        // Buttons

        const actions = document.createElement("div");

        actions.classList.add("card-actions");


        const copyButton = document.createElement("button");

        copyButton.textContent = "Copy Prompt";

        copyButton.classList.add("copy-btn");


        const useButton = document.createElement("button");

        useButton.textContent = "Use Prompt";

        useButton.classList.add("use-btn");


        // Copy prompt

        copyButton.addEventListener("click", async function() {

            try {

                await navigator.clipboard.writeText(template.prompt);

                copyButton.textContent = "Copied!";

            } catch (error) {

                copyButton.textContent = "Copy failed";

            }

        });


        // Send prompt to Image Generation

        useButton.addEventListener("click", function() {

            localStorage.setItem("selectedPrompt", template.prompt);

            window.location.href = "generation.html";

        });


        // Add elements to card

        actions.appendChild(copyButton);

        actions.appendChild(useButton);

        card.appendChild(title);

        card.appendChild(category);

        card.appendChild(prompt);

        card.appendChild(actions);


        // Add card to page

        templateContainer.appendChild(card);

    });

}


// ==================================
// STEP 4: SEARCH PROMPTS
// ==================================

searchInput.addEventListener("input", function() {

    displayTemplates();

});


// ==================================
// STEP 5: FILTER CATEGORIES
// ==================================

categoryButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // Remove active class from all buttons

        categoryButtons.forEach(function(item) {

            item.classList.remove("active");

        });


        // Activate clicked button

        button.classList.add("active");


        // Update selected category

        selectedCategory = button.dataset.category;


        // Display matching templates

        displayTemplates();

    });

});


// ==================================
// STEP 6: INITIAL DISPLAY
// ==================================

displayTemplates();
