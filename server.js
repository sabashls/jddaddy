const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 5200;

  app.use(morgan('dev'));
  app.use(cors());

  // REST Routes
  const indexRoutes = require('./routes/index');
  app.use('/', indexRoutes);

  // GraphQL Routes
  const startGraphQL = require('./graphql');
  await startGraphQL(app);

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📡 GraphQL at http://localhost:${PORT}/graphql`);
  });
}

startServer();
