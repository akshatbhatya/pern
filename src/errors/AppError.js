export class AppError extends Error{

    constructor(message ,error, statusCode=500){
         super(message);
        this.error =error,
        this.statusCode =statusCode,
        Error.captureStackTrace(this,this.constructor)
    }
}