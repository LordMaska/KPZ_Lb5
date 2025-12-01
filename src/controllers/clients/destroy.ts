import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Client } from 'orm/entities/client/Client';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const phone = req.params.phone;

  const clientRepository = getRepository(Client);
  try {
    const client = await clientRepository.findOne(phone);

    if (!client) {
      const customError = new CustomError(404, 'General', 'Not Found', [`Client with phone:${phone} doesn't exists.`]);
      return next(customError);
    }

    await clientRepository.delete(phone);

    res.customSuccess(200, 'Client successfully deleted.', { phone: client.phone });
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
