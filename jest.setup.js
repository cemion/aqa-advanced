const fs = require('fs');
const path = require('path');
const { parseEnv } = require('util');

Object.assign(process.env, parseEnv(fs.readFileSync(path.join(__dirname, '.env'), 'utf8')));
