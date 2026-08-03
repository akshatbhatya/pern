export class AppError extends Error{

    constructor(message ,error, statusCode=500){
         super(message);
        this.error =error,
        this.statusCode =statusCode,
        Error.captureStackTrace(this,this.constructor)
    }
}

export class ValidateError extends AppError{

    constructor(message, statuscode=422,details=[]){
        super(message,error,statuscode)
        this.details=details
    }
}

export class AuthenticationError extends AppError{

    constructor(message,error='AUTHENTICATION_ERROR',statusCode=401){
        super(message,error,statusCode)
    }
}

export class ForbiddenError extends AppError {
  constructor(message = 'You do not have permission to do this') {
    super(message, 'FORBIDDEN' ,403);
  }
}

export class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 'NOT_FOUND',404);
  }
}

export class ConflictError extends AppError {
  constructor(message) {
    super(message, 'CONFLICT',409);
  }
}