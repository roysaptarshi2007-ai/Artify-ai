
// Access HTML elements

const promptInput = document.getElementById("promptInput");
const artStyle = document.getElementById("artStyle");
const aspectRatio = document.getElementById("aspectRatio");
const imageCount = document.getElementById("imageCount");

const generateBtn = document.getElementById("generateBtn");
const imageContainer = document.getElementById("imageContainer");
const loading = document.getElementById("loading");
const charCount = document.getElementById("charCount");


// Character counter

promptInput.addEventListener("input", function () {

    charCount.textContent =
        promptInput.value.length + " characters";

});


// Generate button

generateBtn.addEventListener("click", function () {

    const prompt = promptInput.value.trim();

    if (prompt === "") {
        alert("Please describe your artwork first.");
        return;
    }

    // Read selected settings

    const selectedStyle = artStyle.value;
    const selectedRatio = aspectRatio.value;
    const totalImages = Number(imageCount.value);


    // Show loading

    loading.classList.remove("hidden");

    generateBtn.disabled = true;
    generateBtn.textContent = "Generating...";


    // Clear old results

    imageContainer.innerHTML = "";


    // Simulate generation delay

    setTimeout(function () {

        const gradients = [
            "linear-gradient(135deg, #312e81, #9333ea, #f472b6)",
            "linear-gradient(135deg, #064e3b, #0d9488, #67e8f9)",
            "linear-gradient(135deg, #7c2d12, #ea580c, #facc15)",
            "linear-gradient(135deg, #581c87, #be185d, #fb7185)"
        ];


        // Create selected number of cards

        for (let i = 0; i < totalImages; i++) {

            const card = document.createElement("div");
            card.classList.add("art-card");


            const preview = document.createElement("div");
            preview.classList.add("art-preview");

            preview.style.background =
                gradients[i % gradients.length];


            const artworkText = document.createElement("span");

            artworkText.textContent =
                selectedStyle + " Artwork";


            preview.appendChild(artworkText);


            const details = document.createElement("p");

            details.textContent =
                "Style: " + selectedStyle +
                " | Ratio: " + selectedRatio;


            const downloadBtn = document.createElement("button");

            downloadBtn.textContent = "Download Sample";

            downloadBtn.classList.add("download-btn");


            downloadBtn.addEventListener("click", function () {

                downloadArtwork(selectedStyle, i);

            });


            // Add elements to card

            card.appendChild(preview);
            card.appendChild(details);
            card.appendChild(downloadBtn);


            // Add card to image container

            imageContainer.appendChild(card);

        }


        // Finish loading

        loading.classList.add("hidden");

        generateBtn.disabled = false;

        generateBtn.textContent = "Generate Artwork";


    }, 1500);

});


// Download sample artwork

function downloadArtwork(style, index) {

    const canvas = document.createElement("canvas");

    canvas.width = 800;
    canvas.height = 600;

    const ctx = canvas.getContext("2d");


    // Create gradient

    const gradient = ctx.createLinearGradient(
        0, 0, 800, 600
    );

    gradient.addColorStop(0, "#312e81");
    gradient.addColorStop(0.5, "#9333ea");
    gradient.addColorStop(1, "#f472b6");


    // Draw background

    ctx.fillStyle = gradient;

    ctx.fillRect(0, 0, 800, 600);


    // Draw artwork title

    ctx.fillStyle = "white";

    ctx.font = "bold 45px Arial";

    ctx.textAlign = "center";

    ctx.fillText(style + " Artwork", 400, 300);


    // Create download link

    const link = document.createElement("a");

    link.download = "artwork-" + (index + 1) + ".png";

    link.href = canvas.toDataURL("image/png");

    link.click();

}
