 
## Installation
It must be node.js version more than 10

```bash
$ npm install
$ cp .sample-env .env
```
## Gen a new key and cert
```
openssl genrsa 2048 > localhost.key
chmod 400 localhost.key
openssl req -new -x509 -nodes -sha256 -days 365 -key localhost.key -out localhost.crt
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
 