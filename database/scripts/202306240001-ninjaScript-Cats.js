const fs = require('fs');
const path = require('path')
const fetch = require("node-fetch");

const envFilePath = path.resolve(__dirname.replace('/database/scripts', '/api'), '.env');
const envData = fs.readFileSync(envFilePath, 'utf8');
const lines = envData.split('\n');
let apiKey;

lines.forEach((line) => {
    const key = line.substring(0, line.search('='));
    if (key === 'DEV_NINJA_API_KEY') apiKey = line.substring(line.search('=') + 1, line.length);
});

var name = 'abyssinian';

fetch('https://api.api-ninjas.com/v1/cats?playfulness=5', { headers: { 'X-Api-Key': apiKey } })
    .then(res => res.json())
    .then(res => {
        console.log(res)
    });