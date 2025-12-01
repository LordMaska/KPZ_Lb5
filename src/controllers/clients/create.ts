import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Client } from 'orm/entities/client/Client';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const { phone, full_name, birth } = req.body;

  const clientRepository = getRepository(Client);
  try {
    const client = clientRepository.create({
      phone,
      full_name,
      birth,
    });

    await clientRepository.save(client);
    const savedClient = await clientRepository.findOne(phone, { relations: ['sessions'] });
    res.customSuccess(201, 'Client successfully created.', savedClient);
  } catch (err) {
    const customError = new CustomError(409, 'Raw', `Client can't be created.`, null, err);
    return next(customError);
  }
};
