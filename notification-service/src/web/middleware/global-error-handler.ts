import { Request, Response, NextFunction } from "express";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const traceId = `NOTF${Date.now()}`;
    console.error(`Error caught by global handler: traceId-${traceId}`, err);
    const statusCode = err.isCustomError ? err.statusCode : 500;
    const errorMessage =
        statusCode === 500
            ? 'E_INTERNAL_SERVER_ERROR'
            : err.message; 
    
    return res.status(statusCode).send({
        code:
            statusCode === 500
                ?'E_INTERNAL_SERVER_ERROR'
                : err.code,
        message: errorMessage,
        response: null,
        traceId,
        errors: err.isCustomError && err.errors ? err.errors : [errorMessage],
    });
};
