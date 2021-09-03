import { saveBooking, getBookingById, updatedBookingById } from '../dao/booking.dao';
import logger from '../../config/logger';
import { BookingStatus, IBooking } from '../models/Booking';

export const addReserveration = async (bookingData: IBooking): Promise<string> => {
    bookingData.status = BookingStatus.ACTIVE;
    const booking = await saveBooking(bookingData);

    logger.info('addReserverationService -> saved reservation, booking._id : ', booking._id);

    return booking._id;
}

export const getReserverationById = async (reservationId: string): Promise<IBooking> => {
    const booking = await getBookingById(reservationId);

    logger.info('getReserverationById -> fetched reservation, booking._id : ', booking._id);

    return booking;
}

export const cancelReserverationById = async (reservationId: string): Promise<void> => {
    await updatedBookingById(reservationId, {
        status: BookingStatus.CANCELLED
    });

    logger.info('cancelReserverationById -> cancelled reservation, booking._id : ', reservationId);
}