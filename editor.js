
// Get HTML elements

const imageUpload = document.getElementById("imageUpload");

const previewImage = document.getElementById("previewImage");

const uploadMessage = document.getElementById("uploadMessage");

const editPrompt = document.getElementById("editPrompt");

const editArea = document.getElementById("editArea");

const editType = document.getElementById("editType");

const applyEdit = document.getElementById("applyEdit");

const statusMessage = document.getElementById("statusMessage");


// Step 1: Upload an image

imageUpload.addEventListener("change", function() {

    const file = imageUpload.files[0];

    if (!file) {
        return;
    }

    // Check whether the selected file is an image
    if (!file.type.startsWith("image/")) {
        statusMessage.textContent = "Please select an image file.";
        return;
    }

    // Convert uploaded file into a browser-readable URL
    const imageURL = URL.createObjectURL(file);

    // Display image
    previewImage.src = imageURL;

    previewImage.style.display = "block";

    uploadMessage.style.display = "none";

    statusMessage.textContent = "Image uploaded successfully.";

});


// Step 2: Apply editing instruction

applyEdit.addEventListener("click", function() {

    // Read user's instruction
    const prompt = editPrompt.value.trim();

    // Check if image is uploaded
    if (!previewImage.src || previewImage.style.display === "none") {
        statusMessage.textContent = "Please upload an image first.";
        return;
    }

    // Check if instruction is empty
    if (prompt === "") {
        statusMessage.textContent = "Please enter an editing instruction.";
        return;
    }

    // Get selected options
    const selectedArea = editArea.value;

    const selectedType = editType.value;

    // Show demo message
    statusMessage.textContent =
        "Demo edit: " + selectedType + " on " + selectedArea +
        ". Instruction: " + prompt;

});
