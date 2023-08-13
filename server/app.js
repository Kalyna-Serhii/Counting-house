const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const swaggerUI = require('swagger-ui-express');
const errorMiddleware = require('./src/middlewares/error-middleware');
const userRouter = require('./src/routes/user');
const authRouter = require('./src/routes/auth');
const adminRouter = require('./src/routes/admin');

const app = express();
const host = '127.0.0.1';
const port = 3000;
const swaggerDocument = require('./src/swagger/swaggerAutogen.json');

const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/api', userRouter, authRouter, adminRouter);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(errorMiddleware);

require('dotenv').config();

app.listen(port, () => {
  console.log(`Server listens http://${host}:${port}`);
});
