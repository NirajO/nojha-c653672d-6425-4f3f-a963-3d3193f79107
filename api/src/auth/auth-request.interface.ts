import { Request } from 'express';
import { User } from '@org/data';

export interface AuthRequest extends Request {
  user: User;
}
