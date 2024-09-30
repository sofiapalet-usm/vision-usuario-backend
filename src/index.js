const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes = require('./routes/user.js');
const activityRoutes = require('./routes/activity.js');

const app = express();
const port = process.env.PORT || 9000;

/* Middlewares */
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', activityRoutes);

/* Routes */
app.get('/', (req, res) => {
  res.send('Hello World!');
});

/* MongoDB */
mongoose
.connect(process.env.MONGODB_URI)
.then(() => {console.log('Connected to MongoDB Atlas')})
.catch((error) => {console.error(error)});

app.listen(port, () => {console.log('server listening on port', port)});