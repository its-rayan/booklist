import jwt from 'jsonwebtoken';

export const signJwt = (payload: string | object) => {
  return jwt.sign(payload, `${process.env.JWT_SECRET}`, {
    expiresIn: parseInt(`${process.env.JWT_EXPIRES_IN}`)
  });
};

export const verifyJwt = (token: string) => {
  return jwt.verify(token, `${process.env.JWT_SECRET}`);
};
