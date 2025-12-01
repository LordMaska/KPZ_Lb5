import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { PC } from 'orm/entities/pc/PC';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const { cpu, ram, videocard, hard_disc, usb_amout, os, buy_date } = req.body;

  const pcRepository = getRepository(PC);
  try {
    const pc = pcRepository.create({
      cpu,
      ram,
      videocard,
      hard_disc,
      usb_amout,
      os,
      buy_date,
    });

    await pcRepository.save(pc);
    res.customSuccess(201, 'PC successfully created.', pc);
  } catch (err) {
    const customError = new CustomError(409, 'Raw', `PC can't be created.`, null, err);
    return next(customError);
  }
};
