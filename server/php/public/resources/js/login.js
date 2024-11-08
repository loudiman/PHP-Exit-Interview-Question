// async function handleLogin() {

// Load environment variables
// require('dotenv').config();

// const studentServerUrl = process.env.STUDENT_SERVER_URL;
// const adminServerUrl = process.env.ADMIN_SERVER_URL;
  
// function handleLogin() {
//   let credentials = {
//       'username': document.getElementById('username').value,
//       'password': document.getElementById('password').value
//     };
  
//   console.log("Sending credentials:", credentials);
  
//   fetch('http://localhost:8888/', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(credentials)})
//     .then(response => response.text())
//     .then(text => {
//     console.log("Raw response:", text); 
//     const data = JSON.parse(text);
//     if (data.errors) {
//       console.log("Error message:", data.errors);
//     }
//     if (data.userType == 1) {
//       console.log("Student");
//       window.location.href = 'http://localhost:8888/student/surveys';
//     } else if (data.userType == 0) {
//       console.log("Admin");
//       window.location.href = 'http://localhost:8000/api/items';
//     }
//   })
//   .catch(error => console.error("Error:", error));
// }

// import { createSurveyElements } from './student-homepage'

// function handleLogin() {
//   let credentials = {
//     'username': document.getElementById('username').value,
//     'password': document.getElementById('password').value
//   };

//   console.log("Sending credentials:", credentials);

//   fetch('http://localhost:8888/', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(credentials)
//   })
//     .then(response => response.text())
//     .then(text => {
//       console.log("Raw response:", text);
//       const data = JSON.parse(text);

//       if (data.errors) {
//         console.log("Error message:", data.errors);
//       }

//       if (data.userType === 1) {
//         console.log("Student");
        
//         // Check if surveys data is available in the login response
//         if (data.surveys) {
//           console.log("Using survey data from login response");
//           // Directly create survey elements from the received data
//           createSurveyElements(data.surveys.filter(s => !s.isComplete), 'open-surveys', true);
//           createSurveyElements(data.surveys.filter(s => s.isComplete), 'recent-surveys', false);
//         } else {
//           // If no survey data, redirect and fetch it after loading the page
//           window.location.href = 'http://localhost:8888/student/surveys';
//         }
//       } else if (data.userType === 0) {
//         console.log("Admin");
//         window.location.href = 'http://localhost:8000/api/items';
//       }
//     })
//     .catch(error => console.error("Error:", error));
// }

// function handleLogin() {
//   let credentials = {
//     'username': document.getElementById('username').value,
//     'password': document.getElementById('password').value
//   };

//   console.log("Sending credentials:", credentials);

//   fetch('http://localhost:8888/', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(credentials)
//   })
//     .then(response => response.text())
//     .then(text => {
//       console.log("(login) Raw response:", text);
//       const data = JSON.parse(text);

//       if (data.errors) {
//         console.log("Error message:", data.errors);
//       }

//       if (data.userType === 1) { // Student user
//         console.log("Student");
        
//         if (data.surveys) {
//           // Store surveys data in sessionStorage
//           console.log("Surveys");
//           sessionStorage.setItem('surveysData', JSON.stringify(data.surveys));
//         }
        
//         // Redirect to /student/surveys page
//         window.location.href = 'http://localhost:8888/student/surveys';
//       } else if (data.userType === 0) { // Admin user
//         console.log("Admin");
//         window.location.href = 'http://localhost:8000/api/items';
//       }
//     })
//     .catch(error => console.error("Error:", error));
// }

function handleLogin() {
  let credentials = {
    'username': document.getElementById('username').value,
    'password': document.getElementById('password').value
  };

  console.log("Sending credentials:", credentials);

  fetch('http://localhost:8888/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  })
    .then(response => response.text())
    .then(text => {
      console.log("(login) Raw response:", text);
      const data = JSON.parse(text);

      if (data.errors) {
        console.log("Error message:", data.errors);
      }

      if (data.userType === 1) { // Student user
        console.log("Student");

        if (data.surveys) {
          // Ensure surveys is always an array, even if it's a single object
          const surveysData = Array.isArray(data.surveys) ? data.surveys : [data.surveys];
          
          // Store surveys data in sessionStorage
          console.log("Storing surveys data in sessionStorage:", surveysData);
          sessionStorage.setItem('surveysData', JSON.stringify(surveysData));
        }
        
        // Redirect to /student/surveys page
        window.location.href = 'http://localhost:8888/student/surveys';
      } else if (data.userType === 0) { // Admin user
        console.log("Admin");
        window.location.href = 'http://localhost:8000/api/items';
      }
    })
    .catch(error => console.error("Error:", error));
}



  