const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swaggerDocs.js');
const itemRoutes = require('./routes/item.routes.js');
require('dotenv').config();

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Route setup
app.use('/api/orders', require('./routes/orders.route.js'));

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
