import { Request } from 'express';

export function checkAccount (req: Request) {
  if (req.session.account === undefined) {
    throw Error('not logged in');
  }
}
