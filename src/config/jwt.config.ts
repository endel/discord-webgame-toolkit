import jwt from "jsonwebtoken"

import { User } from "../models/User";
import { DI } from "./database.config";

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) { throw new Error("process.env.JWT_SECRET must be set."); }

export async function getUserFromToken(token: string) {
  const data = verifyJWT(token);
  return await DI.userRepository.findOne({ discord_id: data?.discord_id });
}

export function generateJWT(user: User) {
  return jwt.sign({ discord_id: user.discord_id }, JWT_SECRET);
}

export function verifyJWT(token: string) {
  return jwt.verify(token, JWT_SECRET) as { discord_id: string };
}