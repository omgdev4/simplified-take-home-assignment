import { Request, Response } from 'express';
import { ErrorMessages, ErrorCodes } from '../constants/ErrorCodes';
import { ResponseCodes } from '../constants/ResponseCodes';
import { CustomError } from '../utils/error/CustomError';


export default function(error: any, req: Request, res: Response) {
    if (error instanceof CustomError) {
        return res
            .status(ResponseCodes.INTERNAL_SERVER_ERROR)
            .json({errorCode: error.errorCode, errors: [error.message] });
    } else {
        return res
            .status(ResponseCodes.INTERNAL_SERVER_ERROR)
            .json({ errors: [ErrorMessages[ErrorCodes.SOMETHING_WENT_WRONG]] });
    }
}
