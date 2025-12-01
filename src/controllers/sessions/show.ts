import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Session } from 'orm/entities/session/Session';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const sessionId = req.params.id;

  const sessionRepository = getRepository(Session);
  try {
    const session = await sessionRepository.findOne(sessionId, { relations: ['pc', 'client'] });

    if (!session) {
      const customError = new CustomError(404, 'General', `Session with id:${sessionId} not found.`, [
        'Session not found.',
      ]);
      return next(customError);
    }
    res.customSuccess(200, 'Session found', session);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
