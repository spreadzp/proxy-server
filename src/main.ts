import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
const fs = require('fs');
import * as dotenv from "dotenv";
dotenv.config();

const httpsOptions = {
  key: fs.readFileSync('./secrets/localhost.key'),
  cert: fs.readFileSync('./secrets/localhost.crt'),
};
async function bootstrap() {
  let app = null;
  if (process.env.NODE_ENV === 'production') {
    app = await NestFactory.create(AppModule);
  } else {
    app = await NestFactory.create(AppModule, {
      httpsOptions,
    });
    const corsOptions = {
      origin: '*'
    }
    app.use(require('cors')(corsOptions));
    app.enableCors(corsOptions);
  }
  try {
    (process.env.NODE_ENV === 'production') ? await app.listen(process.env.PORT_PROD_HTTP) : await app.listen(process.env.PORT_LOCALE_HTTPS);
  } catch (err) {
    console.log('err :', err);
  }
}
bootstrap();
