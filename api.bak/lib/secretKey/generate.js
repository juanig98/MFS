const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const secretKey = crypto.randomBytes(32).toString('hex');
const envFilePath = path.resolve(__dirname.replace('/lib/secretKey', ''), '.env');
const envContent = fs.readFileSync(envFilePath, 'utf-8');
const updatedEnvContent = envContent.replace(/(SECRET_KEY=).*/, `$1${secretKey}`);
fs.writeFileSync(envFilePath, updatedEnvContent);
console.log('Secret Key escrita en el archivo .env');