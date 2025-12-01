import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { PC } from 'orm/entities/pc/PC';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const pcId = req.params.id;
  const { cpu, ram, videocard, hard_disc, usb_amout, os, buy_date } = req.body;

  const pcRepository = getRepository(PC);
  try {
    const pc = await pcRepository.findOne(pcId);

    if (!pc) {
      const customError = new CustomError(404, 'General', `PC with id:${pcId} not found.`, ['PC not found.']);
      return next(customError);
    }

    pc.cpu = cpu ?? pc.cpu;
    pc.ram = ram ?? pc.ram;
    pc.videocard = videocard ?? pc.videocard;
    pc.hard_disc = hard_disc ?? pc.hard_disc;
    pc.usb_amout = usb_amout ?? pc.usb_amout;
    pc.os = os ?? pc.os;
    pc.buy_date = buy_date ?? pc.buy_date;

    try {
      await pcRepository.save(pc);
      res.customSuccess(200, 'PC successfully saved.');
    } catch (err) {
      const customError = new CustomError(409, 'Raw', `PC can't be saved.`, null, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
