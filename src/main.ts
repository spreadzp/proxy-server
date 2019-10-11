import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
const fs = require('fs');
const http = require('http');
const https = require('http');
const cors = require('cors');
const express = require('express');

const httpsOptions = {
  hostname: '34.67.65.119',
  port: 443,
  path: '/',
  method: 'GET',
  key: fs.readFileSync('./secrets/private-key.pem'),
  cert: fs.readFileSync('./secrets/public-certificate.pem'),
};
const server = express();
async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );
  app.enableCors();
  await app.init();
}

http.createServer(server).listen(3000);
https.createServer(httpsOptions, server).listen(443);
bootstrap();
