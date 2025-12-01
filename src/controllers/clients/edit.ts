import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Client } from 'orm/entities/client/Client';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const phone = req.params.phone;
  const { full_name, birth } = req.body;

  const clientRepository = getRepository(Client);
  try {
    const client = await clientRepository.findOne(phone);

    if (!client) {
      const customError = new CustomError(404, 'General', `Client with phone:${phone} not found.`, [
        'Client not found.',
      ]);
      return next(customError);
    }

    client.full_name = full_name ?? client.full_name;
    client.birth = birth ?? client.birth;

    try {
      await clientRepository.save(client);
      res.customSuccess(200, 'Client successfully saved.');
    } catch (err) {
      const customError = new CustomError(409, 'Raw', `Client can't be saved.`, null, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
