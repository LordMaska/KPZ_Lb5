import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { PC } from 'orm/entities/pc/PC';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const pcId = req.params.id;

  const pcRepository = getRepository(PC);
  try {
    const pc = await pcRepository.findOne(pcId);

    if (!pc) {
      const customError = new CustomError(404, 'General', `PC with id:${pcId} not found.`, ['PC not found.']);
      return next(customError);
    }
    res.customSuccess(200, 'PC found', pc);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
