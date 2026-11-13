
const searchInput =
    document.getElementById("searchInput");

const projectCards =
    document.querySelectorAll(".project-card");

searchInput.addEventListener("input", function() {

    const searchValue =
        searchInput.value.toLowerCase();

    projectCards.forEach(function(card) {

        const projectName =
            card.querySelector("h3")
            .textContent.toLowerCase();

        if (projectName.includes(searchValue)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});
