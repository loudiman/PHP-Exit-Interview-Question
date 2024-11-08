// async function handleLogin() {

// Load environment variables
// require('dotenv').config();

// const studentServerUrl = process.env.STUDENT_SERVER_URL;
// const adminServerUrl = process.env.ADMIN_SERVER_URL;
  
function handleLogin() {
  let credentials = {
      'username': document.getElementById('username').value,
      'password': document.getElementById('password').value
    };
  
  console.log("Sending credentials:", credentials);
  
  fetch('http://localhost:8888/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)})
    .then(response => response.text())
    .then(text => {
    console.log("Raw response:", text); 
    const data = JSON.parse(text);
    if (data.errors) {
      console.log("Error message:", data.errors);
    }
    if (data.userType == 1) {
      console.log("Student");
      window.location.href = 'http://localhost:8888/student/surveys';
    } else if (data.userType == 0) {
      console.log("Admin");
      window.location.href = 'http://localhost:8000/api/items';
    }
  })
  .catch(error => console.error("Error:", error));
}
  