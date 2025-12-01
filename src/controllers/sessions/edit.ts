import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Session } from 'orm/entities/session/Session';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const sessionId = req.params.id;
  const { pc_id, client_phone, Time, Duration, Cost } = req.body;

  const sessionRepository = getRepository(Session);
  try {
    const session = await sessionRepository.findOne(sessionId);

    if (!session) {
      const customError = new CustomError(404, 'General', `Session with id:${sessionId} not found.`, [
        'Session not found.',
      ]);
      return next(customError);
    }

    session.pc_id = pc_id ?? session.pc_id;
    session.client_phone = client_phone ?? session.client_phone;
    session.Time = Time ?? session.Time;
    session.Duration = Duration ?? session.Duration;
    session.Cost = Cost ?? session.Cost;

    try {
      await sessionRepository.save(session);
      res.customSuccess(200, 'Session successfully saved.');
    } catch (err) {
      const customError = new CustomError(409, 'Raw', `Session can't be saved.`, null, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
