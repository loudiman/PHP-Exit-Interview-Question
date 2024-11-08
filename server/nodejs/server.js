const express = require('express');
const cors = require('cors')
const app = express();
const dalRoutes = require('./services/dal-service/index');

app.use(cors())


// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the home page!');
});


app.use('/api', (req, res, next) => {
  console.log('User route middleware hit');
  next();  // Ensure next() is called
}, dalRoutes);  // Attach userRoutes here

const PORT = 2019
app.listen(PORT, ()=>{
  console.log('Server is running');
});
