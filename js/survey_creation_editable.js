// Makes an element editable by replacing its text with an input field
function makeEditable(elementId) {
    var element = document.getElementById(elementId);
    if (!element.querySelector('input')) { 
        var currentText = element.textContent;
        var input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;

        var computedStyle = window.getComputedStyle(element);
        input.style.width = computedStyle.width;
        input.style.fontSize = computedStyle.fontSize;
        input.style.fontFamily = computedStyle.fontFamily;
        input.style.border = '1px solid #ccc';
        input.style.borderRadius = '5px';
        input.style.padding = '8px 10px';
        input.style.boxSizing = 'border-box';

        input.onblur = function() { saveText(elementId, input.value); };

        element.innerHTML = ''; 
        element.appendChild(input);
        input.focus();
        input.select();
    }
}

// Saves the text after editing
function saveText(elementId, text) {
    var element = document.getElementById(elementId);
    element.textContent = text || (elementId === 'formTitle' ? 'Sample Title' : 'Form Description');
}

let optionCount = 1;

// Adds a new option for multiple-choice questions
function addOption() {
    const optionContainer = document.createElement("div");
    optionContainer.classList.add("option-container");

    const newOption = document.createElement("input");
    newOption.type = "text";
    newOption.placeholder = `Option ${optionCount}`;
    newOption.classList.add("option-input");
    newOption.style.width = "calc(100% - 60px)";
    newOption.style.padding = "8px";
    newOption.style.marginBottom = "8px";
    newOption.style.borderRadius = "5px";
    newOption.style.border = "1px solid #ccc";

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-button");
    removeButton.style.marginLeft = "10px";
    removeButton.style.padding = "5px 10px";
    removeButton.style.border = "none";
    removeButton.style.borderRadius = "5px";
    removeButton.style.backgroundColor = "#ff6b6b";
    removeButton.style.color = "#fff";
    removeButton.onclick = () => removeOption(optionContainer);

    optionContainer.appendChild(newOption);
    optionContainer.appendChild(removeButton);

    document.getElementById("optionsContainer").appendChild(optionContainer);
    optionCount++;
}

// Removes an option from multiple-choice questions
function removeOption(optionContainer) {
    document.getElementById("optionsContainer").removeChild(optionContainer);
    optionCount--; 
}

document.addEventListener("DOMContentLoaded", function () {
    const questionTypeSelect = document.querySelector(".question-header select");
    const optionsContainer = document.getElementById("optionsContainer");
    const buttonContainer = document.querySelector(".button-container");

    questionTypeSelect.addEventListener("change", updateQuestionContent);

    // Updates the question content based on the selected type
    function updateQuestionContent() {
        const selectedType = questionTypeSelect.value;
        optionsContainer.innerHTML = ""; 

        buttonContainer.style.display = "none";

        if (selectedType === "essay") {
            const essayInput = document.createElement("textarea");
            essayInput.placeholder = "Write your answer here...";
            essayInput.rows = 5;
            essayInput.style.width = "85%";
            essayInput.style.padding = "8px";
            essayInput.style.marginBottom = "10px";
            essayInput.style.borderRadius = "5px";
            essayInput.style.border = "1px solid #ccc";
            essayInput.disabled = true;
            optionsContainer.appendChild(essayInput);
        } else if (selectedType === "rating") {
            const ratingContainer = document.createElement("div");
            ratingContainer.classList.add("rating-container");
            ratingContainer.style.display = "flex";
            ratingContainer.style.gap = "10px";
            ratingContainer.style.marginBottom = "10px";

            const maxRatingSelect = document.createElement("select");
            maxRatingSelect.classList.add("max-rating-select");
            maxRatingSelect.style.marginBottom = "10px";

            for (let i = 1; i <= 10; i++) {
                const option = document.createElement("option");
                option.value = i;
                option.textContent = i;
                maxRatingSelect.appendChild(option);
            }

            maxRatingSelect.addEventListener("change", () => {
                const maxRating = parseInt(maxRatingSelect.value, 10);
                ratingContainer.innerHTML = "";

                for (let i = 1; i <= maxRating; i++) {
                    const label = document.createElement("label");
                    label.style.display = "flex";
                    label.style.alignItems = "center";

                    const radio = document.createElement("input");
                    radio.type = "radio";
                    radio.name = "rating";
                    radio.value = i;
                    radio.style.marginRight = "5px";
                    radio.disabled = true;

                    label.appendChild(radio);
                    label.appendChild(document.createTextNode(i));
                    ratingContainer.appendChild(label);
                }
            });

            optionsContainer.appendChild(maxRatingSelect);
            optionsContainer.appendChild(ratingContainer);
        } else if (selectedType === "true-false") {
            const trueFalseContainer = document.createElement("div");
            trueFalseContainer.classList.add("true-false-container");
            trueFalseContainer.style.display = "flex";
            trueFalseContainer.style.gap = "10px";

            const trueOption = document.createElement("label");
            trueOption.style.display = "flex";
            trueOption.style.alignItems = "center";

            const trueRadio = document.createElement("input");
            trueRadio.type = "radio";
            trueRadio.name = "trueFalse";
            trueRadio.value = "true";
            trueRadio.style.marginRight = "5px";
            trueRadio.disabled = true;

            trueOption.appendChild(trueRadio);
            trueOption.appendChild(document.createTextNode("True"));

            const falseOption = document.createElement("label");
            falseOption.style.display = "flex";
            falseOption.style.alignItems = "center";

            const falseRadio = document.createElement("input");
            falseRadio.type = "radio";
            falseRadio.name = "trueFalse";
            falseRadio.value = "false";
            falseRadio.style.marginRight = "5px";
            falseRadio.disabled = true;

            falseOption.appendChild(falseRadio);
            falseOption.appendChild(document.createTextNode("False"));

            trueFalseContainer.appendChild(trueOption);
            trueFalseContainer.appendChild(falseOption);
            optionsContainer.appendChild(trueFalseContainer);
        } else if (selectedType === "multiple-choice") {
            addOption();  
            buttonContainer.style.display = "flex"; 
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const addQuestionBtn = document.getElementById("addQuestionBtn");
    addQuestionBtn.addEventListener("click", addQuestion);

    // Adds a new question to the survey
    function addQuestion() {
        const questionTemplate = document.querySelector(".question-container");
        const newQuestion = questionTemplate.cloneNode(true);
    
        const questionInput = newQuestion.querySelector(".question-header input[type='text']");
        questionInput.value = "";
        newQuestion.querySelectorAll(".option-input").forEach(option => option.value = "");
        
        const optionsContainer = newQuestion.querySelector("#optionsContainer");
        optionsContainer.innerHTML = "";
        const questionTypeSelect = newQuestion.querySelector("#questionType");
        questionTypeSelect.value = "multiple-choice";
    
        document.querySelector(".survey-container").appendChild(newQuestion);
    }
});
