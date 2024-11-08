// Listen for the Enter key on the search input
document.getElementById("search-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") { // When Enter is pressed
        const searchQuery = document.getElementById("search-input").value.toLowerCase();

        const surveyTemplates = document.querySelectorAll(".survey-template");
        const recentItems = document.querySelectorAll(".recent-item");

        let matchFound = false;

        surveyTemplates.forEach((survey) => {
            const title = survey.querySelector("p").textContent.toLowerCase();
            if (title.includes(searchQuery)) {
                survey.classList.remove("hidden");
                matchFound = true;
            } else {
                survey.classList.add("hidden");
            }
        });

        recentItems.forEach((item) => {
            const title = item.querySelector("p").textContent.toLowerCase();
            if (title.includes(searchQuery)) {
                item.classList.remove("hidden");
                matchFound = true;
            } else {
                item.classList.add("hidden");
            }
        });

        if (!matchFound) {
            alert("No matching surveys found!");
        }
    }
});

document.querySelector('.hide-link').addEventListener('click', function() {
    const completedSurveysContainer = document.querySelector('.recent-surveys');

    completedSurveysContainer.classList.toggle('hidden');

    if (completedSurveysContainer.classList.contains('hidden')) {
        this.textContent = 'Show';
    } else {
        this.textContent = 'Hide';
    }
});

// Toggle search input visibility when search icon is clicked
document.getElementById("search-icon").addEventListener("click", function() {
    const searchInput = document.getElementById("search-input");
    searchInput.classList.toggle("hidden"); // Toggle visibility of the search input field
});

/*Here is the methods for the insertion of surveys*/
document.addEventListener("DOMContentLoaded", function() {
    // Fetch surveys from the PHP server
    async function fetchSurveys() {
        try {
            // Step 2: Make a GET request to the server
            const response = await fetch('http://localhost:8888/student/home');
            const jsonString = await response.text(); // Get the raw JSON string from the server

            // Step 3: Parse the JSON string into a JavaScript object
            const parsedData = JSON.parse(jsonString);

            // Organize surveys based on completion status
            const openSurveysData = parsedData.surveys.filter(survey => !survey.isComplete);
            const completedSurveysData = parsedData.surveys.filter(survey => survey.isComplete);

            // Step 4: Add surveys to the page using createSurveyElements
            createSurveyElements(openSurveysData, 'open-surveys', true); // Open Surveys
            createSurveyElements(completedSurveysData, 'recent-surveys', false); // Completed Surveys

        } catch (error) {
            console.error('Error fetching surveys:', error);
        }
    }

    // Function to create survey elements dynamically
    function createSurveyElements(data, containerId, isOpenSurvey) {
        const container = document.getElementById(containerId);
        container.innerHTML = ''; // Clear existing elements

        data.forEach(survey => {
            const surveyElement = document.createElement('div');
            surveyElement.classList.add(isOpenSurvey ? 'survey-template' : 'recent-item');

            const surveyTitle = document.createElement('p');
            surveyTitle.textContent = survey.survey_title; // Use the survey title from JSON
            surveyElement.appendChild(surveyTitle);

            const button = document.createElement('button');
            button.textContent = isOpenSurvey ? 'Take The Survey' : 'View Details';
            surveyElement.appendChild(button);

            container.appendChild(surveyElement);
        });
    }

    // Call fetchSurveys to load surveys on page load
    fetchSurveys();
});
