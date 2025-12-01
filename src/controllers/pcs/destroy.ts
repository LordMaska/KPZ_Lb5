import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { PC } from 'orm/entities/pc/PC';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const pcId = req.params.id;

  const pcRepository = getRepository(PC);
  try {
    const pc = await pcRepository.findOne(pcId);

    if (!pc) {
      const customError = new CustomError(404, 'General', 'Not Found', [`PC with id:${pcId} doesn't exists.`]);
      return next(customError);
    }

    await pcRepository.delete(pcId);

    res.customSuccess(200, 'PC successfully deleted.', { pc_id: pc.pc_id });
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
