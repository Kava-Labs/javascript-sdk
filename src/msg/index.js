const cosmos = require('./cosmos').cosmos;
const kava = require('./kava').kava;
const hard = require('./hard').hard;
const swap = require('./swap').swap;

module.exports.msg = {
  cosmos,
  kava,
  hard,
  swap
}
