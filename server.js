const express = require('express');
const { connectToMongoDB } = require('./db');
const moviesRouter = require('./movie');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectToMongoDB()
  .then(() => {
    app.use('/api', moviesRouter);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to start the server', err);
  });