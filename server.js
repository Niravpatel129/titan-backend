const express = require('express');
const mongoose = require('mongoose');
const itemRoutes = require('./routes/item.routes.js');
require('dotenv').config();

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

app.use('/api/items', itemRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
