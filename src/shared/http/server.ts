import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';

const app = express();

app.use(cors());
app.use(express.json());
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    let errorCode = error instanceof AppError ? error.statusCode : 500;
    let message = 'Internal server error';

    if(error instanceof AppError){
        errorCode = error.statusCode;
        message = error.message;
    }

    return response.status(errorCode).json({
        status: 'error',
        message: message
    });
});

app.use(routes);

app.listen(3333, ()=> {
    console.log('Server started on port 3333.');
});