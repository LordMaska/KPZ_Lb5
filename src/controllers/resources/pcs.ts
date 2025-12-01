import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { PC } from 'orm/entities/pc/PC';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const pcRepository = getRepository(PC);
  try {
    const pcs = await pcRepository.find();
    res.customSuccess(200, 'List of PCs.', pcs);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of PCs.`, null, err);
    return next(customError);
  }
};
