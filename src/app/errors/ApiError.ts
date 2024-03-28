class ApiError extends Error {
    public statusCode:number = 500;
    public errorDetails:any = null;
    constructor(statusCode:number,message:string|undefined,stack:any='',path:string=''){
        super(message);
        this.statusCode = statusCode;
        this.errorDetails = {
            path: path,
            message
        };
        if (stack) {
            this.stack = stack;
        }else{
            Error.captureStackTrace(this,this.constructor);
        }
    }
}

export default ApiError;