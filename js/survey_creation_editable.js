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
        input.style.padding = '5px';
        
        input.onblur = function() { saveText(elementId, input.value); };
        
        element.innerHTML = ''; 
        element.appendChild(input);
        input.focus();
        input.select();
    }
}

function saveText(elementId, text) {
    var element = document.getElementById(elementId);
    element.textContent = text || (elementId === 'formTitle' ? 'Sample Title' : 'Form Description');
}

let optionCount = 1; 

function addOption() {
    const optionContainer = document.createElement("div");
    optionContainer.classList.add("option-container");

    const newOption = document.createElement("input");
    newOption.type = "text";
    newOption.placeholder = `Option ${optionCount}`;
    newOption.classList.add("option-input");

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-button");
    removeButton.onclick = () => removeOption(optionContainer);

    optionContainer.appendChild(newOption);
    optionContainer.appendChild(removeButton);

    document.getElementById("optionsContainer").appendChild(optionContainer);

    optionCount++;
}

function removeOption(optionContainer) {
    document.getElementById("optionsContainer").removeChild(optionContainer);
    optionCount--;
}

