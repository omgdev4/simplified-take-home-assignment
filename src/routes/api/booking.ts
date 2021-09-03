import { Router, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
import { Request } from 'express';
import { dateTimeRegex } from '../../constants/Regex';
import { isValidObjectId } from 'mongoose';
import { IBooking } from '../../models/Booking';
import { addReserveration, cancelReserverationById, getReserverationById } from '../../services/booking.service';
import { ErrorCodes } from '../../constants/ErrorCodes';
import { ResponseCodes } from '../../constants/ResponseCodes';
import errorHandler from '../../middleware/error-handler';

const router: Router = Router();

// @route   POST api/booking
// @desc    Book the presidential suite, returns the A unique reservation identifier
// @access  Public (It can be restricted using auth middleware)
router.post(
  '/',
  [
    check('email').isEmail().withMessage('Please provide a valid email'),
    check('firstName').notEmpty().withMessage('Please provide first name'),
    check('lastName').notEmpty().withMessage('Please provide last name'),
    check('checkInDate').matches(dateTimeRegex).withMessage('Please provide a valid check in date'),
    check('checkOutDate').
        matches(dateTimeRegex).withMessage('Please provide a valid check out date').
        custom((value, { req }) => {
            const checkInDate = new Date(req.body.checkInDate);
            const checkOutDate = new Date(value);
            if (checkInDate > checkOutDate) {
                throw new Error('Invalid check out/in dates, check out date must be greater than check in date');
            } else if(Math.round((checkOutDate as any - (checkInDate as any))/(1000*60*60*24)) > 3) {
                throw new Error('Invalid check out/in dates, booking allowed up to 3 days');
            }
            return true;
        }),
    check('noOfPeople').isInt({min: 1, max: 3}).withMessage('Invalid no Of People, minimun 1 and maximum 3 people are allowed'),
  ],
  async (req: Request<any, any, IBooking>, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      // Check if all the validation passed
      if (!errors.isEmpty()) {
        return res
          .status(ResponseCodes.BAD_REQUEST)
          .json({ errorCode: ErrorCodes.INVALID_PARMATERS, errors: errors.array().map(e => e.msg) });
      }
  
      const reservationId = await addReserveration(req.body);
      return res.json({ reservationId });
    } catch (error) {
      next(error);
    }
  },
  errorHandler
);

// @route   Get api/booking/:reservationId
// @desc    Get the reservation by id, returns the a reservation object
// @access  Public (It can be restricted using auth middleware)
router.get(
  '/:reservationId',
  [
    check('reservationId').custom((reservationId) => {
      return isValidObjectId(reservationId);
    }).withMessage('Please provide a valid reservation Id'),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      // Check if all the validation passed
      if (!errors.isEmpty()) {
        return res
          .status(ResponseCodes.BAD_REQUEST)
          .json({ errorCode: ErrorCodes.INVALID_PARMATERS, errors: errors.array().map(e => e.msg) });
      }
  
      const reservation = await getReserverationById(req.params.reservationId);
      return res.json(reservation);
    } catch (error) {
      next(error);
    }
  },
  errorHandler
)

// @route   POST api/booking
// @desc    Cancel the reservation by id, returns Ok
// @access  Public (It can be restricted using auth middleware)
router.delete(
  '/:reservationId',
  [
    check('reservationId').custom((reservationId) => {
      return isValidObjectId(reservationId);
    }).withMessage('Please provide a valid reservation Id'),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      // Check if all the validation passed
      if (!errors.isEmpty()) {
        return res
          .status(ResponseCodes.BAD_REQUEST)
          .json({ errorCode: ErrorCodes.INVALID_PARMATERS, errors: errors.array().map(e => e.msg) });
      }
  
      await cancelReserverationById(req.params.reservationId);
      return res.sendStatus(ResponseCodes.OK);
    } catch (error) {
      next(error);
    }
  },
  errorHandler
)
export default router;
