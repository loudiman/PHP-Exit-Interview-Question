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
    // Fetch surveys from the server
    async function fetchSurveys() {
        try {
            const response = await fetch('/api/surveys');
            const surveys = await response.json();

            // Organize surveys into Open Surveys and Completed Surveys
            const openSurveysData = surveys.filter(survey => survey.status === 'open');
            const completedSurveysData = surveys.filter(survey => survey.status === 'completed');

            //Add surveys to the page
            createSurveyElements(openSurveysData, 'open-surveys', true); // Open Surveys
            createSurveyElements(completedSurveysData, 'recent-surveys', false); // Completed Surveys

        } catch (error) {
            console.error('Error fetching surveys:', error);
        }
    }

    // Function to create survey elements dynamically
    function createSurveyElements(data, containerId, isOpenSurvey) {
        const container = document.getElementById(containerId);

        container.innerHTML = '';

        data.forEach(survey => {
            const surveyElement = document.createElement('div');
            surveyElement.classList.add(isOpenSurvey ? 'survey-template' : 'recent-item');

            const surveyTitle = document.createElement('p');
            surveyTitle.textContent = survey.program_filter; // Adjust to use the relevant field
            surveyElement.appendChild(surveyTitle);

            const button = document.createElement('button');
            button.textContent = isOpenSurvey ? 'Take The Survey' : 'View Details';
            surveyElement.appendChild(button);

            container.appendChild(surveyElement);
        });
    }

    // Call the fetchSurveys function to load surveys
    fetchSurveys();
});


