class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal server error",
    err.statusCode = err.statusCode || 500;

    if(err.name === "CaseError"){
        const message = `resource not found. Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }
    if(err.code === 11000){ //database error like if not unique email
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }
    if(err.name === "JsonWebTokenError"){
        const message = `Json web token Invalid, Try again`;
        err = new ErrorHandler(message, 400);
    }
    if(err.name === "TokenExpiredError"){
        const message = `Json web token expired, try again`;
        err = new ErrorHandler(message, 400);
    }
    return res.status(err.statusCode).json({
        success: false,
        message : err.message
    })
};
export default ErrorHandler;