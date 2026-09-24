import { jwtVerify } from "jose";

type JwtPayload = {
  userId: number;
};

export const verifyAccessToken = async (token?: string) => {
  const secret = process.env.JWT_ACCESS_SECRET;
  if (!token || !secret) return;

  try {
    const encodedSecret = new TextEncoder().encode(secret);
    const { payload } = await jwtVerify<JwtPayload>(token, encodedSecret);
    return payload;
  } catch (error) {
    console.error("Error authenticating user", error);
  }
};
