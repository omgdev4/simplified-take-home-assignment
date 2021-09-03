import { CustomError } from '../utils/error/CustomError';
import logger from '../../config/logger';
import Booking, { IBooking } from '../models/Booking';
import { ErrorCodes } from '../constants/ErrorCodes';

export const saveBooking = async (bookingData: IBooking): Promise<IBooking> => {
    try {
        const booking = new Booking(bookingData);

        logger.info('addBookingDao -> Saving booking: ', bookingData);

        return await booking.save();
    } catch (error) {
        logger.error('addBookingDao -> error while saving : ', error);
        throw new CustomError(ErrorCodes.SOMETHING_WENT_WRONG);
    }
}

export const getBookingById = async (bookingId: string): Promise<IBooking> => {
    try {
        logger.info('getBookingById -> Fetching booking by _id : ', bookingId);
 
        const booking = await Booking.findOne({ _id: bookingId});

        return booking;
    } catch (error) {
        logger.error('addBookingDao -> error while saving : ', error);
        throw new CustomError(ErrorCodes.SOMETHING_WENT_WRONG);
    }
}

export const updatedBookingById = async (bookingId: string, bookingData: Partial<IBooking>): Promise<number> => {
    try {
        logger.info('getBookingById -> Fetching booking by _id : ', bookingId);
 
        const result = await Booking.updateOne(
            { _id: bookingId },
            bookingData
        );

        return result.nModified;
    } catch (error) {
        logger.error('addBookingDao -> error while saving : ', error);
        throw new CustomError(ErrorCodes.SOMETHING_WENT_WRONG);
    }
}