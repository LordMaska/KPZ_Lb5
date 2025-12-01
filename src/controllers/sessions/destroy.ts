import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Session } from 'orm/entities/session/Session';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const sessionId = req.params.id;

  const sessionRepository = getRepository(Session);
  try {
    const session = await sessionRepository.findOne(sessionId);

    if (!session) {
      const customError = new CustomError(404, 'General', 'Not Found', [
        `Session with id:${sessionId} doesn't exists.`,
      ]);
      return next(customError);
    }

    await sessionRepository.delete(sessionId);

    res.customSuccess(200, 'Session successfully deleted.', { session_id: session.session_id });
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
