import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const accessToken = authHeader && authHeader.split(' ')[1];

  if (!accessToken) {
    return res.status(401).json({ message: 'Токен доступа не предоставлен' });
  }

  jwt.verify(accessToken, process.env.SECRET as string, (err: jwt.VerifyErrors | null, user: any) => {
    if (err) {
      if (err instanceof TokenExpiredError) {
        return res.status(403).json({ message: 'Срок действия токена истек' });
      } else {
        return res.status(403).json({ message: 'Недействительный токен доступа' });
      }
    }

    req.user = user;
    next();
  });
};

export default authenticateToken;
