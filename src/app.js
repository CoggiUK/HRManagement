import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import allRoutes from './index.js';  // Đảm bảo file index.js tồn tại trong thư mục src

dotenv.config();

const app = express();

app.use(express.json());

// Swagger cấu hình
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'HR Management API',
      version: '1.0.0',
      description: 'API documentation for the HR Management system',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
      },
    ],
  },
  apis: ['./src/Routes/*.js'], // Sửa đường dẫn này
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Mount toàn bộ routes
app.use('/api', allRoutes);

app.get('/', (req, res) => {
  res.send('HR API Running...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log(`Swagger available at http://localhost:${PORT}/api-docs`);
});
