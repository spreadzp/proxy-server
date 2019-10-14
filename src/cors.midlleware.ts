import { NestMiddleware, Injectable } from "@nestjs/common";
import { Request, Response } from 'express';
 
@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    let allowedOrigins = ["https://localhost:8080"];
    // console.log('req.header("Origin") :', allowedOrigins.indexOf(req.header("Origin")));
    if (allowedOrigins.indexOf(req.header("Origin")) > -1) {
        res.header("Access-Control-Allow-Origin", 'https://localhost:8080');
        res.header("Access-Control-Allow-Credentials", "true");
        res.append('Access-Control-Allow-Methods', 'GET');
        res.append('Access-Control-Allow-Headers', 'Content-Type');
        res.header('Content-Type', 'application/json');
    }
    next();
  }
}