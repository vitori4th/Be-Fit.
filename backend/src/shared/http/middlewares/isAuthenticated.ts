import AppError from '../../../shared/errors/AppError';
import { Response, Request, NextFunction } from 'express';
import { Secret, verify } from 'jsonwebtoken';
import authConfig from '../../../config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing.');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(
      token,
      authConfig.jwt.secret as Secret,
    ) as unknown as ITokenPayload;

    const subjectToken = JSON.parse(decodedToken.sub);

    req.user = {
      id: subjectToken.id,
    };

    return next();
  } catch (_err) {
    throw new AppError('Invalid JWT Token');
  }
}
