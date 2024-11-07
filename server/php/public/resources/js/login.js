// async function handleLogin() {
//     console.log("handle login");

//     let credentials = {
//         'user': document.getElementById('email'),
//         'password': document.getElementById('password')
//     };

//     try {
//       const response = await fetch('/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(credentials)
//       });
//       const data = await response.json();
      
//     //   if (data.userType) {
//         // Store the token (optional)
//         // localStorage.setItem('token', data.token);
  
//         // Redirect based on user type
//         if (data.userType === 'student') {
//           window.location.href = '/student/home';
//         } else if (data.userType === 'admin') {
//           window.location.href = 'http://localhost:8000/api/items';
//         }
//     //   } else {
//     //     alert("Invalid credentials or missing user type.");
//     //   }
//     } catch (error) {
//       console.error("Login failed:", error);
//     }
//   }

// Load environment variables
// require('dotenv').config();

// const studentServerUrl = process.env.STUDENT_SERVER_URL;
// const adminServerUrl = process.env.ADMIN_SERVER_URL;
  
function handleLogin() {
    let credentials = {
      'user': document.getElementById('email').value,
      'password': document.getElementById('password').value,
      '_login': document.getElementById('_login').value
    };
  
    console.log("Sending credentials:", credentials);
  
    fetch('http://localhost:8888/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
})
  .then(response => response.text())
  .then(text => {
    console.log("Raw response:", text); 
    const data = JSON.parse(text);
    if (data.errors) {
      console.log("Error message:", data.errors);
    }

    if (data.userType == 0) {
      window.location.href = '/student/home';
    } else if (data.userType == 1) {
        console.log("Admin");
      window.location.href = 'http://localhost:8000/api/items';
    }
  })
  .catch(error => console.error("Error:", error));

}
  