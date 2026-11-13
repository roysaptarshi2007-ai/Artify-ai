
// ===================================
// STEP 1: GET HTML ELEMENTS
// ===================================

const imageUpload = document.getElementById("imageUpload");

const previewImage = document.getElementById("previewImage");

const uploadMessage = document.getElementById("uploadMessage");

const editPrompt = document.getElementById("editPrompt");

const editArea = document.getElementById("editArea");

const editType = document.getElementById("editType");

const applyEdit = document.getElementById("applyEdit");

const saveProjectBtn = document.getElementById("saveProject");

const statusMessage = document.getElementById("statusMessage");


// Store uploaded image data here

let uploadedImageData = null;


// ===================================
// STEP 2: UPLOAD AN IMAGE
// ===================================

imageUpload.addEventListener("change", function() {

    const file = imageUpload.files[0];

    if (!file) {
        return;
    }

    // Check whether selected file is an image

    if (!file.type.startsWith("image/")) {

        statusMessage.textContent = "Please select an image file.";

        return;
    }

    // Display uploaded image

    const imageURL = URL.createObjectURL(file);

    previewImage.src = imageURL;

    previewImage.style.display = "block";

    uploadMessage.style.display = "none";


    // Read image so it can be stored in localStorage

    const reader = new FileReader();

    reader.onload = function() {

        uploadedImageData = reader.result;

        statusMessage.textContent = "Image uploaded successfully.";

    };

    reader.onerror = function() {

        statusMessage.textContent = "Unable to read this image.";

    };

    reader.readAsDataURL(file);

});


// ===================================
// STEP 3: APPLY EDIT
// ===================================

applyEdit.addEventListener("click", function() {

    const prompt = editPrompt.value.trim();

    // Check whether image is uploaded

    if (!uploadedImageData) {

        statusMessage.textContent = "Please upload an image first.";

        return;
    }

    // Check whether instruction is empty

    if (prompt === "") {

        statusMessage.textContent = "Please enter an editing instruction.";

        return;
    }

    // Get selected editing options

    const selectedArea = editArea.value;

    const selectedType = editType.value;


    // Display demo editing message

    statusMessage.textContent =
        "Demo edit: " + selectedType +
        " on " + selectedArea +
        ". Instruction: " + prompt;

});


// ===================================
// STEP 4: SAVE PROJECT
// ===================================

saveProjectBtn.addEventListener("click", function() {

    // Check whether image is uploaded

    if (!uploadedImageData) {

        statusMessage.textContent = "Please upload an image first.";

        return;
    }


    // Get existing projects from localStorage

    let projects = JSON.parse(localStorage.getItem("myProjects")) || [];


    // Create a new project object

    const newProject = {

        id: Date.now(),

        name: editPrompt.value.trim() || "My Artwork",

        image: uploadedImageData,

        date: new Date().toLocaleDateString()

    };


    // Add new project to projects array

    projects.push(newProject);


    // Save projects in browser storage

    try {

        localStorage.setItem("myProjects", JSON.stringify(projects));

        statusMessage.textContent = "Project saved successfully!";

    }

    catch (error) {

        statusMessage.textContent =
            "Storage is full. Try uploading a smaller image.";

    }

});
