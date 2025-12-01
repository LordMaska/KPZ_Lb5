import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Session } from 'orm/entities/session/Session';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const { pc_id, client_phone, Time, Duration, Cost } = req.body;

  const sessionRepository = getRepository(Session);
  try {
    const session = sessionRepository.create({
      pc_id,
      client_phone,
      Time,
      Duration,
      Cost,
    });

    await sessionRepository.save(session);
    const savedSession = await sessionRepository.findOne(session.session_id, { relations: ['pc', 'client'] });
    res.customSuccess(201, 'Session successfully created.', savedSession);
  } catch (err) {
    const customError = new CustomError(409, 'Raw', `Session can't be created.`, null, err);
    return next(customError);
  }
};
