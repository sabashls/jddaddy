import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import indexRoutes from './routes/index.js';
import exerciseRoutes from './routes/exceiseURLRoute.js';
import startGraphQL from './graphql/index.js';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 5200;

  app.use(morgan('dev'));
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));

 
  app.use('/', indexRoutes);
  app.use('/exercise', exerciseRoutes);

  // GraphQL Routes

  await startGraphQL(app);

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📡 GraphQL at http://localhost:${PORT}/graphql`);
  });
}

startServer();
