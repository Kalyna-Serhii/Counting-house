import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerUI from 'swagger-ui-express';
import corsOptions from './src/cors/cors.config';
import errorMiddleware from './src/middlewares/error-middleware';
import { adminRouter, authRouter, userRouter } from './src/routes';
import swaggerDocument from './src/swagger/swaggerAutogen.json';

const HOST = '127.0.0.1';
const PORT = 3000;

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/api', userRouter, authRouter, adminRouter);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server listens http://${HOST}:${PORT}`);
});
