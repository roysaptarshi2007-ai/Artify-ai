
// ======================================
// STEP 1: GET HTML ELEMENTS
// ======================================

const postForm = document.getElementById("postForm");
const postTitle = document.getElementById("postTitle");
const postDescription = document.getElementById("postDescription");
const postCategory = document.getElementById("postCategory");
const postImage = document.getElementById("postImage");

const postsContainer = document.getElementById("postsContainer");
const emptyMessage = document.getElementById("emptyMessage");
const postCount = document.getElementById("postCount");
const formMessage = document.getElementById("formMessage");
const imageName = document.getElementById("imageName");


// ======================================
// STEP 2: GET SAVED POSTS
// ======================================

let posts = JSON.parse(localStorage.getItem("communityPosts")) || [];


// ======================================
// STEP 3: SAVE POSTS TO LOCAL STORAGE
// ======================================

function savePosts() {
    localStorage.setItem("communityPosts", JSON.stringify(posts));
}


// ======================================
// STEP 4: CREATE A NEW POST
// ======================================

postImage.addEventListener("change", function() {
    const file = postImage.files[0];

    if (file) {
        imageName.textContent = "Selected: " + file.name;
    } else {
        imageName.textContent = "";
    }
});


postForm.addEventListener("submit", function(event) {

    // Stop the page from refreshing
    event.preventDefault();

    const title = postTitle.value.trim();
    const description = postDescription.value.trim();
    const category = postCategory.value;
    const file = postImage.files[0];

    if (!file) {
        formMessage.textContent = "Please select an image.";
        return;
    }

    if (!file.type.startsWith("image/")) {
        formMessage.textContent = "Please select a valid image.";
        return;
    }

    // Keep uploaded images small for this demo
    if (file.size > 2 * 1024 * 1024) {
        formMessage.textContent = "Please upload an image smaller than 2 MB.";
        return;
    }

    // Convert image into a format localStorage can store
    const reader = new FileReader();

    reader.onload = function() {

        const newPost = {
            id: Date.now(),
            title: title,
            description: description,
            category: category,
            image: reader.result,
            date: new Date().toLocaleDateString(),
            likes: 0,
            liked: false,
            comments: []
        };

        // Add the new post to the beginning of the array
        posts.unshift(newPost);

        savePosts();
        displayPosts();

        // Clear the form
        postForm.reset();
        imageName.textContent = "";
        formMessage.textContent = "Your artwork has been shared!";

    };

    reader.onerror = function() {
        formMessage.textContent = "Could not read the selected image.";
    };

    reader.readAsDataURL(file);

});


// ======================================
// STEP 5: DISPLAY ALL POSTS
// ======================================

function displayPosts() {

    // Remove old cards before displaying updated ones
    postsContainer.innerHTML = "";

    postCount.textContent =
        posts.length + (posts.length === 1 ? " post" : " posts");

    if (posts.length === 0) {
        emptyMessage.style.display = "block";
        return;
    }

    emptyMessage.style.display = "none";

    posts.forEach(function(post) {

        // Main card
        const card = document.createElement("article");
        card.className = "post-card";

        // Artwork image
        const image = document.createElement("img");
        image.className = "post-image";
        image.src = post.image;
        image.alt = post.title;

        // Details section
        const details = document.createElement("div");
        details.className = "post-details";

        // Category
        const category = document.createElement("span");
        category.className = "post-category";
        category.textContent = post.category;

        // Title
        const title = document.createElement("h3");
        title.textContent = post.title;

        // Description
        const description = document.createElement("p");
        description.className = "post-description";
        description.textContent = post.description;

        // Date
        const date = document.createElement("p");
        date.className = "post-date";
        date.textContent = "Shared on " + post.date;

        // Buttons
        const actions = document.createElement("div");
        actions.className = "post-actions";

        const likeButton = document.createElement("button");
        likeButton.textContent =
            (post.liked ? "♥ " : "♡ ") + post.likes + " Likes";
        likeButton.dataset.action = "like";
        likeButton.dataset.id = post.id;

        const commentButton = document.createElement("button");
        commentButton.textContent = "Comments (" + post.comments.length + ")";
        commentButton.dataset.action = "toggle-comments";
        commentButton.dataset.id = post.id;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.dataset.action = "delete";
        deleteButton.dataset.id = post.id;

        actions.append(likeButton, commentButton, deleteButton);

        // Comments section
        const commentsArea = document.createElement("div");
        commentsArea.className = "comments-area";

        const commentList = document.createElement("div");
        commentList.className = "comment-list";

        post.comments.forEach(function(comment) {
            const commentItem = document.createElement("p");
            commentItem.className = "comment-item";
            commentItem.textContent = comment;
            commentList.appendChild(commentItem);
        });

        const commentForm = document.createElement("form");
        commentForm.className = "comment-form";

        const commentInput = document.createElement("input");
        commentInput.type = "text";
        commentInput.placeholder = "Write a comment...";
        commentInput.required = true;

        const commentSubmit = document.createElement("button");
        commentSubmit.type = "submit";
        commentSubmit.textContent = "Send";

        commentForm.append(commentInput, commentSubmit);

        commentsArea.append(commentList, commentForm);

        // Add everything to the card
        details.append(
            category,
            title,
            description,
            date,
            actions,
            commentsArea
        );

        card.append(image, details);

        postsContainer.appendChild(card);

    });
}


// ======================================
// STEP 6: HANDLE LIKE AND DELETE BUTTONS
// ======================================

postsContainer.addEventListener("click", function(event) {

    const button = event.target.closest("button");

    if (!button) {
        return;
    }

    const action = button.dataset.action;
    const postId = Number(button.dataset.id);

    const post = posts.find(function(item) {
        return item.id === postId;
    });

    if (!post) {
        return;
    }

    // LIKE BUTTON
    if (action === "like") {

        if (post.liked) {
            post.likes--;
            post.liked = false;
        } else {
            post.likes++;
            post.liked = true;
        }

    }

    // DELETE BUTTON
    if (action === "delete") {

        posts = posts.filter(function(item) {
            return item.id !== postId;
        });

    }

    // Show or hide comments
    if (action === "toggle-comments") {

        const card = button.closest(".post-card");
        const commentsArea = card.querySelector(".comments-area");

        if (commentsArea.style.display === "none") {
            commentsArea.style.display = "block";
        } else {
            commentsArea.style.display = "none";
        }

        return;
    }

    savePosts();
    displayPosts();

});


// ======================================
// STEP 7: HANDLE COMMENTS
// ======================================

postsContainer.addEventListener("submit", function(event) {

    if (!event.target.classList.contains("comment-form")) {
        return;
    }

    event.preventDefault();

    const form = event.target;
    const card = form.closest(".post-card");

    const commentInput = form.querySelector("input");
    const comment = commentInput.value.trim();

    if (comment === "") {
        return;
    }

    // Find which post this comment belongs to
    const commentButton = card.querySelector(
        '[data-action="toggle-comments"]'
    );

    const postId = Number(commentButton.dataset.id);

    const post = posts.find(function(item) {
        return item.id === postId;
    });

    if (!post) {
        return;
    }

    post.comments.push(comment);

    savePosts();
    displayPosts();

});


// ======================================
// STEP 8: INITIAL DISPLAY
// ======================================

displayPosts();
