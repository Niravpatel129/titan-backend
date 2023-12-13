const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swaggerDocs.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    exposedHeaders: ['Access-Control-Allow-Credentials'],
    origin: ['http://localhost:3000', 'http://localhost:3001', 'https://titan-icy.netlify.app'],
  }),
);

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Route setup
app.use('/api/orders', require('./routes/orders.route.js'));
app.use('/api/auth', require('./routes/auth.route.js'));
app.use('/api/readyOrders', require('./routes/readyOrders.route.js'));

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
