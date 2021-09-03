export enum ErrorCodes {
    SOMETHING_WENT_WRONG = '100',
    INVALID_PARMATERS = '101',
}

export const ErrorMessages: { [code: string]: string} =  {
    [ErrorCodes.SOMETHING_WENT_WRONG]: 'Something Went Wrong !!!',
    [ErrorCodes.INVALID_PARMATERS]: 'Invalid parameters'
}