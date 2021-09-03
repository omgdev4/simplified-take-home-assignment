import { Document, model, Schema } from 'mongoose';

/**
 * Interface to model the Booking Schema for TypeScript.
 * @param email:string
 * @param firstName:string
 * @param lastName:string
 * @param checkInDate:Date
 * @param checkOutDate:Date
 * @param createdAt:Date
 * @param updatedAt:Date
*/

export enum BookingStatus {
    ACTIVE = 'ACTIVE',
    CANCELLED = 'CANCELLED'
};

export interface IBooking extends Document {
  email: string;
  firstName: string;
  lastName: string;
  status: BookingStatus;
  checkInDate: Date;
  checkOutDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema: Schema = new Schema({
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: Object.values(BookingStatus),
    required: true
  },
  checkInDate: {
    type: Date
  },
  checkOutDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Booking = model<IBooking>('Booking', bookingSchema);

export default Booking;
