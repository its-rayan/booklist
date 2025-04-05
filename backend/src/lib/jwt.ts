import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

export interface signJwtPayload {
  id: Types.ObjectId;
}

export interface JwtPayload extends jwt.JwtPayload {
  id: string;
}

export const signJwt = (payload: signJwtPayload) => {
  return jwt.sign(payload, `${process.env.JWT_SECRET}`, {
    expiresIn: '30d'
  });
};

export const verifyJwt = (token: string): JwtPayload => {
  return jwt.verify(token, `${process.env.JWT_SECRET}`) as JwtPayload;
};
