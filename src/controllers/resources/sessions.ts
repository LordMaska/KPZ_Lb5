import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Session } from 'orm/entities/session/Session';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const sessionRepository = getRepository(Session);
  try {
    const sessions = await sessionRepository.find({ relations: ['pc', 'client'] });
    res.customSuccess(200, 'List of sessions.', sessions);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of sessions.`, null, err);
    return next(customError);
  }
};
