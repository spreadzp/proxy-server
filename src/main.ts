import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
const fs = require('fs');
const http = require('http');
const https = require('http');
const cors = require('cors');
const express = require('express');

const httpsOptions = {
/*   hostname: 'localhost', //'34.67.65.119',
  port: 443,
  path: '/',
  method: 'GET', */
  key: fs.readFileSync('./secrets/localhost.key'),
  cert: fs.readFileSync('./secrets/localhost.crt'),
};
const server = express();
async function bootstrap() {
 /*  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server)
    
  ); */
  // app.enableCors();
  /* app.use(require('cors')())
  await app.init(); */
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  try {
    // await http.createServer(server).listen(3000);
    //await https.createServer(httpsOptions, server).listen(443);
    // await app.listen(3000); */
     await app.listen(443);
  } catch (err) {

    console.log('err :', err);
  }

}

bootstrap();
