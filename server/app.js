const express = require('express');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const userRouter = require('./src/routes/user');
const app = express();
const host = '127.0.0.1';
const port = 3000;
const swaggerDocument = require('./src/swagger/swagger_autogen.json');
const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', userRouter);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Server listens http://${host}:${port}`);
});
