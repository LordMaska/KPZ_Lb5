import { Request, Response, NextFunction } from 'express';

import { ClientService } from 'services/ClientService';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const service = new ClientService();
  try {
    const clients = await service.findAll();
    res.customSuccess(200, 'List of clients.', clients);
  } catch (err) {
    const customError =
      err instanceof CustomError ? err : new CustomError(400, 'Raw', `Can't retrieve list of clients.`, null, err);
    return next(customError);
  }
};
