const fs = require('fs');
const faker = require('faker');

const NUM_LOGS = 4;
const UPDATE_INTERVAL = 500;

let counter = 0;
let int = setInterval(() => {

    let mdl = counter % NUM_LOGS;

    let number = faker.random.number();
    console.log(number);

    let uuid = faker.random.uuid();
    console.log(uuid);

    let word = faker.random.word();
    console.log(word);

    const line = `${uuid}\t${number}\t${word}\n`;
    fs.appendFileSync(`logs/log-${mdl}.log`, line);

    console.log(`wrote : ${line}`);
    counter += 1;
}, UPDATE_INTERVAL);
