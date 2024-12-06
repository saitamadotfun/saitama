import "dotenv/config";
import path from "path";
import { readFileSync } from "fs";
import { Strategy, ExtractJwt } from "passport-jwt";

import admin from "firebase-admin";
import { initializeApp } from "firebase-admin/app";

import fastifyCors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import fastifyPassport from "@fastify/passport";
import fastifyMultipart from "@fastify/multipart";
import fastifySecureSession from "@fastify/secure-session";
import fastify, { type FastifyRequest } from "fastify";

import { db } from "./db";
import Module from "./modules";
import type { selectUserSchema } from "./db/zod";
import { TokenStrategy } from "./modules/tokens/token.strategy";
import {
  loadFirebaseServiceAccount,
  SECRET_KEY,
  vercel,
  bumfi,
  imagekit,
} from "./config";

export const firebaseApp = initializeApp({
  credential: admin.credential.cert(loadFirebaseServiceAccount()),
});

const server = fastify({
  logger: true,
  ignoreTrailingSlash: true,
});

const module = new Module(db, server, vercel, bumfi, imagekit);

server.register(fastifyMultipart, {
  attachFieldsToBody: true,
  limits: {
    fileSize: 1000000,
  },
});
server.register(fastifyCors, {
  origin: "*",
});
server.register(fastifyCookie, { secret: SECRET_KEY });
server.register(fastifySecureSession, {
  key: readFileSync(path.join("secret-key")),
});

server.register(fastifyPassport.initialize());
server.register(fastifyPassport.secureSession());

fastifyPassport.registerUserSerializer<
  Zod.infer<typeof selectUserSchema>,
  unknown
>(async (user) => user.id);

fastifyPassport.registerUserDeserializer<
  Zod.infer<typeof selectUserSchema>["id"],
  unknown
>(async (id) => module.user.getUserById(id));

const getJWTToken = (request: FastifyRequest): string => {
  let token = request.session.get("auth.token");
  if (token) return token;
  token = request.unsignCookie("auth.token").value;
  if (token) return token;
  if (request.headers.authorization)
    [, token] = request.headers.authorization?.split(" ");
  return token;
};

fastifyPassport.use(
  "jwt",
  new Strategy(
    {
      secretOrKey: SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromUrlQueryParameter("auth.token"),
        getJWTToken,
      ]),
    },
    (payload: Zod.infer<typeof selectUserSchema>, done) => {
      module.user
        .getUserById(payload.id)
        .then((user) => done(null, user))
        .catch((error) => done(error, false));
    }
  )
);

fastifyPassport.use("token", TokenStrategy(db));

module.registerRoutes();

server.listen({ port: Number(process.env.PORT), host: process.env.HOST });
