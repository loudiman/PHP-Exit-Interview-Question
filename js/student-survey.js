// Handle rating selection with the option to unselect
document.getElementById("ratingContainer").addEventListener("click", function(e) {
    if (e.target.tagName === "IMG") {
        const selectedStar = e.target;
        const allStars = document.querySelectorAll(".rating-item img");

        // Check if the clicked star is already selected
        const isSelected = selectedStar.src.includes("RatingAfter.png");

        // Reset all stars to unselected state if clicking an unselected star
        if (!isSelected) {
            allStars.forEach(star => {
                star.src = "../resource/images/RatingBefore.png";
            });
            selectedStar.src = "../resource/images/RatingAfter.png"; // Select clicked star
        } else {
            selectedStar.src = "../resource/images/RatingBefore.png"; // Unselect clicked star
        }
    }
});

// Handle checklist selection with the option to select multiple and toggle selection
document.getElementById("checklistContainer").addEventListener("click", function(e) {
    if (e.target.classList.contains("checkbox-icon")) {
        const isChecked = e.target.src.includes("Checked_Checkbox.png");

        // Toggle checkbox state: if checked, uncheck it; if unchecked, check it
        e.target.src = isChecked ? "../resource/images/Checkbox.png" : "../resource/images/Checked_Checkbox.png";
    }
});

// Clear placeholder on focus in answer input
document.querySelector(".answer-input").addEventListener("focus", function(e) {
    e.target.placeholder = "";
});

// Restore placeholder on blur if input is empty
document.querySelector(".answer-input").addEventListener("blur", function(e) {
    if (e.target.value === "") {
        e.target.placeholder = "Your Answer...";
    }
});

// Back button functionality
document.getElementById("backButton").addEventListener("click", () => {
    window.history.back();
});

// Submit button functionality
document.getElementById("submitButton").addEventListener("click", () => {
    alert("Survey Submitted!");
    window.history.back();
});

window.onload = function() {
    // Answer Input Section
    const answerInputDiv = document.querySelectorAll('.survey-template')[0]; // First survey-template div
    const answerInputHTML = `
        <div class="survey-template-header">Sample Question</div>
        <div class="survey-template-content">
            <input type="text" class="answer-input" placeholder="Your Answer...">
        </div>
    `;
    answerInputDiv.innerHTML = answerInputHTML; // Insert the HTML into the first div

    // Rating Section
    const ratingDiv = document.querySelectorAll('.survey-template')[1]; // Second survey-template div
    const ratingHTML = `
        <div class="survey-template-header">Sample Rating</div>
        <div class="survey-template-content">
            <div class="rating-container" id="ratingContainer">
                <div class="rating-item" data-rating="1">
                    <span>1</span>
                    <img src="../resource/images/RatingBefore.png" alt="Star 1">
                </div>
                <div class="rating-item" data-rating="2">
                    <span>2</span>
                    <img src="../resource/images/RatingBefore.png" alt="Star 2">
                </div>
                <div class="rating-item" data-rating="3">
                    <span>3</span>
                    <img src="../resource/images/RatingBefore.png" alt="Star 3">
                </div>
                <div class="rating-item" data-rating="4">
                    <span>4</span>
                    <img src="../resource/images/RatingBefore.png" alt="Star 4">
                </div>
                <div class="rating-item" data-rating="5">
                    <span>5</span>
                    <img src="../resource/images/RatingBefore.png" alt="Star 5">
                </div>
            </div>
        </div>
    `;
    ratingDiv.innerHTML = ratingHTML; // Insert the HTML into the second div

    // Checklist Section
    const checklistDiv = document.querySelectorAll('.survey-template')[2]; // Third survey-template div
    const checklistHTML = `
        <div class="survey-template-header">Sample Checklist</div>
        <div class="survey-template-content">
            <div class="checklist-container" id="checklistContainer">
                <div class="checklist-item" data-checklist="1">
                    <img src="../resource/images/Checkbox.png" alt="Checkbox 1" class="checkbox-icon">
                    <span>Option 1</span>
                </div>
                <div class="checklist-item" data-checklist="2">
                    <img src="../resource/images/Checkbox.png" alt="Checkbox 2" class="checkbox-icon">
                    <span>Option 2</span>
                </div>
                <div class="checklist-item" data-checklist="3">
                    <img src="../resource/images/Checkbox.png" alt="Checkbox 3" class="checkbox-icon">
                    <span>Option 3</span>
                </div>
                <div class="checklist-item" data-checklist="4">
                    <img src="../resource/images/Checkbox.png" alt="Checkbox 4" class="checkbox-icon">
                    <span>Option 4</span>
                </div>
                <div class="checklist-item" data-checklist="5">
                    <img src="../resource/images/Checkbox.png" alt="Checkbox 5" class="checkbox-icon">
                    <span>Option 5</span>
                </div>
            </div>
        </div>
    `;
    checklistDiv.innerHTML = checklistHTML; // Insert the HTML into the third div
};
