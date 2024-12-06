import "dotenv/config";
import ImageKit from "imagekit";

import { Bumfi, Vercel } from "./lib";

export const HOST = process.env.HOST!;
export const PORT = Number(process.env.PORT);
export const SECRET_KEY = process.env.SECRET_KEY!;
export const VERCEL_API_KEY = process.env.VERCEL_API_KEY!;

export const DEBUG = "DEBUG" in process.env;

export const bumfi = new Bumfi();
export const vercel = new Vercel();
export const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGEKIT_URL!,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
});

export const loadFirebaseServiceAccount = () => {
  const json = process.env.FIREBASE_SERVICE_ACCOUNT!;
  try {
    return JSON.parse(json);
  } catch {
    return json;
  }
};
