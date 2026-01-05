import { User } from '../app/users/user.entity';

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
