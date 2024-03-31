import { Request, Response } from 'express';

export const error404 = (_: Request, res: Response) => {
  res.render('404', { titlePage: '404 page', path: '' });
};
