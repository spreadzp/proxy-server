import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ExpressAdapter} from '@nestjs/platform-express';
const fs = require('fs');
const http = require('http');
const https = require('http');
const cors = require('cors');
const express = require('express');

const httpsOptions = {
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
bootstrap();
http.createServer(server).listen(3000);
https.createServer(httpsOptions, server).listen(443);
/* async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = {
    origin: 'https://localhost:8080',
    optionsSuccessStatus: 200
  }
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
 
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next(); 
});
  app.enableCors(options); 

  await app.listen(3000);
}
bootstrap(); */
