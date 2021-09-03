import { ErrorMessages, ErrorCodes } from '../../constants/ErrorCodes';

export class CustomError extends Error {

    errorCode: ErrorCodes;

    constructor(errorCode?: ErrorCodes) {
        const code = errorCode ? errorCode : ErrorCodes.SOMETHING_WENT_WRONG;
        const errorMessage = ErrorMessages[code] ? ErrorMessages[code] : ErrorMessages[ErrorCodes.SOMETHING_WENT_WRONG];

        super(errorMessage);
        this.errorCode = code;

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}