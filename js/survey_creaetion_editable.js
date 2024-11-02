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
