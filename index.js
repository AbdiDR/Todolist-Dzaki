const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoute'); // Adjust the path as needed
require('./firebase');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/api', todoRoutes);


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
