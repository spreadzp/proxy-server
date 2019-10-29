import { NestMiddleware, Injectable } from "@nestjs/common";
import { Request, Response } from 'express';
import * as dotenv from "dotenv";
dotenv.config();

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    if (process.env.NODE_ENV !== 'production') {
      const allowedUrl = process.env.WALLET_LOCAL_HOST;
      let allowedOrigins = [allowedUrl];
      if (allowedOrigins.indexOf(req.header("Origin")) > -1) {
        res.header("Access-Control-Allow-Origin", allowedUrl);
        res.header("Access-Control-Allow-Credentials", "true");
        res.append('Access-Control-Allow-Methods', 'GET');
        res.append('Access-Control-Allow-Headers', 'Content-Type');
        res.header('Content-Type', 'application/json');
      }
    }
    next();
  }
}