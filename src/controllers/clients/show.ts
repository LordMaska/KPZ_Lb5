import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Client } from 'orm/entities/client/Client';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const phone = req.params.phone;

  const clientRepository = getRepository(Client);
  try {
    const client = await clientRepository.findOne(phone, { relations: ['sessions'] });

    if (!client) {
      const customError = new CustomError(404, 'General', `Client with phone:${phone} not found.`, [
        'Client not found.',
      ]);
      return next(customError);
    }
    res.customSuccess(200, 'Client found', client);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
