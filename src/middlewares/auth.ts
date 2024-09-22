import { NextFunction, Request, Response } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";

/* adding auth0Id and userId as 
new property in Request interface */
declare global {
  namespace Express {
    interface Request {
      auth0Id: string;
      userId: string;
    }
  }
}

// middleware to check if access token is valid
export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: process.env.AUTH0_TOKEN_SIGNING_ALGORITHM,
});

/* middleware to decode access token, find auth0Id & userId, 
and then update the req object before sending the request to controller */
export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }

  const accessToken = authorization.split(" ")[1];

  try {
    const decodedAccessToken = jwt.decode(accessToken) as jwt.JwtPayload;

    const auth0Id = decodedAccessToken.sub;
    const user = await User.findOne({ auth0Id });

    if (!user) {
      return res.sendStatus(401);
    }

    req.auth0Id = auth0Id as string;
    req.userId = user._id.toString();

    next();
  } catch (error) {
    res.sendStatus(401);
  }
};
