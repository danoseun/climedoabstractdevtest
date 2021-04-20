import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import { router } from './routes'
import { connect } from '../src/config'
import { successResponse, errorResponse } from './utils/response';
import { statusCodes } from './utils/statuscode';
import { messages } from './utils/message';



dotenv.config();

const app = express();
connect();


const port = process.env.PORT || 5000;

//morgan for logging
app.use(logger('dev'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);


app.get('/api/v1', (req, res) => successResponse(res, statusCodes.success, messages.welcome));
app.get('*', (req, res) => errorResponse(res, statusCodes.notFound, messages.notFound));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

export default app;