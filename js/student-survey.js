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
    const surveyResponses = {
        survey_id: 1, // Replace with the actual survey_id if needed
        response_json: []
    };

    // Collect answers from each question type
    document.querySelectorAll('.survey-template').forEach((template, index) => {
        const questionId = index + 1; // Use a unique identifier for each question

        if (template.querySelector('.rating-container')) {
            // Collect rating answer
            const selectedRating = template.querySelector('.rating-item img[src*="RatingAfter.png"]');
            if (selectedRating) {
                surveyResponses.response_json.push({
                    question_id: questionId,
                    rating: parseInt(selectedRating.closest('.rating-item').dataset.rating)
                });
            }
        } else if (template.querySelector('.checklist-container')) {
            // Collect multiple-choice answers
            const selectedOptions = [];
            template.querySelectorAll('.checkbox-icon[src*="Checked_Checkbox.png"]').forEach(selected => {
                selectedOptions.push(selected.nextElementSibling.innerText);
            });
            surveyResponses.response_json.push({
                question_id: questionId,
                answer: selectedOptions
            });
        } else if (template.querySelector('.answer-input')) {
            // Collect text input answer
            const textAnswer = template.querySelector('.answer-input').value;
            surveyResponses.response_json.push({
                question_id: questionId,
                answer: textAnswer
            });
        } else if (template.querySelector('.true-false-container')) {
            // Collect true/false answer
            const trueFalseAnswer = template.querySelector('input[type="radio"]:checked');
            if (trueFalseAnswer) {
                surveyResponses.response_json.push({
                    question_id: questionId,
                    answer: trueFalseAnswer.value
                });
            }
        }
    });

    // Send the survey response JSON to the server
    fetch('http://localhost:8888/student/surveyid', { // Update with actual server endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(surveyResponses)
    })
        .then(response => response.text())
        .then(text => {
            console.log("Raw response:", text);
            const data = JSON.parse(text);

            if (data.errors) {
                console.log("Error message:", data.errors);
            } else {
                alert("Survey submitted successfully.");
                window.history.back();
            }
        })
        .catch(error => {
            console.error("Error during the submission:", error);
            alert("Error submitting survey. Please try again later.");
        });
});

window.onload = function() {
    // Fetch survey data from the server
    fetch('http://localhost:8888/student/surveyid') // Replace with actual URL
        .then(response => response.json())
        .then(data => {
            data.questions.forEach((question, index) => {
                let questionHTML = '';
                switch (question.question_type) {
                    case 'multiple_choice':
                        questionHTML = generateMultipleChoice(question);
                        break;
                    case 'rating':
                        questionHTML = generateRating(question);
                        break;
                    case 'text_input':
                        questionHTML = generateTextInput(question);
                        break;
                    case 'true_false':
                        questionHTML = generateTrueFalse(question);
                        break;
                    default:
                        break;
                }
                const surveyDiv = document.querySelectorAll('.survey-template')[index];
                surveyDiv.innerHTML = questionHTML;
            });
        })
        .catch(error => {
            console.error('Error fetching survey data:', error);
        });
};

// Function to generate HTML for multiple choice questions
function generateMultipleChoice(question) {
    const options = question.question_json.options.map(option => {
        return `<div class="checklist-item">
                    <img src="../resource/images/Checkbox.png" alt="Checkbox" class="checkbox-icon">
                    <span>${option}</span>
                </div>`;
    }).join('');

    return `
        <div class="survey-template-header">${question.question_json.question}</div>
        <div class="survey-template-content">
            <div class="checklist-container" id="checklistContainer">
                ${options}
            </div>
        </div>
    `;
}

// Function to generate HTML for rating questions
function generateRating(question) {
    let ratingHTML = '';
    for (let i = 1; i <= question.question_json.scale; i++) {
        ratingHTML += `
            <div class="rating-item" data-rating="${i}">
                <span>${i}</span>
                <img src="../resource/images/RatingBefore.png" alt="Star ${i}">
            </div>
        `;
    }

    return `
        <div class="survey-template-header">${question.question_json.question}</div>
        <div class="survey-template-content">
            <div class="rating-container" id="ratingContainer">
                ${ratingHTML}
            </div>
        </div>
    `;
}

// Function to generate HTML for text input questions
function generateTextInput(question) {
    return `
        <div class="survey-template-header">${question.question_json.question}</div>
        <div class="survey-template-content">
            <input type="text" class="answer-input" placeholder="Your Answer...">
        </div>
    `;
}

// Function to generate HTML for true or false questions
function generateTrueFalse(question) {
    return `
        <div class="survey-template-header">${question.question_json.question}</div>
        <div class="survey-template-content">
            <div class="true-false-container">
                <label class="true-false-item">
                    <input type="radio" name="trueFalse${question.question_id}" value="True">
                    <span>True</span>
                </label>
                <label class="true-false-item">
                    <input type="radio" name="trueFalse${question.question_id}" value="False">
                    <span>False</span>
                </label>
            </div>
        </div>
    `;
}
