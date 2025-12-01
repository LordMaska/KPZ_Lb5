import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Client } from 'orm/entities/client/Client';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const clientRepository = getRepository(Client);
  try {
    const clients = await clientRepository.find({ relations: ['sessions'] });
    res.customSuccess(200, 'List of clients.', clients);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of clients.`, null, err);
    return next(customError);
  }
};
