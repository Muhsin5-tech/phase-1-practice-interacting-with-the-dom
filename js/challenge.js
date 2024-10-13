// Helper function to convert an iterable into an array
function toArray(iterable) {
    // Check if the input is an array
    if (Array.isArray(iterable)) {
        const newArray = new Array(iterable.length);
        for (let i = 0; i < iterable.length; i++) {
            newArray[i] = iterable[i];
        }
        return newArray; // Return the new array
    }
    return Array.from(iterable); // Convert iterable to an array using Array.from
}

// Initial state for the timer
let isPlaying = true;

// Function to start the timer
function startTimer() {
    return setInterval(function () {
        const counterElement = document.getElementById("counter");
        let currentCount = parseInt(counterElement.innerText);
        counterElement.innerText = currentCount + 1; // Increment the counter
    }, 1000); // Update every second
}

let timerInterval = startTimer(); // Start the timer

// Get references to HTML elements
const minusButton = document.getElementById("minus");
const plusButton = document.getElementById("plus");
const heartButton = document.getElementById("heart");
const pauseButton = document.getElementById("pause");
const commentForm = document.getElementsByTagName("form")[0];

// Event listener for the minus button
minusButton.addEventListener("click", function () {
    const counterElement = document.getElementById("counter");
    let currentCount = parseInt(counterElement.innerText);
    counterElement.innerText = currentCount - 1; // Decrement the counter
});

// Event listener for the plus button
plusButton.addEventListener("click", function () {
    const counterElement = document.getElementById("counter");
    let currentCount = parseInt(counterElement.innerText);
    counterElement.innerText = currentCount + 1; // Increment the counter
});

// Event listener for the heart button
heartButton.addEventListener("click", function () {
    const counterElement = document.getElementById("counter");
    let currentCount = parseInt(counterElement.innerText);
    const likesList = document.querySelector(".likes");
    let existingLikeElement;

    // Check if the count has already been liked
    const existingLikes = toArray(likesList.children).map(function (item) {
        return parseInt(item.dataset.num);
    });

    if (existingLikes.includes(currentCount)) {
        // If already liked, update the like count
        existingLikeElement = document.querySelector(`[data-num="${currentCount}"]`);
        const likeCount = parseInt(existingLikeElement.children[0].innerText);
        existingLikeElement.innerHTML = `${currentCount} has been liked <span>${likeCount + 1}</span> times`;
    } else {
        // If not liked, create a new like entry
        existingLikeElement = document.createElement("li");
        existingLikeElement.setAttribute("data-num", currentCount);
        existingLikeElement.innerHTML = `${currentCount} has been liked <span>1</span> time`;
        likesList.appendChild(existingLikeElement);
    }
});

// Event listener for the pause button
pauseButton.addEventListener("click", function () {
    if (isPlaying) {
        isPlaying = false;
        clearInterval(timerInterval); // Stop the timer
        this.innerText = "resume"; // Change button text to 'resume'
    } else {
        isPlaying = true;
        timerInterval = startTimer(); // Restart the timer
        this.innerText = "pause"; // Change button text to 'pause'
    }

    // Disable/enable other buttons based on the play state
    toArray(document.getElementsByTagName("button")).forEach(function (button) {
        if (button.id !== "pause") {
            button.disabled = !isPlaying;
        }
    });
});

// Event listener for the comment form
commentForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const commentInput = this.children[0];
    const commentText = commentInput.value;
    commentInput.value = ""; // Clear the input field

    const commentsSection = document.querySelector(".comments");
    const commentElement = document.createElement("p");
    commentElement.innerText = commentText; // Set the comment text
    commentsSection.appendChild(commentElement); // Add the comment to the comments section
});
