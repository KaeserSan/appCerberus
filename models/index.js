'use strict';
const mongoose = require('mongoose');
const fs = require('fs');

const Schema = mongoose.Schema;


const filterJs = (file) => file.endsWith('.js');
const schemasFiles = fs.readdirSync(`${__dirname}/Schemas` ).filter(filterJs);
const models = {};

for (let file of schemasFiles) {
  let fileName = file.slice(0,-3); // remove .js extension
  let schema = require(`./schemas/${fileName}`);
  if (schema instanceof Schema) {
    console.log(`registering ${fileName}...`)
    models[fileName] = mongoose.model(fileName, schema);
  } else {
    models[fileName] = mongoose.model(fileName, new Schema(schema));
  }
}

process.getModel = function (name) {
  return models[name];
}